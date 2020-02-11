<template functional>
    <a-sub-menu :key="menuInfo.key">
    <span slot="title">
      <a-icon type="bars" />
      <span>{{ menuInfo.title }}</span>
    </span>
        <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.key">
                <router-link :to="item.path">
                    <a-icon type="tag" />{{ item.title }}
                </router-link>
            </a-menu-item>
            <sub-menu v-else :menu-info="item" :key="item.key"/>
        </template>
    </a-sub-menu>
</template>
<script>
export default {
  props: {
    menuInfo: {
      type: Object,
      default: function () {
        return []
      }
    }
  },
  mounted() {
    console.log(this.menuInfo)
  }
}
</script>
