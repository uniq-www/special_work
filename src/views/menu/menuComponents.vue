<template>
  <div style="text-align: left">
    <code-layout title="内嵌菜单配置" :data="data">
      <template v-slot:describe>
        说明：内嵌菜单组件 'tcc-sub-menu' 是内嵌于最外层菜单内的子菜单，通过该组件可配置多个层级菜单，减少代码冗余，需先引入组件'tcc-sub-menu'
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
            &#60;router-link :to="item.path"> &#60;a-icon type="bars" />&#60;span>{{item.title}}&#60;/span>&#60;/router-link>
          &#60;/a-menu-item>
          &#60;tcc-sub-menu v-else :menuInfo="item" :key="item.key">&#60;/tcc-sub-menu>
        &#60;/template>
      &#60;/a-menu>
    &#60;/template>
                </code>
            </pre>
      </template>
    </code-layout>
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
      }
    }
  }
</script>

<style scoped>

</style>
