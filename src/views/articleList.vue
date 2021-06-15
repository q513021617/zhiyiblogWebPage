<template>
  <div style="background-color: #f4f5f5;height:1200px;">
    <h1 style="text-align: center;margin-top:50px;">文章列表</h1>

    <div class="article-container">
     
        <b-card
          v-for="(item, index) in articleDataList"
          :key="index"
          :title="item.title"
          :bg-variant="bgchange[index]"
          tag="article"
          class="xd-6 article-item"
          @click="linktoFunc(item.id)"
        >
          <b-card-text>
            {{ item.articleContent.substring(0, 150) }}........
          </b-card-text>
        </b-card>
   
    </div>

    <Pagehelper
      v-bind:tatolpage="tatolpage"
      v-bind:curpage="curpage"
      v-on:queryAllBypagechild="getArticle"
      ref="pagehp"
    ></Pagehelper>
  </div>
</template>

<script>
import httpmethods from "@/http";
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Pagehelper from "@/components/pagehelper.vue";
import "../../public/js/baseUrl.js";

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  data() {
    return {
      articleDataList: [],
      bgchange: [],
      tatolpage: 0,
      curpage: 0,
      pagesize: 7,
    };
  },
  methods: {
    getArticle: function (page) {
      //   http://localhost:8888/api/aricle/0/4
      var _this = this;

      httpmethods.getDataFuc(
        {},
        httpbaseUrl + "api/aricle/" + page + "/" + this.pagesize,
        function (data) {
          data = data.data;
          console.log(data.content);
          var datalist = data.content;
          _this.articleDataList = datalist;
          let index = 0;
          datalist.forEach(function (tItem) {
            _this.bgchange.push("");
          });
          _this.tatolpage = data.totalPages;
          _this.$refs.pagehp.refreshdata(_this.tatolpage);
          _this.$forceUpdate();
        }
      );
    },
   
    linktoFunc: function (id) {
      // this.$router.push({ path: "/articledetail",params: { id: id }});
      window.open("/#/articledetail?id="+id)
    },
    changeBg: function (index) {
      this.bgchange[index] = this.bgchange[index] == "light" ? "" : "light";
      this.$forceUpdate();
    },
  },
  components: {
    Pagehelper,
  },
  created: function () {
    this.getArticle(0);
  },
};
</script>

<style>
.article-container {
  min-height: 1050px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nocolor {
  text-decoration: none;
  color: #323232;
}
.article-item{
  width: 90%;
  height: 150px;
  margin-top: 10px;
}
.article-item:hover
{ 
background-color:green;
color: aliceblue;
}
</style>
