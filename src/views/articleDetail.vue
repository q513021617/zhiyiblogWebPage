<template>
  <div class="page-container">
    <h1 class="center">{{ title }}</h1>
    <span>发表时间:{{postTime}}  </span>
   
    <vue-markdown class="article" :source="content" v-highlight></vue-markdown>
    <div class="pdf-tab">
      <div class="btn btn-primary" v-b-toggle.sidebar-1>查看评论</div>
    </div>

    <b-sidebar id="sidebar-1" title="评论列表" shadow>
      <div>
        <b-form-textarea
          id="textarea"
          v-model="commit"
          placeholder="请说说你的观点..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <b-button block variant="primary" @click="sumbitCommit">发表评论</b-button>
      </div>

      <div class="px-3 py-2">
        <ul class="list-unstyled">
          <b-media tag="li" v-for="(item, index) in articleList" :key="index">
            <template #aside>
             <div class="article-left">
                 <b-avatar variant="info" :src="item.userAvatars"></b-avatar>
              </div>
            </template>
            <div class="commit-username">{{ item.userName }}</div>
            <div class="mb-0 commit-text">
             {{ item.commitContent }}
            </div>
          </b-media>
        </ul>
        
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import httpmethods from "@/http";
import "../../public/js/baseUrl.js";
import VueMarkdown from 'vue-markdown'
import { addArticleCommit,querygetArticleCommitList } from "@/api/article";
import { makeToast} from "@/tools/msg";
export default {
  data() {
    return {
      mainProps: { width: 75, height: 75, class: "m1" },
      title: "",
      articleid:"",
      content: "",
      commit: "",
      postTime:"",
      articleList: [     
      ],
    };
  },
  methods: {
   async sumbitCommit(){
      let commit=this.commit;
      let userStr=localStorage.getItem("userData");
      let userobj=JSON.parse(userStr)
      let articleid=this.articleid;
       await addArticleCommit({userId:userobj.id,articleId:articleid,commitContent:commit})
      makeToast(this, "success", "发表评论成功");
      this.queryCommit(this.articleid);
    },
   async queryCommit(id) {
         let{data} =await querygetArticleCommitList(id);
         data=data.data;
         this.articleList=data.slice(0,data.length)
         console.log(this.articleList);
    },
    getArticle: function (id) {
 
      var _this = this;
      httpmethods.getDataFuc(
        {},
        httpbaseUrl + "api/aricle/" + id,
        function (data) {
          data = data.data;
          console.log(data);

          _this.title = data.title;
          _this.content = data.articleContent;
          _this.postTime=data.postTime.split('T')[0];
          _this.$forceUpdate();
        }
      );
    },
  },
  components: {
    VueMarkdown
  },
  mounted() {
    let id = this.$route.query.id;
    this.articleid=id;
    console.log(id);
    
    this.getArticle(id);
    this.queryCommit(id);
  },
};
</script>

<style>
.center {
  text-align: center;
}
@media screen and (max-width:600px){
  .center{
    font-size: 20px;
  }
}
img{
  width: 100%;
}
.list-unstyled li{
  margin-top: 1rem;
}
.article {
  width: 98%;
  box-shadow: 0 10px 35px 2px rgb(0 0 0 / 15%), 0 5px 15px rgb(0 0 0 / 7%),
    0 2px 5px -5px rgb(0 0 0 / 10%) !important;
  padding: 30px;
}
.article-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article-right {
  width: 100%;
  min-height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
}
.commit-username{
  display: flex;
  justify-content: flex-start;
  font-weight: 800;
}
.area_title{margin-top: 60px;display: flex;flex-direction: column;align-items: center;}
.area_title h2{height:20px; line-height: 20px;font-size: 20px;color: #363636;font-weight:normal ;}
.area_title p{color: #9f9f9f;font-size: 14px;line-height: 34px;}
.b-sidebar-body div{
  width: 90%;
}
.pdf-tab {
  position: fixed;
  width: 5%;
  height: 300px;
  display: flex;
  flex-direction: column;
  right: 10px;
  top: 60%;
}
.pdf-tab .btn {
  margin-top: 10px;
}
.commit-text{
  display: flex;
flex-wrap:wrap;
 word-break: break-all;
}
.page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 1500px;
}

.media-aside{
  width: 20% !important;
}
.hljs {
    background: #FAFAFA !important;
}
pre code {
  font-size: inherit;
  word-break: normal;
   
  min-height: 50px;
  display: flex;
  align-items: center;
  border-radius: 7px;
  padding: 10px;
  overflow: scroll;
}
</style>
