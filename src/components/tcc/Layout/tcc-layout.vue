<template>
    <a-layout id="components-layout-demo-fixed" theme="light">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <div class="logo" ><h2 style="color: #ffffff">TCC前端视窗</h2></div>
            <tcc-menu :mode="'horizontal'" :menuList="menuList" style="line-height: 64px"></tcc-menu>
        </a-layout-header>
        <a-layout style="margin-top: 64px">
            <a-layout-sider width="200" style="z-index: 500" collapsible>
                <tcc-menu :menuList="sideMenuList"></tcc-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-content
                        :style="{ background: '#fff', padding: '24px', margin: 0 }"
                >
                    <router-view/>
                </a-layout-content>
            </a-layout>
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
        { title: '首页', path: '/codeStandard', key: '1' },
        // { title: '工程模板', path: '/projectModule', key: '2' },
        { title: '可视化', path: '/viewModule', key: '3', out: true }
      ],
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
          children: [
            { title: '表单', path: '/home/formComponents', key: '2-1',
              children: [
                {title: '表单demo', path: '/home/formComponents', key: '2-1-1'},
                {title: '表单使用', path: '/home/formCode', key: '2-1-2'}
                ]},
            { title: '表格', path: '/home/tableComponents', key: '2-2',
              children: [
                {title: '表格demo', path: '/home/tableComponents', key: '2-2-1'},
                {title: '表格使用', path: '/home/tableCode', key: '2-2-2'}
              ]
            },
            { title: '内嵌菜单', path: '/home/menuComponents', key: '2-3'},
            { title: '延时按钮', path: '/home/btnComponents', key: '2-4'}
          ]
        },
        {
          title: '工具类',
          path: '/home/toolsLibrary',
          key: '3'
        },
        {
          title: 'JSON工具',
          path: '/jsonCheck',
          key: '4'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
#components-layout-demo-fixed{
    height: 100%;
}
.ant-layout-content {
    min-height: initial;
}
</style>
