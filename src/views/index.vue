<template>
  <div id="app">
    <div id="head" class="container">
      <div class="head_logo leftfloat">
        <a href="/#/">
          <img src="/images/logo.gif" alt="" title="" />
        </a>
      </div>
    <b-sidebar id="sidebar-variant" title="菜单" shadow>
      <span style="width:80%;">
          <a href="/#/login" v-if="!islogin"> 登录/注册 </a>
          <span v-if="islogin">用户:{{ user.username }}</span>
        </span>
      <b-nav vertical>
      <b-nav-item to="/home">首页</b-nav-item>
      <b-nav-item to="/scan">二维码扫描</b-nav-item>
      <b-nav-item to="/aboutMe">关于我</b-nav-item>
      <b-nav-item to="/articleList">文章列表</b-nav-item>
      <b-nav-item to="/gameListPage">游戏列表</b-nav-item>
      <b-nav-item to="/bookList">朴树书屋</b-nav-item>
      <b-nav-item @click="gotomenu(0)">个人信息</b-nav-item>
      <b-nav-item @click="gotomenu(1)">书签管理</b-nav-item>
      <b-nav-item @click="gotomenu(2)">退出登录</b-nav-item>
      </b-nav>
    </b-sidebar>
    <div class="rightfloat">
      <div v-b-toggle.sidebar-variant class="head_menu_icon"><b-icon icon="text-indent-right" variant="primary" font-scale="2"></b-icon></div>
      <!-- <b-button ></b-button> -->
        <ul class="head_menu ">
        <li>
          <!-- class="active" -->
          <router-link to="/home"> 首页 </router-link>
        </li>
        <li>
          <router-link to="/aboutMe"> 关于我 </router-link>
        </li>

        <li>
          <router-link to="/articleList">文章列表 </router-link>
        </li>
        <li>
          <router-link to="/gameListPage">游戏列表 </router-link>
        </li>
        <li>
          <router-link to="/bookList">朴树书屋 </router-link>
        </li>
        <div class="head_userstatus rightfloat" id="left-menu">
          <a href="login.html" v-if="!islogin"> 登录/注册 </a>
          <a href="#"  v-if="islogin"> 用户:{{ user.username }} </a>
          <b-popover target="left-menu" triggers="hover" placement="top">
            <template #title>个人中心</template>
            <b-list-group>
              <b-list-group-item href="#" @mouseover="mouseOver(0)" :active="currentIndex==0" @click="gotomenu(0)">个人信息</b-list-group-item>
              <b-list-group-item href="#"  @mouseover="mouseOver(1)" :active="currentIndex==1" @click="gotomenu(1)">书签管理</b-list-group-item>
              <b-list-group-item href="#"  @mouseover="mouseOver(2)" :active="currentIndex==2" @click="gotomenu(2)">退出登录</b-list-group-item>      
            </b-list-group>
          </b-popover>
        </div>
      </ul>
    </div>
      
    </div>

    <div style="min-height: 1200px; height: auto;width:100%">
      <div class="fixed-player" v-if="showMusic">
        <aplayer autoplay="false" :list="musicList" :music="musicList[0]" showLrc>
        </aplayer>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <div id="foot" class="container-fluid">
      <div id="container">
        <p class="leftfloat">
          Copyright 2018-2020 Zhiyigo.cn culture All Rights Reserved<a
            href="http://beian.miit.gov.cn"
            >蜀ICP备20002097号</a
          >
        </p>
        <div class="rightfloat">
          <router-link to="/">首页 </router-link>|
          <router-link to="/aboutme">关于我 </router-link> |
          <router-link to="/">文章列表 </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCookie,delCookie} from "@/tools/cooks";
import httpmethods from "@/http";
import Aplayer from "vue-aplayer";
import "../../public/js/baseUrl.js";
import { queryMusicList } from "@/api/music";
import { getUser } from "@/api/user";
export default {
  name: "app",
  data() {
    return {
      islogin: false,
      user: {},
      currentIndex:9,
      showMusic:false,
      musicList: [],
    };
  },
  components: {
    Aplayer,
  },
  methods: {
    mouseOver(index){
      this.currentIndex=index;
    },
    gotomenu(index){
      if(index==2){
        delCookie('userdata')
        location.reload();
        return
      }
      let arr=["/personCenter/personinfo","/personCenter/booktags"]
      let menu=arr[index]
      location.href="/#"+menu
    },
    getAllMusicList() {
      queryMusicList(0, 999).then((res) => {
        let tempmusiclist = res.data.data.content;
        console.log(tempmusiclist);
        tempmusiclist.forEach((element) => {
          this.musicList.push(element);
          // debugger
        });
      });
    },
    queryUserDetail:async function (id) {
      var _this = this;
      if (id == null || id == undefined || id == "") {
        _this.islogin = false;
        return;
      }
      let {data} =await getUser(id);     
          console.log(data);          
         _this.islogin =  data|| data.username;
          if (  _this.islogin  ) {
            // debugger
            _this.user = data;
          }

    },
  },
  created: function () {
    let userid = getCookie("userdata");

    this.queryUserDetail(userid);
  },
  mounted() {
    this.showMusic=window.innerWidth>768;
    console.log("----mounted----");
    this.getAllMusicList();
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: #323232;
}
canvas {
  margin: auto;
  touch-action: none;
}
body {
  position: relative;
}
.fixed-player {
  width: 500px;
  position: fixed;
  left: -450px;
  top: 30%;
  z-index: 99999;
}
.fixed-player-out {
  left: 1px;
}
.fixed-player:hover {
  left: 1px;
  transition: left 1s;
}

.b-sidebar-body ul li{
  text-align: center;
}
.b-sidebar-body span{
  text-align: center;
}
#sidebar-variant{
  width: 30%;
}
@media screen and (max-width: 1666px){
  #foot{
    display: none;
  }
  .b-sidebar{
    width: 50% !important;
  }
  .head_menu{
    display: none;
  }
  .head_menu_icon{
    margin-top:19px;
  }
  .b-sidebar-body{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}


@media screen and (min-width: 1667px){
  .head_menu_icon{
    display: none;
  }
}

</style>