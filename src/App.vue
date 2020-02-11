<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'app',
  data() {
    return {
      zh_CN,
    };
  },
  methods: {}
}
</script>

<style>
#app {
    height: 100%;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#components-layout-demo-fixed .logo {
    width: 150px;
    height: 100%;
    /*background: rgba(255, 255, 255, 0.2);*/
    /*margin: 16px 24px 16px 0;*/
    float: left;
    color: #ffffff;
}
</style>
