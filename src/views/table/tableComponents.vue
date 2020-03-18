<template>
  <div class="hello">
    <tcc-table :defaultInit="defaultInit" @addRow="addRowData" @saveTable="saveData" @delTable="delData" @searchTable="searchData" @addFormChange="changeModal">
      <template slot="searchItem">
        <a-form-item label="搜索条件">
          <a-input v-model="defaultInit.t_form.searchVal"></a-input>
        </a-form-item>
      </template>
      <template slot="operateBtn"></template>
      <template slot="modalCont">
        <a-col :span="24" v-for="(item, index) in defaultInit.addItem" :key="index">
          <a-form-item :label-col="{ span: 9 }" :wrapper-col="{ span: 15 }" :label="item.title">
            <a-input v-model="defaultInit.add_form[item.dataIndex]"></a-input>
          </a-form-item>
        </a-col>
      </template>
        </tcc-table>
  </div>
</template>

<script>
import TccTable from "../../components/tcc/Table/tcc-table";
export default {
  name: "tableComponents",
  components: {TccTable},
  data: function () {
    return {
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
        addType: 'row',
        addRow: {key: 1, name: 'AA', age: 10, sex: '女' },
        editArr: ['name', 'age'],
      }
    }
  },
  methods: {
    addRowData (cb) {
      this.defaultInit.addRow.key = this.defaultInit.data.length + 1;
      let addRow = JSON.parse(JSON.stringify(this.defaultInit.addRow));
      this.defaultInit.data.push(addRow)
      cb()
    },
    saveData (data, cb) {
      console.log(data)
      cb()
    },
    delData (data) {
      console.log(data)
    },
    searchData () {

    },
    changeModal (data) {
      this.defaultInit.add_form = data
    }
  }
}
</script>

<style scoped>

</style>
