<template>
    <div style="text-align: left">
        <h2>{{title}}</h2>
        <div>
            <slot name="describe"></slot>
            <a-collapse defaultActiveKey="0" :bordered="false" v-if="showCode">
                <a-collapse-panel header="详细代码" key="1">
                    <slot name="code-cont"></slot>
                </a-collapse-panel>
            </a-collapse>
            <div>
                <h3 style="margin-top: 10px">{{extraTitle}}</h3>
                <a-table :columns="columns" :dataSource="data" :pagination="false" :rowKey="record => record.params">
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "code-layout",
    props: {
      title: {
        type: String,
        default: function () {
          return ''
        }
      },
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      showCode: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      extraTitle: {
        type: String,
        default: function () {
          return 'API'
        }
      }
    },
    data: function () {
      return {
        columns: [
          {title: '属性', dataIndex: 'params'},{title: '说明', dataIndex: 'describe'},{title: '类型', dataIndex: 'type'},{title: '默认值', dataIndex: 'default'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
