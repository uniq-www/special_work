<template>
  <div style="text-align: left">
    <code-layout title="表格配置" :data="data">
      <template slot="code-cont">
        <pre v-highlight-a>
          <code>
defaultInit: {
    showHead: true,
    columns: [
      {title: '序列号', dataIndex: 'key', align: 'left'},
      {title: '姓名', dataIndex: 'name', align: 'left', scopedSlots: { customRender: 'name' }, necessary: true},
      {title: '年龄', dataIndex: 'age', align: 'left', scopedSlots: { customRender: 'age' }, necessary: true},
      {title: '性别', dataIndex: 'sex', align: 'left'},
      {title: '操作', dataIndex: 'operation', align: 'center', scopedSlots: { customRender: 'operation' }},
    ],
    data: [
      {name: '小红', age: 16, sex: '女', key: 1},
      {name: '小黄', age: 17, sex: '男', key: 2},
      {name: '小蓝', age: 20, sex: '女', key: 3},
    ],
    addItem: [
      {title: '姓名', dataIndex: 'name'},
      {title: '年龄', dataIndex: 'age'},
      {title: '性别', dataIndex: 'sex'}
    ],
    add_form: {},
    t_form: {
      searchVal: ''
    },
    modalTitle: '新增/修改',
    height: '200px',
    rowSelection: true,
    addType: 'modal',
    addRow: {key: 1, name: 'AA', age: 10, sex: '女' },
    editArr: ['name', 'age'],
  }
                </code>
        </pre>
      </template>
    </code-layout>
    <code-layout title="事件" :data="methodData" :showCode="false" style="margin-top: 10px"/>
    <div class="download" style="margin-top: 20px">
      <a-button><a href="../../../static/tcc-table.zip" download="表格组件代码">代码下载</a></a-button>
    </div>
  </div>
</template>

<script>
  import CodeLayout from "../../components/tcc/Layout/code-layout";
  export default {
    name: "tableCode",
    components: {CodeLayout},
    data: function () {
      return {
        data: [
          {params: 'columns', describe: '表头', type: 'array', default: '[ ]'},
          {params: 'data', describe: '数据', type: 'array', default: '[ ]'},
          {params: 'addItem', describe: '未输入值时默认提示信息', type: 'string', default: ''},
          {params: 'add_form', describe: '表单默认内容', type: 'string', default: ''},
          {params: 'showHead', describe: '是否展示表头搜索项', type: "boolean", default: 'true'},
          {params: 't_form', describe: '表头搜索条件', type: "object", default: '{ }'},
          {params: 'height', describe: '弹窗高度', type: 'string', default: '200px'},
          {params: 'modalTitle', describe: '弹窗标题', type: 'string', default: ''},
          {params: 'rowSelection', describe: '多选标志', type: 'boolean', default: 'false'},
          {params: 'addType', describe: '新增方式，"row"为增加行,"modal"为新增弹窗', type: 'string', default: 'row'},
          {params: 'addRow', describe: '新增方式为row时，新增事件', type: 'function', default: ''},
          {params: 'editArr', describe: '新增方式为row时，点击修改时触发的修改项', type: 'array', default: '[ ]'},
          {params: 'x', describe: '表格横向滚动条设置', type: 'number', default: 'null'},
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
