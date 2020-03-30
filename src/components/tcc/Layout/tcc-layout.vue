<template>
    <a-layout id="components-layout-demo-fixed" theme="light">
      <a-layout-sider width="200" class="sider-cont" collapsible :trigger="null" v-model="collapsed">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="triggerMenu"/>
        <div class="logo" ><h2 style="color: #ffffff" v-show="!collapsed">TCC前端视窗</h2></div>
        <tcc-menu :menuList="sideMenuList"></tcc-menu>
      </a-layout-sider>
        <a-layout style="position: relative;overflow-y: hidden">
          <a-layout-header class="header-cont">
            <tcc-menu :mode="'horizontal'" :menuList="menuList" style="line-height: 64px"></tcc-menu>
          </a-layout-header>
          <a-layout-content class="main-cont">
            <router-view/>
          </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import ALayoutSider from 'ant-design-vue/es/layout/Sider'
import TccMenu from '../Menu/tcc-menu'
export default {
  name: 'tcc-layout',
  components: { ALayoutSider, TccMenu },
  data: function () {
    return {
      menuList: [
        { title: '首页', path: '/home/codeStandard', key: '1', type: 'home' },
        // { title: '工程模板', path: '/projectModule', key: '2' },
        { title: '可视化', path: 'http://192.168.254.36/tccfront/', key: '3', out: true, type: 'eye' }
      ],
      collapsed: false,
      sideMenuList: [
        {
          title: '代码规范文档',
          path: '/',
          key: '1'
        },
        {
          title: '常用组件库',
          path: '/componentLibrary',
          key: '2',
          type: 'shop',
          children: [
            { title: '表单', path: '/home/formComponents', key: '2-1', type: 'file-text',
              children: [
                {title: '表单demo', path: '/home/formComponents', key: '2-1-1'},
                {title: '表单使用', path: '/home/formCode', key: '2-1-2'}
                ]},
            { title: '表格', path: '/home/tableComponents', key: '2-2', type: 'table',
              children: [
                {title: '表格demo', path: '/home/tableComponents', key: '2-2-1'},
                {title: '表格使用', path: '/home/tableCode', key: '2-2-2'}
              ]
            },
            { title: '日期', path: '/home/tableComponents', key: '2-3', type: 'calendar',
              children: [
                {title: '日期demo', path: '/home/dateComponents', key: '2-3-1'},
                {title: '日期使用', path: '/home/dateCode', key: '2-3-2'}
              ]
            },
            { title: '内嵌菜单', path: '/home/menuComponents', key: '2-4', type: 'layout'},
            { title: '延时按钮', path: '/home/btnComponents', key: '2-5', type: 'tag'}
          ]
        },
        {
          title: 'JSON工具',
          path: '/jsonCheck',
          key: '4',
          type: 'interation'
        },
        {
          title: '工具类',
          path: '/home/toolsLibrary',
          key: '3',
          type: 'tool'
        }
      ]
    }
  },
  methods: {
    triggerMenu() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style scoped lang="less">
#components-layout-demo-fixed{
  position: relative;
  height: 100%;
  overflow: hidden;
  .logo{
    height: 60px;
    line-height: 60px;
    /*margin: 16px;*/
  }
  .sider-cont{
    z-index: 501;
    height: 100%;
    .trigger{
      color: #ffffff;
      font-size: 20px;
      position: absolute;
      right: -30px;
      top: 20px;
    }
    ul{
      overflow-y: auto;
      height: 100%;
    }
    ul::-webkit-scrollbar{
      width: 4px;
    }
    ul::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(200, 215, 209, 0.2);
      background: rgba(200, 215, 209, 0.2);
    }
    ul::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(34, 34, 34, 0.86);
      border-radius: 0;
      background: rgba(34, 34, 34, 0.84);
    }
  }
}
.header-cont{
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 64px;
  z-index: 500;
}
.main-cont{
  position: absolute;
  top: 64px;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 24px;
  margin: 0;
  overflow-y: auto;
}

/*.ant-layout-content {*/
/*    min-height: initial;*/
/*}*/
</style>
