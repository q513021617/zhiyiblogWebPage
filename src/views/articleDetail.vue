<template>
  <div class="container">
      <h1 class="center">{{title}}</h1>
     
    <div id="contentDIV" style="position:relative;top:50px;"></div>

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
    },
      getArticle:function(id){
        
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

  },created:function(){

    let id=this.$route.params.id;
    console.log();
    this.getArticle(id);
    

  }
}
</script>

<style>
.center{
   text-align: center;
}
</style>
