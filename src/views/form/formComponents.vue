<template>
    <div>
       <tcc-form :items="formList" :btns="formBtn" :loading="loading" :setValue="setVal" @submit="handleSubmit"></tcc-form>
    </div>
</template>

<script>
import moment from 'moment/moment'
export default {
  name: 'formComponents',
  data: function () {
    return {
      loading: false,
      formBtn: {
        submit: true,
        reset: true
      },
      setVal: []
    }
  },
  computed: {
    formList: function () {
      // 下拉选择模板
      const selectOptions = [
        { label: '高级', value: 'high' },
        { label: '中级', value: 'middle' },
        { label: '低级', value: 'low' }
      ]
      // 下拉选择树模板
      const treeOptions = [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              value: '0-0-1',
              key: '0-0-1',
              scopedSlots: {
                // custom title
                title: 'title'
              }
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
              key: '0-0-2'
            }
          ]
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1'
        }
      ]
      // 文件格式模板
      const fileList = [
        {
          lastModified: 1571900032892,
          lastModifiedDate: new Date(),
          name: '文本.txt',
          size: 131,
          status: 'done',
          type: 'text/plain',
          uid: 'vc-upload-1572486675643-3',
          url: '' // 下载路径
        },
        {
          lastModified: 1571900032893,
          lastModifiedDate: new Date(),
          name: '附件.txt',
          size: 205,
          status: 'done',
          type: 'text/plain',
          uid: 'vc-upload-1572486675643-5',
          url: ''
        }
      ]
      // 表单配置
      return [
        { key: 'name', label: '姓名', placeholder: '请填写姓名', initialValue: '', rules: [{ required: true, whitespace: true, message: '请填写姓名!' }], type: 'text' },
        { key: 'age', label: '年龄', placeholder: '请填写年龄', initialValue: '', type: 'number' },
        { key: 'introduction', label: '简介', placeholder: '请填写简介', initialValue: '', type: 'textarea' },
        { key: 'level', label: '选择等级', placeholder: '请选择等级', initialValue: '', options: selectOptions, rules: [{ required: true, message: '请选择等级!' }], type: 'select' },
        { key: 'area', label: '树形地区', placeholder: '请选择地区', extra: '选填', initialValue: '', options: treeOptions, type: 'tree' },
        { key: 'date', label: '时间', placeholder: '请选择日期', initialValue: moment('2015-01-01'), type: 'day' },
        { key: 'month', label: '月份', placeholder: '请选择月份', initialValue: moment('2015-01'), type: 'month' },
        { key: 'range', label: '时间区间', placeholder: '请选择时间区间', initialValue: [moment('2015-01-01'), moment('2015-10-01')], type: 'range' },
        { key: 'isReady', label: '启用', extra: '启用后，该用户将会出现在主页上', initialValue: true, type: 'switch' },
        { key: 'file', label: '附件上传', extra: '仅支持XXX格式文件', fileList: fileList, accept: 'text/plain', type: 'file' } // accept限制文件类型参考https://www.cnblogs.com/lgx5/p/5662472.html
      ]
    }
  },
  methods: {
    handleSubmit (data) {
      // 表单验证后获取返回值方法
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$message.success('提交成功')
      }, 1000)
    },
    setFieldsValue () {
      // 表单赋值方法
      this.setVal = [
        { name: '张三' },
        { age: 18 },
        { file: [
            {
              lastModified: 1571900032892,
              lastModifiedDate: new Date(),
              name: '修改.txt',
              size: 126,
              status: 'done',
              type: 'text/plain',
              uid: 'vc-upload-1572486675643-3',
              url: 'http://www.baidu.com' // 下载路径
            }
          ] }
      ]
    }
  }
}
</script>

<style scoped>

</style>
