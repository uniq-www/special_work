<template>
  <div class="json-check" >
    <a-spin :spinning="loading">
      <top-menu class="top-menu"
                ref="topMenu"
                :header-field-data="headerFieldData"
                @pushSendRequest="getSendRequest"
                @pushHeaderField="getHeaderField"
                @changeSendRequestClass="isHttpURL"
                @disAbleFavoriteClass="changeFavoriteBtn"></top-menu>
      <div class="center"
           :style="{ 'min-height': screenHeight - 50 + 'px' }">
        <div class="request">
          <h2>HTTP 请求</h2>
          <div class="request-input">
            <table border="0">
              <tr>
                <td class="title-left">
                  <label>请求方法</label>
                </td>
                <td class="title-type">
                  <a-select v-model="requestType"
                            style="width: 120px"
                            @change="requsetChange">
                    <a-select-option value="get">GET</a-select-option>
                    <a-select-option value="post">POST</a-select-option>
                  </a-select>
                </td>
                <td class="title-right">网址</td>
                <td class="input">
                  <a-input-search placeholder="https://"
                                  v-model="requestURL"
                                  @change="isHttpURL"
                                  @search="addFavorite">
                    <a-button :class="favoriteBtn?ableFavoriteClass:disableFavoriteClass"
                              slot="enterButton" >
                      <a-icon type="star" />
                    </a-button>
                  </a-input-search>
                </td>
                <td class="select">
                  <a-button @click="isHistoryShow =! isHistoryShow"
                            @onblur="isHistoryShow=false">
                    <a-icon type="clock-circle" />
                  </a-button>
                </td>
                <td class="title-send">
                  <a-button :class="sendRequestBtn ? ableSendRequestClass : disableSendRequestClass"
                            :disabled="isSendRequest"
                            @click="sendRequest(requestType)">发送
                  </a-button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2">
                  <div class="select-show" v-show="isHistoryShow">
                    <a-list size="small" bordered :dataSource="historyData">
                      <a-list-item slot="renderItem" slot-scope="item" @click="historyToRequestURL(item)">{{item.url}}</a-list-item>
                    </a-list>
                  </div>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          <div class="request-note"
               v-show="isHeaderField">
            <div class="title">HTTP 头字段</div>
            <a-tag v-for="(hfitem, hfindex) in headerFieldData"
                   :key="hfindex"  >
              {{hfitem.name}}:{{hfitem.key}}
              <a-icon @click="deleteHeaderField(hfitem)"
                      type="close" />
            </a-tag>
            <!--<json-viewer :value="requestParams"></json-viewer>-->
          </div>
          <div class="request-note">
            <div class="title">正文</div>
            <a-textarea placeholder="请求正文内容" v-model="requestParams" :rows="4"></a-textarea>
            <!--<json-viewer :value="requestParams"></json-viewer>-->
          </div>
        </div>
        <div>
          <div class="response">
            <h2>HTTP 响应</h2>
            <a-tabs defaultActiveKey="1" >
              <a-tab-pane tab="HTTP 头字段" key="1">
                <div class="tab-pane">
                  <json-viewer v-show="resHeaders"
                               :value="resHeaders">

                  </json-viewer>
                </div>
              </a-tab-pane>
              <a-tab-pane tab="HTTP 响应内容" key="2" >
                <div class="tab-pane">
                  <json-viewer v-show="resData"
                               :value="resData">

                  </json-viewer>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
  import TopMenu from "../../components/tcc/JsonCheck/top-menu";
  import { get, post, instance} from '../../config/http'
  export default {
    name: 'jsonCheck',
    components: {TopMenu},
    data() {
      return{
        screenHeight: document.documentElement.clientHeight,
        loading: false, // 全局加载参数
        requestType: 'get', // 请求类型
        requestURL: '', // 请求输入框地址
        requestParams: '', // 请求正文参数
        resHeaders: '', // 请求头展示
        resData: '', // 请求数据展示
        favoriteData: '', // 收藏夹数据
        headerFieldData: [], // 请求头数据
        isHeaderField: false, // 请求头开关
        isSendRequest: true, // 发送按钮开关
        isHistoryShow: false, // 历史记录开关
        historyData: [],
        // ------- 样式改动数据 ----------
        favoriteBtn: false,
        ableFavoriteClass: 'able-favorite',
        disableFavoriteClass: 'disable-favorite',
        sendRequestBtn: false,
        ableSendRequestClass: 'able-send-request',
        disableSendRequestClass: 'disable-send-request',
      }
    },
    methods: {
      // 更改请求类型
      requsetChange(value){
        this.requestType = value
      },
      // 判断发送框是否符合http；判断是否收藏
      isHttpURL(){
        this.favoriteBtn = false
        this.sendRequestBtn = false
        this.isSendRequest = true; // 发送按钮开关
        let str = this.requestURL
        if(str.indexOf('http://') === 0 || str.indexOf('https://') === 0){
          this.isSendRequest = false
          this.sendRequestBtn = true
        }
        // --- 判断动态输入URL是否是收藏夹内 ---
        this.favoriteData = JSON.parse(localStorage.getItem("list") || '[]')
        this.favoriteData.forEach(ele=>{
          if(ele.url === this.requestURL){
            this.favoriteBtn = true
          }
        })
      },
      // 发送请求
      sendRequest(type){
        this.isHistoryShow = false
        this.loading = true
        this.headerFieldData.forEach(ele=>{
          instance.defaults.headers[ele.name] = ele.key
        })
        this.resHeaders = ''
        this.resData = ''
        if (this.requestParams === undefined || this.requestParams === '' ) {
          if (type === 'get'){
            get(this.requestURL).then(res =>{
              if(res){
                this.resHeaders = res.headers
                this.resData = res.data
              }else{
                this.$notification['error']({
                  message: '未接收到任何参数',
                  description:
                    '请检查接口是否有误',
                });
              }
              this.loading = false
            }).catch(err =>{
              this.loading = false
            })
          } else if (type === 'post') {
            post(this.requestURL).then(res =>{
              if(res){
                this.resHeaders = res.headers
                this.resData = res.data
              }else{
                this.$notification['error']({
                  message: '未接收到任何参数',
                  description:
                    '请检查接口是否有误',
                });
              }
              this.loading = false
            }).catch(err =>{
              this.loading = false
            })
          }
        } else  if(this.isJsonString(this.requestParams)){
          let jsonParams = JSON.parse(this.requestParams)
          if (type === 'get'){
            get(this.requestURL,jsonParams).then(res =>{
              if(res){
                this.resHeaders = res.headers
                this.resData = res.data
              }else{
                this.$notification['error']({
                  message: '未接收到任何参数',
                  description:
                    '请检查接口是否有误',
                });
              }
              this.loading = false
            }).catch(err =>{
              this.loading = false
            })
          } else if (type === 'post') {
            post(this.requestURL,jsonParams).then(res =>{
              if(res){
                this.resHeaders = res.headers
                this.resData = res.data
              }else{
                this.$notification['error']({
                  message: '未接收到任何参数',
                  description:
                    '请检查接口是否有误',
                });
              }
              this.loading = false
            }).catch(err =>{
              this.loading = false
            })
          }
        } else {
          this.$notification['error']({
            message: '参数设置有误',
            description:
              '请检查请求正文是否为JSON格式',
          });
          this.loading = false
        }
        // ---------- 发送数据至历史 ---------
        let arr =[]
        // 从localStorage中获取所用地址
        if(JSON.parse(localStorage.getItem("history"))) {
          try {
            arr = JSON.parse(localStorage.getItem("history"))
          } catch(e) {
            localStorage.removeItem('history');
          }
        }else {
          arr = []
        }
        let obj = {
          id:Date.now(),
          type:this.requestType,
          url:this.requestURL,
          params: this.requestParams,
          headerField: this.headerFieldData
        }
        arr.unshift(obj)
        this.historyData=arr.slice(0,20)
        localStorage.setItem("history",JSON.stringify(arr));
      },
      // 历史记录回显
      historyToRequestURL(item){
        this.requestURL= item.url
        this.requestType = item.type
        this.requestParams = item.params
        this.headerFieldData = item.headerField
        this.isHistoryShow = false
        let str = this.requestURL
        if(str.indexOf('http://') === 0 || str.indexOf('https://') === 0){
          this.isSendRequest = false
          this.sendRequestBtn = true
        }
      },
      // ------------ 收藏夹 ------------
      // 添加收藏夹
      addFavorite(){
        if(!window.localStorage){
          alert("浏览器不支持localstorage");
          return false;
        }else{
          // 定义对象
          let obj = {
            id:Date.now(),
            type:this.requestType,
            url:this.requestURL,
            params: this.requestParams,
            headerField: this.headerFieldData
            }
          let arr =[]
          // 从localStorage中获取所用地址
          if(JSON.parse(localStorage.getItem("list"))) {
            try {
              arr = JSON.parse(localStorage.getItem("list"))
            } catch(e) {
              localStorage.removeItem('list');
            }
          }else {
            arr = []
          }
          let isEqual = false
          arr.forEach(ele=>{
            if(ele.url === this.requestURL) {
              isEqual = true
              arr.splice(arr.findIndex(v => v.id === ele.id),1)
              this.favoriteBtn = false
            }
          })
          if(isEqual === false){
            arr.unshift(obj)
            this.favoriteBtn = true
          }
          localStorage.setItem("list",JSON.stringify(arr));
        }
      },
      // 获取收藏夹数据
      getSendRequest(item){
        this.requestURL = item.url
        this.requestType = item.type
        this.requestParams = item.params
        this.headerFieldData = item.headerField
        this.$refs.topMenu.onClose()
        this.isHeaderField = true
        if(this.headerFieldData.length === 0){
          this.isHeaderField = false
        }
      },
      // 更改收藏夹样式
      changeFavoriteBtn(item){
        if (item.url === this.requestURL){
          this.favoriteBtn = false
        }
      },
      // ------------ 请求头 ------------
      // 获取请求头数据、历史数据
      getHeaderField(){
        this.headerFieldData = JSON.parse(localStorage.getItem("headerField") || '[]')
        let arr= JSON.parse(localStorage.getItem("history") || '[]')
        this.historyData = arr.slice(0,20)
        if(this.headerFieldData.length > 0){
          this.isHeaderField = true
        }
      },
      // 删除请求头
      deleteHeaderField(hfitem){
        if(!window.localStorage){
          alert("浏览器不支持localstorage");
          return false;
        }else{
          // 从localStorage中获取所用地址
          let arr = this.headerFieldData
          arr.splice(arr.findIndex(v => v.id === hfitem.id), 1)
          delete instance.defaults.headers[hfitem.name];
          localStorage.setItem("headerField",JSON.stringify(arr));
        }
        if(this.headerFieldData.length === 0){
          this.isHeaderField = false
        }
      },
      // ------------ 工具 -------------
      isJsonString(str) {
        try {
          if (typeof JSON.parse(str) == "object") {
            return true;
            }
          } catch(e) {
        }
        return false;
      }
    },
    watch: {
      screenHeight: function(val) {
        // 监听屏幕高度变化
        let oIframe = document.getElementById("maindiv");
        // alert(this.$store.getters.screenHeight)
        oIframe.style.height = Number(val) + "px";
      }
    },
    mounted() {
      this.getHeaderField()
      var _this = this;
      window.onresize = function() {
        // 定义窗口大小变更通知事件
        // _this.screenWidth = document.documentElement.clientWidth // 窗口宽度
        _this.screenHeight = document.documentElement.clientHeight; // 窗口高度
      };
    }
  }
