<template>
  <div class="article-page">
    <iframe src="./code/index.html" class="codeblock"></iframe>
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
            {{  splitContent(item.articleContent)}}........
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
      pagesize: 5,
    };
  },
  methods: {
    splitContent(text){
        if(document.body.clientWidth>1100){
            return text.substring(0, 150);
        }
         return text.substring(0, 50);
    },
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
    Pagehelper
  },
  created: function () {
    this.getArticle(0);
  },
};
</script>

<style scoped>
.article-page{
  background-color: white;
  height:1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article-container {
  min-height: 850px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nocolor {
  text-decoration: none;
  color: #323232;
}
.card{
 
  box-shadow: 0 10px 35px 2px rgb(0 0 0 / 15%), 0 5px 15px rgb(0 0 0 / 7%), 0 2px 5px -5px rgb(0 0 0 / 10%) !important;
}
.card-footer{
  width: 90% !important;
  background-color: rgba(255, 255, 255, 0.03) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.125) !important;
}
.article-item{
  width: 90%;
  min-height: 120px;
  margin-top: 10px;
}

.article-item:hover
{ 
background-color:green;
color: aliceblue;
}

.codeblock{
  width: 90%;
  height: 230px;
}

@media screen and (max-width: 600px) {
    .card-columns{
    column-count: 1 !important;
  }
  h4{
    font-size: 1rem;
    font-weight: 800;
  }
}
@media screen and (min-width: 600px) and (max-width: 800px) {
    .card-columns{
    column-count: 3 !important;
}
}

@media screen and (min-width: 800px) and (max-width: 2200px){
    .card-columns{
    column-count: 5 !important;
}
}
</style>
