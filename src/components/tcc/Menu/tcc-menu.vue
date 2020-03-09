<template>
  <a-menu
    :mode="mode"
    :defaultSelectedKeys="['1']"
    :defaultOpenKeys="['sub1']"
    :theme="theme"
    :style="{ height: '100%', borderRight: 0 }">
    <template v-for="item in menuList">
      <a-menu-item :key="item.key" v-if="!item.children">
        <router-link :to="item.path"> <a-icon type="bars" /><span>{{item.title}}</span></router-link>
      </a-menu-item>
      <tcc-sub-menu v-else :menuInfo="item" :key="item.key"></tcc-sub-menu>
    </template>
  </a-menu>
</template>

<script>
import subMenu from './tcc-subMenu'
export default {
  name: 'tcc-menu',
  props: {
    menuList: {
      type: Array,
      default: function () {
        return []
      }
    },
    mode: {
      type: String,
      default: function () {
        return 'inline'
      }
    },
    theme: {
      type: String,
      default: function () {
        return 'dark'
      }
    }
  },
  components:{
    'tcc-sub-menu': subMenu
  }
}
</script>

<style scoped>
/*.sub-menu-cont :global(.ant-menu .ant-menu-submenu .ant-menu-submenu-title){*/
/*    padding-left: 0 !important;*/
/*}*/
/*.sub-menu-cont :global(.ant-menu-sub.ant-menu-inline  .ant-menu-submenu  .ant-menu-submenu-title){*/
/*    padding-left: 0 !important;*/

/*}*/
</style>
