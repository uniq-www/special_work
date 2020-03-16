<template>
  <div style="text-align: left">
    <code-layout title="内嵌菜单配置" :data="data">
      <template v-slot:describe>
        说明：内嵌菜单组件 'tcc-sub-menu' 是内嵌于最外层菜单内的子菜单，通过该组件可配置多个层级菜单，减少代码冗余，需先引入组件'tcc-sub-menu'，该组件判断接收参数是否有子菜单，有则生成下一级子菜单，形成多级嵌套效果
      </template>
      <template v-slot:code-cont>
            <pre v-highlight-a>
                <code>
    &#60;template>
      &#60;a-menu
        :mode="mode"
        :defaultSelectedKeys="['1']"
        :defaultOpenKeys="['sub1']"
        :theme="theme"
        :style="{ height: '100%', borderRight: 0 }">
        &#60;template v-for="item in menuList">
          &#60;a-menu-item :key="item.key" v-if="!item.children">
            &#60;router-link :to="item.path"> &#60;a-icon type="bars" />&#60;span>menu-title&#60;/span>&#60;/router-link>
          &#60;/a-menu-item>
          &#60;tcc-sub-menu v-else :menuInfo="item" :key="item.key">&#60;/tcc-sub-menu>
        &#60;/template>
      &#60;/a-menu>
    &#60;/template>
                </code>
            </pre>
      </template>
    </code-layout>
    <div>
      <h3 style="margin-top: 10px">MenuInfo</h3>
      <a-table :columns="menuInfoColumns" :dataSource="menuInfoData" :pagination="false" :rowKey="record => record.params"/>
    </div>
    <div class="download" style="margin-top: 20px">
      <a-button><a href="../../../static/tcc-menu.zip" download="菜单组件代码">代码下载</a></a-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "menuComponents",
    data: function () {
      return {
        data: [
          // {params: 'mode', describe: '菜单类型，支持垂直、水平、和内嵌模式三种', type: 'string: vertical/vertical-right/horizontal/inline', default: 'inline'},
          // {params: 'theme', describe: '配置菜单颜色(深色/浅色)', type: 'string: light/dark', default: 'dark'},
          {params: 'menuInfo', describe: '内嵌菜单接收参数', type: 'object', default: '{}'}
        ],
        menuInfoColumns: [{title: '属性', dataIndex: 'params'},{title: '说明', dataIndex: 'describe'},{title: '类型', dataIndex: 'type'},{title: '默认值', dataIndex: 'default'}],
        menuInfoData: [
          {params: 'key', describe: '唯一标识符', type: 'number|string', default: ''},
          {params: 'type', describe: '菜单图标', type: 'string', default: 'bars'},
          {params: 'title', describe: '菜单标题', type: 'string', default: ''},
          {params: 'children', describe: '子菜单数组', type: 'array', default: '[ ]'},
          {params: 'path', describe: '跳转路由', type: 'string', default: ''},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