</script>
<style scoped lang="less">
  .able-favorite{
    background-color: #cc0000;
    color:#ffffff;
  }
  .disabled-favorite{

  }
  .able-send-request{
    width: 80px;
    background-color: #cc0000;
    color: #ffff;
  }
  .disable-send-request{
    width: 80px;
  }
  table {
    table-layout: fixed;
    width: 100%;
  }
  td{
    word-break: break-all;
  }
  tr{
    min-width: 1000px;
  }
    .json-check{
    text-align: left;
    .center{
      padding: 24px;
      background: #EEEEEE;
      .request{
        margin-bottom: 10px;
        .request-input{
          background: #ffffff;
          height: 50px;
          padding: 10px 10px 5px 10px;
          .title-left{
            width: 80px;
            margin-right: 10px;
            text-align: center;
          }
          .title-type{
            width: 120px;
            margin: 10px 0;
          }
          .title-right{
            width: 60px;
            margin: 10px 0;
            text-align: center;
          }
          .input{
            width: 100%;
            display:inline
          }
          .select{
            width: 55px;
          }
          .title-send{
            width: 100px;
            text-align: center;
          }
          .select-show{
            margin-right: 6px;
            max-height: 200px;
            overflow: auto;
            background-color: #fff;
            position:relative;
            z-index:999;
          }
        }
        .request-note{
          padding:10px;
          margin-top: 10px;
          background: #ffffff;
          .title{
            font-size: 18px;
            margin-bottom: 10px;
          }
        }
      }
      .response{
        padding-top: 14px;
        .tab{
          background: #ffffff;
        }
        .tab-pane{
          background: #ffffff;
          min-height: 50px;
        }
      }
    }
  }

</style>
