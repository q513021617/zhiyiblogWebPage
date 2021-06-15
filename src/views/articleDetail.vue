<template>
  <div class="page-container">
      <h1 class="center">{{title}}</h1>
     
    <div id="contentDIV" style="position:relative;top:50px;height:auto;"></div>

  </div>

</template>

<script>

import httpmethods from '@/http'
import '../../public/js/baseUrl.js'
export default {
  data() {
    return {
        title:"",
        content:""
    }
  },
  methods: {
    convertHtml:function(text){
      var converter = new showdown.Converter();

      var html = converter.makeHtml(text);
      return html;
    },getArticle:function(id){ 
        
        //   http://localhost:8888/api/aricle/0/4
        var _this=this;
        
            httpmethods.getDataFuc({},httpbaseUrl+"api/aricle/"+id,function(data){
                    data=data.data;
                    console.log(data);
                   
                    _this.title=data.title;
                   _this.content=data.articleContent;
                   const contentH5 = document.getElementById('contentDIV');
                    var temphtml = _this.convertHtml(_this.content);
                   contentH5.innerHTML=temphtml;
                  _this.$forceUpdate();
            })

      }
  },
  components: {

  },mounted(){

    let id=this.$route.query.id;
    console.log(id);
    // alert(id)
    this.getArticle(id);
    

  }
}
</script>

<style>
.center{
   text-align: center;
}
#contentDIV{
  width: 98%;
  box-shadow: 0 10px 35px 2px rgb(0 0 0 / 15%), 0 5px 15px rgb(0 0 0 / 7%), 0 2px 5px -5px rgb(0 0 0 / 10%) !important;
  padding: 30px;
}
.page-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 1500px;
}
pre code {
    font-size: inherit;
    color: inherit;
    word-break: normal;
    background: saddlebrown;
    min-height: 50px;
    display: flex;
    color: white;
    align-items: center;
    border-radius: 7px;
}
</style>
