<template>
    <div style="text-align: left">
        <code-layout title="表单配置" :data="data" :showCode="false">
            <template v-slot:describe>
                说明： 可在data中配置表单所需展示的表单内容，根据type判断是text/number/textarea/select(文本/数字/多行文本/选择框)等表单内容框，rules中配置是否必填，警告语等内容，例：
            </template>
<!--            <template slot="describe">-->
<!--                说明： 可在data中配置表单所需展示的表单内容，根据type判断是text/number/textarea/select(文本/数字/多行文本/选择框)等表单内容框，rules中配置是否必填，警告语等内容，例：-->
<!--            </template>-->
        </code-layout>
        <code-layout title="items" :data="itemsData" style="margin-top: 10px">
            <template slot="describe">
                说明： 可在items中配置表单所需展示的表单内容，根据type判断是text/number/textarea/select(文本/数字/多行文本/选择框)等表单内容框，rules中配置是否必填，警告语等内容，例：
            </template>
            <template slot="code-cont">
            <pre v-highlightA>
                        <code>
        // items的配置内容：根据type属性控制组件类型
        { key: 'name', label: '姓名', placeholder: '请填写姓名', initialValue: '', rules: [{ required: true, whitespace: true, message: '请填写姓名!' }], type: 'text' },
        { key: 'age', label: '年龄', placeholder: '请填写年龄', initialValue: '', type: 'number' },
        { key: 'introduction', label: '简介', placeholder: '请填写简介', initialValue: '', type: 'textarea' },
        { key: 'level', label: '选择等级', placeholder: '请选择等级', initialValue: '', options: selectOptions, rules: [{ required: true, message: '请选择等级!' }], type: 'select' },
        { key: 'area', label: '树形地区', placeholder: '请选择地区', extra: '选填', initialValue: '', options: treeOptions, type: 'tree' },
        { key: 'date', label: '时间', placeholder: '请选择日期', initialValue: moment('2015-01-01'), type: 'day' },
        { key: 'month', label: '月份', placeholder: '请选择月份', initialValue: moment('2015-01'), type: 'month' },
        { key: 'range', label: '时间区间', placeholder: '请选择时间区间', initialValue: [moment('2015-01-01'), moment('2015-10-01')], type: 'range' },
        { key: 'isReady', label: '启用', extra: '开关按钮', initialValue: true, type: 'switch' },
        { key: 'file', label: '附件上传', extra: '仅支持XXX格式文件', fileList: fileList, accept: 'text/plain', type: 'file' }
                        </code>
                    </pre>
                <div>
                    若使用到时间选择器（type为day/month/range等），则需在项目则需引入<a href="http://momentjs.cn/" target="_blank"> moment.js </a>），
                </div>
                <div>
                </div>
            </template>
        </code-layout>
        <code-layout title="事件" :data="methodData" :showCode="false" style="margin-top: 10px"/>
        <div class="download" style="margin-top: 20px">
            <a-button><a href="../../../static/form.zip" download="表单组件代码">代码下载</a></a-button>
        </div>
    </div>
</template>

<script>
  import CodeLayout from "../../components/tcc/Layout/code-layout";
  export default {
    name: "formCode",
    components: {CodeLayout},
    data: function () {
      return {
        formColumns: [
          {title: '属性', dataIndex: 'params'},{title: '说明', dataIndex: 'describe'},{title: '类型', dataIndex: 'type'},{title: '默认值', dataIndex: 'default'}
        ],
        data: [
          {params: 'items', describe: '配置表单内容', type: 'array', default: '[]'},
          {params: 'btns', describe: '操作按钮是否展示：submit为提交按钮，reset为充值按钮，back为返回按钮', type: 'object', default: '{submit:false,reset:false,back:false}'},
          {params: 'loading', describe: '表单界面loading效果展示', type: 'boolean', default: 'false'},
          {params: 'setValue', describe: '表单赋值', type: 'array', default: '[ ]'}
        ],
        itemsData: [
          {params: 'key', describe: '唯一标识符', type: 'string', default: ''},
          {params: 'label', describe: '表单标签', type: 'string', default: ''},
          {params: 'placeholder', describe: '未输入值时默认提示信息', type: 'string', default: ''},
          {params: 'initialValue', describe: '表单默认内容', type: 'string', default: ''},
          {params: 'rules', describe: '表单校验规则,required为是否必填项，message为操作提示信息，whitespace控制是否超出隐藏', type: 'object[ ]', default: '[ ]'},
          {params: 'type', describe: '表单类型', type: 'string', default: ''},
          {params: 'extra', describe: '表单内容提示项', type: 'string', default: ''},
          {params: 'options', describe: '下拉选择框显示内容,仅在type为"select"时生效', type: 'array', default: '[ ]'},
          {params: 'fileList', describe: '文件格式模板,仅在type为"file"时生效', type: 'array', default: '[ ]'},
          {params: 'accept', describe: '文件接收格式,仅在type为"file"时生效', type: 'string', default: 'text/plain'},
        ],
        methodData: [
          {params: 'submit', describe: '提交事件', type: 'function', default: ''},
        ]
      }
    }
  }
</script>

<style scoped>
ul li{
    list-style: none;
    text-align: left;
}
</style>
