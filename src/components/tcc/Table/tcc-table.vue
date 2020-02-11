<template>
    <div class="table-page">
        <div class="t_searchbox" style="margin-top: -10px" v-if="defaultInit.showHead">
            <a-form  layout="inline">
                <slot name="searchItem"></slot>
                <a-form-item>
                    <a-button class="f_aBut" @click="queryData(true)">查询</a-button>
                    <a-button class="f_aBut" style="margin-left: 10px" @click="addTable(1)">新增</a-button>
                    <a-button class="f_aBut" v-if="defaultInit.addType==='row'" type="primary" style="margin-left: 10px" @click="saveTable">保存</a-button>
                    <slot name="operateBtn"></slot>
                </a-form-item>
            </a-form>
        </div>
        <div class="table-cont">
            <a-table
                    class="f_tableList f_mr_b"
                    style="margin-top: 10px; padding: 0 10px"
                    :columns="defaultInit.columns"
                    :dataSource="dataArr"
                    :pagination="myPagination"
                    :rowSelection="defaultInit.rowSelection?{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}:null"
                    :scroll="{x:defaultInit.x}"
            >
                <template
                        v-for="col in defaultInit.editArr"
                        :slot="col"
                        slot-scope="text, record"
                >
                    <div :key="col">
                        <a-input
                                v-if="record.editable"
                                style="margin: -5px 0; width: 80px"
                                :value="text"
                                @change="e => handleChange(e.target.value, record.key, col)"
                        />
                        <template v-else>{{text}}</template>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <a v-if="!record.editable" @click="addTable(2, record)" style="margin-right: 10px">修改</a>
                    <a v-else @click="saveTable(record)" style="margin-right: 10px">保存</a>
                    <a @click="deleteRow(1, record)">删除</a>
                </template>
            </a-table>
        </div>
        <a-modal :title="defaultInit.modalTitle"
                 v-model="addShow"
                 :width="defaultInit.addItem.length>4?'750px':'400px'"
                 :maskClosable="false"
                 @ok="addToTable"
                 @cancel="clearForm"
                 okText="确认"
                 cancelText="取消"
                 :rowKey="(record, index) => index"
        >
            <div :style="'height:'+defaultInit.height">
                <slot name="modalCont"></slot>
            </div>
        </a-modal>
        <a-layout-footer class="footer" v-if="defaultInit.rowSelection">
            <div class="ul_state" style="text-align: right">
                <!--        <a-checkbox style="width: 60%; text-align: left" @change="_checkAll" :indeterminate="indeterminate" :checked="checkAll">全选</a-checkbox>-->
                <a-button @click="deleteRow(2)">删除</a-button>
            </div>
        </a-layout-footer>
    </div>
</template>

