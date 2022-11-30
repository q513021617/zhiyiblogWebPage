<template>
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
        <li v-for="temp in navlist">
          <!-- class="active" -->
          <router-link :to="temp.url"> {{temp.name}} </router-link>
        </li>
      <b-nav-item @click="gotomenu(0)">个人信息</b-nav-item>
      <b-nav-item @click="gotomenu(1)">书签管理</b-nav-item>
      <b-nav-item @click="gotomenu(2)">退出登录</b-nav-item>
      </b-nav>
    </b-sidebar>
    <div class="rightfloat">
      <div v-b-toggle.sidebar-variant class="head_menu_icon"><b-icon icon="text-indent-right" variant="primary" font-scale="2"></b-icon></div>
      <!-- <b-button ></b-button> -->
        <ul class="head_menu ">
        <li v-for="temp in navlist">
          <!-- class="active" -->
          <router-link :to="temp.url"> {{temp.name}} </router-link>
        </li>
        <div class="head_userstatus rightfloat" id="left-menu">
          <a href="/#/login" v-if="!islogin"> 登录/注册 </a>
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
</template>

<script>
export default {
  name: "commonnavbar",
  
  data() {
    return {
      islogin: false,
      user: {},
      menulist:[{name}],
      navlist:[{name:'首页',url:"/home" },{name:'二维码扫描',url:"/scan" },{name:'关于我',url:"/aboutMe" },{name:'文章列表',url:"/articleList" }
          ,{name:'游戏列表',url:"/gameListPage" },{name:'朴树书屋',url:"/bookList" }],
      currentIndex:9,
      showMusic:false,
      musicList: [],
    };
  },
  }
</script>
<style>

#head{height:81px}

#head .head_logo{width: 162px;height: 44px;margin-top: 19px;}


#head .head_menu{font-size:14px;margin-top: 19px;}

#head .head_menu li{float: left; margin-left: 58px;}
#head .head_menu li a{text-decoration: none;color: #323232;}
#head .head_menu li a.active{color: #0ec4a2;}
#head .head_userstatus {float: left; margin-left: 58px;}
#head .head_userstatus a{text-decoration: none;color: #323232;font-size: medium;}
</style>