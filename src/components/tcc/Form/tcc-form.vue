<template>
    <a-spin :spinning="loading">
        <a-form :layout="layout" :form="form" @submit="handleSubmit">
            <a-form-item v-for="(item, index) in items" :key="index" :label="item.label" :colon="false" :extra="item.extra || null" :hasFeedback="hasFeedback(item)" :label-col="item.labelCol || labelCol" :wrapper-col="item.wrapperCol || wrapperCol" class="formItem">
                <!-- 文本输入框 -->
                <a-input v-if="item.type === 'text'" type="text" :placeholder="item.placeholder" :disabled="item.disabled || false" v-decorator="[item.key, {initialValue: item.initialValue || undefined, rules: item.rules || null}]" />

                <!-- 数字输入框 -->
                <a-input-number v-else-if="item.type === 'number'" :placeholder="item.placeholder" :disabled="item.disabled || false" :step='item.step || 1' v-decorator="[item.key, {initialValue: item.initialValue || undefined, rules: item.rules || null}]" style="width: 100%;" />

                <!-- 长文本框 -->
                <a-input v-else-if="item.type === 'textarea'" type="textarea" :autosize="{ minRows: 3, maxRows: 10 }" :placeholder="item.placeholder" :disabled="item.disabled || false" v-decorator="[item.key, {initialValue: item.initialValue || undefined, rules: item.rules || null}]" />

                <!-- 开关 -->
                <a-switch v-else-if="item.type === 'switch'" :disabled="item.disabled || false" :defaultChecked="strToBoo(item.initialValue)" v-decorator="[item.key, {initialValue: strToBoo(item.initialValue), rules: item.rules || null}]" />

                <!-- 下拉框选项 -->
                <a-select v-else-if="item.type === 'select'" :placeholder="item.placeholder" :disabled="item.disabled || false" v-decorator="[item.key, {initialValue: item.initialValue || undefined, rules: item.rules || null}]">
                    <a-select-option v-for="(option, index) in item.options" :key="index" :value="option.value">
                        {{ option.label }}
                    </a-select-option>
                </a-select>

                <!-- 下拉树选项 -->
                <a-tree-select v-else-if="item.type === 'tree'" :placeholder="item.placeholder" v-decorator="[item.key, {initialValue: item.initialValue || undefined, rules: item.rules || null}]" :dropdownStyle="{ maxHeight: '350px', overflow: 'auto' }" :treeData="item.options" :disabled="item.disabled || false" :treeCheckable="item.check || false">
                </a-tree-select>

                <!-- 上传文件 -->
                <a-upload
                        v-else-if="item.type === 'file'" v-decorator="[item.key]" :fileList="fileList[item.key] || initFileList(item)" :accept="item.accept" :beforeUpload="(file, fileList) => beforeUpload(file, fileList, item)" :remove="(file) => handleRemove(file, item)">
                    <a-button>
                        <a-icon type="upload" /> 附件上传
                    </a-button>
                </a-upload>

                <!-- 上传图片 -->
                <a-upload
                        v-else-if="item.type === 'img'" v-decorator="[item.key]" :fileList="fileList[item.key] || initFileList(item)" :accept="item.accept" :beforeUpload="(file, fileList) => beforeUpload(file, fileList, item)" :remove="(file) => handleRemove(file, item)">
                    <a-button>
                        <a-icon type="upload" /> 附件上传
                    </a-button>
                </a-upload>

                <!-- 日期选择器 -->
                <a-date-picker v-else-if="item.type === 'day'" v-decorator="[item.key, {initialValue: item.initialValue || undefined, rules: item.rules || null}]" :placeholder="item.placeholder" style="width: 100%;" />

                <!-- 月份选择器 -->
                <a-month-picker v-else-if="item.type === 'month'" v-decorator="[item.key, {initialValue: item.initialValue || undefined, rules: item.rules || null}]" :placeholder="item.placeholder" style="width: 100%;" />

                <!-- 时间区间选择器 -->
                <a-range-picker v-else-if="item.type === 'range'" v-decorator="[item.key, {initialValue: item.initialValue || undefined, rules: item.rules || null}]" style="width: 100%;" />

            </a-form-item>

            <div v-if="layout === 'horizontal'">
                <a-button class="formBtn" v-if="btns.submit" type="primary" html-type="submit">
                    提交
                </a-button>
                <a-button class="formBtn" v-if="btns.reset" type="danger" @click="handleReset">
                    重置
                </a-button>
                <a-button class="formBtn" v-if="btns.back" @click="handleBack">
                    返回
                </a-button>
            </div>
        </a-form>
        <div v-if="layout === 'inline'">
            <a-button class="formBtn" type="primary" html-type="submit">
                查询
            </a-button>
            <a-button class="formBtn" type="danger" @click="handleReset">
                重置
            </a-button>
        </div>
    </a-spin>
