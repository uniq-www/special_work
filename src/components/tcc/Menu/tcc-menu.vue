<template>
    <a-menu
            :mode="mode"
            :defaultSelectedKeys="['1']"
            :defaultOpenKeys="['sub1']"
            :theme="theme"
            :style="{ height: '100%', borderRight: 0 }"
    >
        <template v-for="item in menuList">
            <a-menu-item :key="item.key" v-if="!item.children">
                <router-link v-if="!item.out" :to="item.path"> <a-icon type="bars" /><span>{{item.title}}</span></router-link>
                <a v-else href="http://192.168.254.36/tccfront/" target="_blank">{{item.title}}</a>
            </a-menu-item>
<!--            <tcc-sub-menu v-else :menu-info="item" :key="item.key"></tcc-sub-menu>-->
            <a-sub-menu v-else :key="item.key" class="sub-menu-cont">
                <span slot="title">
                  <a-icon type="bars" />
                  <span>{{ item.title }}</span>
                </span>
                <template v-for="item1 in item.children">
                    <a-menu-item v-if="!item1.children" :key="item1.key">
                        <router-link :to="item1.path">
                            {{ item1.title }}
                        </router-link>
                    </a-menu-item>
                    <a-sub-menu v-else :key="item1.key">
                        <span slot="title">
                          <a-icon type="profile" />
                          <span>{{ item1.title }}</span>
                        </span>
                        <template v-for="item2 in item1.children">
                            <a-menu-item v-if="!item2.children" :key="item2.key">
                                <router-link :to="item2.path">
                                    {{ item2.title }}
                                </router-link>
                            </a-menu-item>
                        </template>
                    </a-sub-menu>
                </template>
            </a-sub-menu>
        </template>
    </a-menu>
</template>

<script>
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
