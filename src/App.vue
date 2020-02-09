<template>

  <div id="app">
  <div id="head" class="container">
    <div class="head_logo leftfloat">
        <a href="#">
            <img src="/images/logo.gif" alt="" title="" />
        </a>

    </div>

    <ul class="head_menu rightfloat">
        <li>
 <!-- class="active" -->
             <router-link to="/" > 首页 </router-link>
        </li>
        <li>

            <router-link to="/aboutMe"> 关于我 </router-link>
        </li>
        
        <li>

    
            <router-link to="/articleList">文章列表 </router-link>
        </li>

       <div class="head_userstatus rightfloat">
           <a href="login.html" v-if="!islogin"> 登录/注册 </a> 
           <a href="#" v-if="islogin"> 用户:{{user.username}} </a> 
        
        </div>
       
    </ul>

    
    
</div>

<router-view></router-view>


 <div id="foot" class="container-fluid" style="top:60px;">
   
        <div id="container">
            <p class="leftfloat">Copyright 2018-2020 Zhiyigo.cn culture All Rights Reserved<a href="http://beian.miit.gov.cn">蜀ICP备20002097号</a></p>
            <div class="rightfloat">

                <router-link to="/">首页 </router-link>| <router-link to="/aboutme">关于我 </router-link> |  <router-link to="/">文章列表 </router-link>
            </div>
        </div>
</div>

  </div>

</template>

<script>

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import cookieOption from './tools/cooks'
import httpmethods from './http'
import '../public/js/baseUrl.js'
export default {
  name: 'app',
  data() {
      return {
          islogin:false,
          user:{}
      }
  },
  methods: {
    queryUser:function(id){
        var _this=this;
        if(id==null || id ==undefined || id == "" ){
                _this.islogin=false;
                return;
        }
    httpmethods.getDataFuc({},httpbaseUrl+"api/user/"+id,function(data){
    data=data.data;
    console.log(data);
    if(data=="" || data==undefined ||data.username == "" || data.username == undefined){
        _this.islogin=false;
        return;
    }
        if(!(data=="" || data==undefined ||data.username == "" || data.username == undefined)){
                _this.islogin=true;
                _this.user=data;
        }

  });

    }
  },created:function(){

      let userid=cookieOption.getCookie("userdata");
      this.queryUser(userid);

  },mounted(){
      console.log("----mounted----");
        
  }
}
</script>

<style>
  a{
  text-decoration: none;color: #323232;
}
canvas {  margin: auto;  touch-action: none; }
body{position:relative;}
</style>
