<template functional>
  <a-sub-menu :key="props.menuInfo.key">
  <span slot="title">
    <a-icon :type="props.menuInfo.type || 'bars'" />
    <span>{{ props.menuInfo.title }}</span>
  </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.key">
        <router-link :to="item.path">
          <a-icon :type="item.type" />{{ item.title }}
        </router-link>
      </a-menu-item>
      <sub-menu v-else :menuInfo="item" :key="item.key"/>
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: {
    menuInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  mounted() {
    console.log(this.menuInfo)
  }
}
</script>
