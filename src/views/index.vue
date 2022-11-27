<template>
  <div id="app">

    <commonnavbar></commonnavbar>

    <div style="min-height: 1200px; height: auto;width:100%">
      <div class="fixed-player" v-if="showMusic">
        <!-- <Aplayer autoplay="false" :list="musicList" :music="musicList[0]" showLrc>
        </Aplayer> -->
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <pagefooter></pagefooter>
  </div>
</template>

<script>
import {getCookie,delCookie} from "@/tools/cooks";
import pagefooter from "@/views/pagefooter";
import commonnavbar from "@/components/commonnavbar";
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
    Aplayer,pagefooter,commonnavbar
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
#app{
        display: flex;
        flex-direction: column;
    }

#service {overflow: hidden;min-height: 407px;position: relative;}
    #service .service_list{text-align: center;margin-top: 34px;}
    #service .service_list li{float: left;width: 250px;margin: 0 10px;}
    #service .service_list div{width: 102px;height: 102px;margin: 0 auto;}
    #service .service_list li:nth-of-type(1) div{background-image: url(/images/icon01.svg);background-repeat: no-repeat;}
    #service .service_list li:nth-of-type(2) div{background-image: url(/images/icon01.svg);background-repeat: no-repeat;}
    #service .service_list li:nth-of-type(3) div{background-image: url(/images/icon01.svg);background-repeat: no-repeat;}
    #service .service_list li:nth-of-type(4) div{background-image: url(/images/icon01.svg);background-repeat: no-repeat;}
    #service .service_list h3{font-size: 18px;color: #434343;line-height: 36px;margin-top: 25px;}
    #service .service_list p{font-size: 14px;color: #6d6d6d;line-height: 22px;}

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