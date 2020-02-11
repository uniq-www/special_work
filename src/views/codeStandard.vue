<template>
    <div style="text-align: left; height: 100%">
        <div class="download" style="margin-bottom: 10px">
            <a-button><a href="../../../static/tccCode.doc" download="前端规范文档">前端规范文档下载</a></a-button>
        </div>
        <iframe src="../../static/codeStandard.html" :style="{width:'100%',height:y,border:'0px',overflow: 'hidden'}"></iframe>
    </div>
</template>

<script>
  export default {
    name: "componentLibrary",
    data: function() {
      return {
        y: ''
      }
    },
    mounted() {
      let bodyH = document.documentElement.clientHeight;
      this.y = bodyH * 0.75 + 'px'
    }
  }
</script>

<style scoped>

</style>