<script>
export default {
  name: "tcc-table",
  props: {
    defaultInit: {
      type: Object,
      default () {
        return {
          showHead: false, // 展示表头搜索项
          columns: [], // 表头列
          data: [], // 表格内容
          addItem: [], // 默认新增项
          add_form: {}, // 新增项
          height: '200px', // 新增弹窗高度
          modalTitle: '', // 新增弹窗标题
          rowSelection: false, // 表格多选模式
          addType: 'modal', // 表格新增方式
          addRow: {}, // 默认新增项
          editArr: ['exchName','areaId'], // 可修改项
          qryParams: {}, // 查询参数
          addParams: {}, // 新增参数
          delParams: {}, // 删除参数
          x: null, // 横向滚动条
        }
      }
    }
  },
  data: function () {
    return {
      selectedRowKeys: [],
      selectedRowData: [],
      addShow: false, // 新增弹框标识
      addFlag: false, // 新增标识
      dataArr: this.defaultInit.data,
      myPagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        localLoading: false,
        showTotal: (total) => {
          if (total && typeof total !== 'undefined') {
            return '共' + total + '条'
          }
        },
        onChange: (current, pageSize) => {
          if (typeof current !== 'undefined' && typeof pageSize !== 'undefined') {
            this._onPaginationClick(current, pageSize)
          }
        },
        onShowSizeChange: (current, pageSize) => {
          if (typeof current !== 'undefined' && typeof pageSize !== 'undefined') {
            this._onPaginationClick(1, pageSize)
          }
        },
        itemRender: (current, type, originalElement) => {
          if (type === 'prev') {
            return '上一页' + ' '
          } else if (type === 'next') {
            return ' ' + '下一页'
          }
          return originalElement
        }
      }
    }
  },
  mounted () {
    this.queryData(true)
  },
  computed: {
    getData () {
      let arr = this.defaultInit.data
      return arr
    }
  },
  methods: {
    // 获取表格数据
    queryData () {
      this.myPagination.total = 0;
      this.myPagination.current = 1;
      this.myPagination.pageSize = 10;
      this.$emit('searchTable');
    },
    handleChange(value, key, column) {
      const newData = [...this.dataArr];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.dataArr = newData;
      }
    },
    // 新增/修改
    addTable (type, record) {
      // type为1为新增，2为修改
      if (this.defaultInit.addType === 'modal') {
        // 新增为弹框操作方式
        this.addShow = true;
        if (type === 1) {
          this.addFlag = true;
          this.$emit('addFormChange', {})
        } else {
          this.addShow = true;
          this.addFlag = false;
          this.$emit('addFormChange', record)
        }
      } else if (this.defaultInit.addType === 'row') {
        // 新增为增加行方式
        if (type === 1) {
          this.$emit('addRow');
          setTimeout(() => {
            this.dataArr = this.defaultInit.data
          }, 0)
        } else {
          record.editable = true;
          this.addFlag = false;
          this.dataArr = JSON.parse(JSON.stringify(this.dataArr))
        }
      }
    },
    // 新增
    addToTable () {
      let flag = true;
      let msg = '';
      if (this.defaultInit.addType === 'modal') { // 弹窗模式
        this.defaultInit.columns.some(item => {
          if (item.necessary && this._isNull(this.defaultInit.add_form[item.dataIndex])) {
            flag = false;
            return (msg = item.title + '不能为空')
          }
        });
        if (!flag) {
          return this.$message.error(msg)
        } else {
          this.saveTable()
        }
      }
    },
    // 保存
    saveTable (record) {
      // let arr = this.dataArr.filter(item => {
      //   return item.editable
      // });
      if (this.defaultInit.addType === 'modal') {
        this.$emit('saveTable', this.defaultInit.add_form)
        setTimeout(() => {
          this.addShow = false
        }, 0)
      } else {
        if (record) {
          this.$emit('saveTable', record)
          setTimeout(() => {
            record.editable = false
          }, 0)
        } else {
          this.$emit('saveTable', this.dataArr)
          setTimeout(() => {
            this.dataArr.forEach(item => {
              item.editable = false
            })
          }, 0)
        }
      }
    },
    // 删除, type为1删除单条，2为多条
    deleteRow (type, record) {
      if (type === 2) {
        if (this.selectedRowKeys.length < 1) {
          return this.$message.error('请选择要删除的数据')
        }
      }
      this.$confirm({
        title: '提示',
        content: '确认删除 ?',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          if ( type === 1) {
            this.$emit('delTable', record)
          } else {
            this.$emit('delTable', this.selectedRowData)
          }
        }
      })
    },
    // 清空新增弹窗内容
    clearForm () {
      this.$emit('addFormChange', {})
    },
    // 选择数据改变
    onSelectChange (selectedRowKeys, row) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRowData = row
    },
    // 判空
    _isNull (str) {
      if (str != null && typeof str !== 'undefined' && str !== '' && str !== 'null') {
        return false
      } else {
        return true
      }
    },
    _onPaginationClick (current, pageSize) {
      this.myPagination.current = current
      this.myPagination.pageSize = pageSize
    },
  }
}
</script>

<style lang="less" scoped>
.table-page {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    .t_searchbox{
        background-color: #fff;
        border-radius: 8px;
        height: 55px;
        padding: 8px 0 0 15px;
        box-shadow: 0 3px 6px rgba(0,0,0,.2);
        text-align: left;
        /*border: 1px solid;*/
    }
    .table-cont{
        border-radius: 8px;
        box-shadow: 0 3px 6px rgba(0,0,0,.2);
        margin-bottom: 50px;
    }
    .footer{
        position: fixed;
        z-index: 200;
        height: 60px;
        line-height: 10px;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #ffffff;
        box-shadow: 0 3px 6px rgba(0,0,0,.2);
    }
}
</style>
