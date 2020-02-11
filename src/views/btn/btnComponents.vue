<template>
    <div style="text-align: left">
        <div class="btn-cont">
            <h2>示例</h2>
            <tcc-timeBtn title="提交" :time="3" style="margin: 20px 0"></tcc-timeBtn>
        </div>
        <code-layout title="延时按钮配置" :data="data" :showCode="false">
            <template slot="describe">
                说明： 可用于操作按钮，控制点击后规定时间内不可再点击，避免用户重复操作
            </template>
        </code-layout>
        <div class="download" style="margin-top: 20px">
            <a-button><a href="../../../static/timeButton.zip" download="延时按钮代码">代码下载</a></a-button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "btnComponents",
    data: function () {
      return {
        data: [
          {params: 'title', describe: '按钮显示文字', type: 'string', default: '按钮'},
          {params: 'time', describe: '禁止点击时间', type: 'number', default: ''}
        ]
      }
    }
  }
</script>

<style scoped>
.btn-cont{
    margin-bottom: 20px;
}
</style>
