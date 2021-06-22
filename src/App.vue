<template>
  <div id="app">
    <div id="head" class="container">
      <div class="head_logo leftfloat">
        <a href="/#/">
          <img src="/images/logo.gif" alt="" title="" />
        </a>
      </div>

      <ul class="head_menu rightfloat">
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
          <router-link to="/bookList">朴树书屋 </router-link>
        </li>
        <div class="head_userstatus rightfloat">
          <a href="login.html" v-if="!islogin"> 登录/注册 </a>
          <a href="#" v-if="islogin"> 用户:{{ user.username }} </a>
        </div>
      </ul>
    </div>

    <div style="min-height: 1200px; height: auto">
      <div class="fixed-player">
        <aplayer
          autoplay
          :list="musicList"
          :music="musicList[0]"
          showLrc
        >
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
import cookieOption from "./tools/cooks";
import httpmethods from "./http";
import Aplayer from "vue-aplayer";
import "../public/js/baseUrl.js";
import {queryMusicList} from "@/api/music";
export default {
  name: "app",
  data() {
    return {
      islogin: false,
      user: {},
      musicList:[{
            title: '告白气球',
            author: '告白气球 - 周杰伦',
            url: 'https://mp32.9ku.com/upload/128/2017/02/05/858423.mp3',
            pic: 'https://www.9ku.com/images/player/logo.png',
            lrc: '[00:00.00]lrc here\n[00:01.00]aplayer',
          }]
    };
  },
  components: {
    Aplayer,
  },
  methods: {
    getAllMusicList(){
      queryMusicList(0,999).then((res)=>{
        let tempmusiclist=res.data.data.content;
        console.log(tempmusiclist)
        tempmusiclist.forEach(element => {
          this.musicList.push(element)
          // debugger
        });
        
      })
    },
    queryUser: function (id) {
      var _this = this;
      if (id == null || id == undefined || id == "") {
        _this.islogin = false;
        return;
      }
      httpmethods.getDataFuc(
        {},
        httpbaseUrl + "api/user/" + id,
        function (data) {
          data = data.data;
          console.log(data);
          if (
            data == "" ||
            data == undefined ||
            data.username == "" ||
            data.username == undefined
          ) {
            _this.islogin = false;
            return;
          }
          if (
            !(
              data == "" ||
              data == undefined ||
              data.username == "" ||
              data.username == undefined
            )
          ) {
            _this.islogin = true;
            _this.user = data;
          }
        }
      );
    },
  },
  created: function () {
    let userid = cookieOption.getCookie("userdata");
    this.queryUser(userid);
  },
  mounted() {
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
  right: -450px;
  top: 50%;
  z-index: 99999;
}
.fixed-player-out {
  right: 1px;
}
.fixed-player:hover {
  right: 1px;
  transition: right 1s;
}
</style>
