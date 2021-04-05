<template>

  <div style="background-color:#f4f5f5;">
      <h1 style="text-align:center;">文章列表</h1>

      <div class="container">
      
      <router-link :to="'/articleDetail/'+ item.id"  v-for="item,index in  articleDataList" class="nocolor">
      <b-card
            @mouseover="changeBg(index)"
            @mouseout="changeBg(index)"
       
            :title="item.title"
            :bg-variant="bgchange[index]"
              tag="article"
            class="xd-6"
         
             >


           <b-card-text>
                   {{item.articleContent.substring(0,50)}}........
            </b-card-text>

    
              </b-card> 
        </router-link>
       

            
   
         
      </div>

    <Pagehelper
                 v-bind:tatolpage="tatolpage"
                 v-bind:curpage="curpage"
                 v-on:queryAllBypagechild="getArticle"
                 ref = "pagehp"
            
                 ></Pagehelper>
  </div>

</template>

<script>
import httpmethods from '@/http'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Pagehelper from '@/components/pagehelper.vue'
import '../../public/js/baseUrl.js'



// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  data() {
    return {
         articleDataList:[],
         bgchange:[],
         tatolpage:0,
         curpage:0,
         pagesize:7
    }
  },
  methods: {
      getArticle:function(page){
        
        //   http://localhost:8888/api/aricle/0/4
        var _this=this;
     
            httpmethods.getDataFuc({},httpbaseUrl+"api/aricle/"+page+"/"+this.pagesize,function(data){
                    data=data.data;
                    console.log(data.content);
                    var datalist=data.content;
                    _this.articleDataList=datalist;
                    let index = 0;
                    datalist.forEach(function(tItem){
                          _this.bgchange.push("");
                    })
                    _this.tatolpage=data.totalPages;
                    _this.$refs.pagehp.refreshdata( _this.tatolpage);
                  _this.$forceUpdate();
            })

      },
      linktoFunc:function(id){

          // location.href="#/articleDetail?id="+id;
          this.$router.push({ path: '/articleDetail' });
      },
      changeBg:function(index){
        
            this.bgchange[index]=this.bgchange[index]=="light"?"":"light";
             this.$forceUpdate();
           
      }
  },
  components: {
      Pagehelper
  },
  created: function(){

    this.getArticle(0);

  }
}
</script>

<style>
.container{
  height: 550px;
}
.nocolor{
  text-decoration: none;color: #323232;
}
</style>
