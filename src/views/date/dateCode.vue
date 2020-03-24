<template>
  <div>
    <code-layout title="日期组件配置" :data="data" :showCode="false"></code-layout>
    <code-layout title="dateProps" :data="propsData" style="margin-top: 10px">
      <template slot="code-cont">
        <pre v-highlight-a>
          <code>
    dateProps: {
      label: '日期选择',
      singleDate: false, // 单/双帐期
      dateMode: 'date',
      dateFormat: 'YYYYMMDD',
      dateShowFormat: 'YYYY-MM-DD',
      clearable: true,
      defaultDate: true,
      disableDate: false,
      limitBegin: 2,
      limitEnd: 1,
      limitType: 'month'
    },
                </code>
        </pre>
      </template>
    </code-layout>
  </div>
</template>

<script>
  import CodeLayout from "../../components/tcc/Layout/code-layout";
  export default {
    name: "dateCode",
    components: {CodeLayout},
    data: function () {
      return {
        data: [
          {params: 'dateProps', describe: '配置项', type: 'object', default: '{ }'}
        ],
        propsData: [
          {params: 'label', describe: '日期标签', type: 'string', default: '帐期'},
          {params: 'singleDate', describe: '单/双帐期，true为单帐期', type: 'boolean', default: 'true'},
          {params: 'dateMode', describe: '日期类型', type: 'string', default: 'month'},
          {params: 'dateFormat', describe: '日期参数格式', type: 'string', default: 'YYYYMM'},
          {params: 'dateShowFormat', describe: '日期展示格式', type: 'string', default: 'YYYY-MM'},
          {params: 'clearable', describe: '是否可清除', type: 'boolean', default: 'true'},
          {params: 'defaultDate', describe: '是否展示默认时间', type: 'boolean', default: 'true'},
          {params: 'disableDate', describe: '日期是否限制不可选', type: 'boolean', default: 'false'},
          {params: 'limitType', describe: '日期限制不可选类型', type: 'string: "month/year"', default: 'month'},
          {params: 'limitBegin', describe: '限制不可选开始日期距离当前日期差值', type: 'number', default: '0'},
          {params: 'limitEnd', describe: '限制不可选结束日期距离当前日期差值', type: 'number', default: '0'},
        ],
        methodData: [
          {params: 'addRow', describe: '添加表格行事件', type: 'function', default: ''},
          {params: 'saveTable', describe: '保存事件', type: 'function', default: ''},
          {params: 'delData', describe: '删除事件', type: 'function', default: ''},
          {params: 'searchTable', describe: '查询事件', type: 'function', default: ''},
          {params: 'changeModal', describe: '弹窗模式下修改表格内容事件', type: 'function', default: ''},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