</template>

<script>
export default {
  name: 'tcc-form',
  props: {
    setValue: {
      type: Array
    },
    loading: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'horizontal'
    },
    col: {
      type: Array,
      default: function () {
        // 对象或数组默认值必须从一个工厂函数获取
        return [5, 17]
      },
      validator: function (value) {
        // 这个值必须匹配以下条件
        return value.length === 2
      }
    },
    items: {
      type: Array,
      required: false
    },
    btns: {
      type: Object,
      default: function () {
        // 对象或数组默认值必须从一个工厂函数获取
        return {
          submit: false, // 提交
          reset: false, // 重置
          back: false // 返回
        }
      }
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      // 文件上传列表
      fileList: {}
    }
  },
  computed: {
    labelCol: function () {
      return {
        span: this.col[0]
      }
    },
    wrapperCol: function () {
      return {
        span: this.col[1]
      }
    }
  },
  methods: {
    strToBoo (str) {
      const string = String(str)
      let res
      switch (string) {
        case '0':
          res = false
          break
        case 'false':
          res = false
          break
        case '否':
          res = false
          break
        default:
          if (string.length > 0) {
            res = Boolean(string)
          }
      }
      return res
    },
    hasFeedback (item) {
      if (item.rules) {
        switch (item.type) {
          case 'text':
            return true
          case 'number':
            return true
          case 'textarea':
            return true
            // case 'select':
            //   return true
            // case 'tree':
            //   return true
          default:
            return false
        }
      } else {
        return false
      }
    },
    initFileList (item) {
      if (item.fileList) {
        this.fileList[item.key] = item.fileList
        return item.fileList
      } else {
        return undefined
      }
    },
    checkFileList () {
      const fields = this.form.getFieldsValue()
      const fileKeys = []
      this.items.forEach(item => {
        if (item.type === 'file') {
          fileKeys.push(item.key)
        }
      })
      for (const key in fields) {
        // eslint-disable-next-line no-prototype-builtins
        if (fields.hasOwnProperty(key) && fileKeys.some(item => { return item === key })) {
          this.fileList[key] = fields[key]
        }
      }
    },
    beforeUpload (file, fileList, item) {
      const accept = item.accept
      const type = file.type
      if (accept && accept !== type) {
        // 格式验证
        return false
      }
      const key = item.key
      file.status = 'uploading'
      if (this.fileList[key]) {
        this.fileList[key].push(file)
      } else {
        this.fileList[key] = [file]
      }
      // 上传文件成功后，添加至fileList
      setTimeout(() => {
        this.fileList[key].some((item, i) => {
          if (file.uid === item.uid) {
            this.fileList[key][i].status = 'done'
            this.fileList[key][i].url = 'http://www.baidu.com'
            this.fileList[key][i].response = { status: 'success', id: '123' }
            this.fileList = Object.assign({}, this.fileList)
            this.$message.success('上传成功')
            return true
          }
        })
      }, 1500)
      // // 上传文件失败后，删除fileList对应文件
      // setTimeout(() => {
      //   this.handleRemove(file, item)
      //   this.$message.error('上传失败')
      // }, 3000)
      return false
    },
    handleRemove (file, item) {
      const key = item.key
      const uid = file.uid
      if (this.fileList[key]) {
        this.fileList[key].some((file, i) => {
          if (file.uid === uid) {
            this.fileList[key].splice(i, 1)
            return true
          }
        })
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const data = { ...values, ...this.fileList }
          this.$emit('submit', data)
        }
      })
    },
    handleReset (e) {
      this.form.resetFields()
    },
    handleBack () {
      this.$router.go(-1)
    }
  },
  watch: {
    setValue (arr) {
      arr.forEach(item => {
        this.form.setFieldsValue(item)
      })
      this.checkFileList()
    }
  }
}
</script>

<style scoped>
    .formItem {
        text-align: left;
    }
    .formBtn {
        margin: 0 5px;
    }
</style>
