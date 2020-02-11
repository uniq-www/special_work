<template>
  <div>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item  @click="showDrawer" key="mail" > <a-icon type="align-left" /></a-menu-item>
      <!--<a-menu-item key="app" disabled> <a-icon type="appstore" />Navigation Two </a-menu-item>-->
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper"
        >增加身份认证</span
        >
        <a-menu-item-group title="HTTP 身份认证">
          <a-menu-item key="setting:1">Basic 认证</a-menu-item>
        </a-menu-item-group>
        <a-divider />
        <a-menu-item-group title="OAuth 协议">
          <a-menu-item key="setting:3">OAuth 1.0认证</a-menu-item>
          <a-menu-item key="setting:4">OAuth 2.0认证</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper"
        >增加HTTP头字段</span
        >
          <a-menu-item key="setting:5" @click="showHeaderFieldModal = true">自定义头字段</a-menu-item>
          <a-divider />
          <a-menu-item key="setting:6">清空HTTP收藏的头字段</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="alipay">
        <a @click="toHome">首页</a
        >
      </a-menu-item>
    </a-menu>
    <!--收藏夹抽屉-->
    <a-drawer
      title="收藏夹"
      :placement="placement"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="350"
    >
      <a-card v-for="(item,index) in favoriteData"
              :key="index"
              :title="item.type.toUpperCase()"
              style="width: 300px;margin-bottom: 10px">
        <a slot="extra" style="color:#ff6666" @click="deleteFavoriteData(item)"><a-icon type="delete" /></a>
        <p @click="toSendRequest(item)">{{item.url}}</p>
      </a-card>
    </a-drawer>
    <div >
      <a-modal class="modal" title="HTTP 头字段" v-model="showHeaderFieldModal" @ok="sendHeaderField" okText="确认" cancelText="取消">
        <div class="name">
          <div class="title">名称</div>
          <a-input v-model="headerFieldName" placeholder="头字段名称" />
        </div>
       <div class="key">
         <div class="title">值</div>
         <a-input v-model="headerFieldKey" placeholder="头字段值" />
       </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
  export default {
    name:'topmenu',
    props:{
      headerFieldData:{
        type: Array
      }
    },
    data() {
      return {
        current: [''],
        visible: false,// 抽屉开关
        placement: 'left',
        favoriteData:[], // 收藏夹数据
        showHeaderFieldModal: false, // 头字段模态框开关
        headerFieldName: '',
        headerFieldKey: '',
      };
    },
    methods: {
      toHome(){
        this.$router.push({ name: "codeStandard" });
      },
      // 收藏夹抽屉
      // 抽屉打开
      showDrawer() {
        this.visible = true;
        if(!window.localStorage){
          alert("浏览器不支持localstorage");
        }else{
          this.favoriteData = JSON.parse(localStorage.getItem("list") || '[]')
        }
      },
      // 抽屉关闭
      onClose() {
        this.visible = false;
      },
      // 收藏夹点击回显到输入框
      toSendRequest(item) {
        this.$emit('pushSendRequest', item)
        this.$emit('changeSendRequestClass')
      },
      // 收藏夹删除
      deleteFavoriteData(item) {
        if(!window.localStorage){
          alert("浏览器不支持localstorage");
          return false;
        }else{
          // 从localStorage中获取所用地址
          let arr = this.favoriteData
          arr.splice(arr.findIndex(v => v.id === item.id), 1)
          localStorage.setItem("list",JSON.stringify(arr));
          this.$emit('disAbleFavoriteClass', item)
        }
      },
      // 提交头字段
      sendHeaderField(){
        if(!window.localStorage){
          alert("浏览器不支持localstorage");
          return false;
        }else{
          // 定义对象
          let obj = {id:Date.now(), name:this.headerFieldName, key:this.headerFieldKey}
          let arr =[]
          // 从localStorage中获取所用地址
          if(this.headerFieldData.length>0){
            arr = this.headerFieldData
          } else{
            if(JSON.parse(localStorage.getItem("headerField"))) {
              try {
                arr = JSON.parse(localStorage.getItem("headerField"))
              } catch(e) {
                localStorage.removeItem('headerField');
              }
            }
          }
          arr.push(obj)
          localStorage.setItem("headerField",JSON.stringify(arr));
          this.$emit('pushHeaderField', arr)
        }
        this.headerFieldName = ''
        this.headerFieldKey = ''
        this.showHeaderFieldModal=false
      }
    }
  };
</script>
<style lang="less">
  .ant-divider-horizontal{
    height: 4px;
    margin: 10px 0;
  }
  .ant-drawer-wrapper-body{
    background: #ff6666;
  }
  .ant-drawer-header{
    background: #ff6666;
    border:0
  }
  .ant-drawer-title{
    font-size: 24px;
    color:white;
  }
  .ant-tabs-bar{
    margin: 0
  }
  .ant-tabs-tab-active{
    margin: 0;
  }
  .ant-tabs-nav{
    color:#cc0000;
    margin: 0
  }
  .modal{
    .name{
      margin-bottom: 16px;
      .title{
        margin-bottom: 6px;
      }
    }
    .key{
      margin-bottom: 16px;
      .title{
        margin-bottom: 6px;
      }
    }
  }
</style>
