<template>
  <div>
    <div class="contaner-fluid" style="height:399px;">
     <canvas id="canv" class="p5Canvas" width="100%" height="100%" style="width: 100%; height: 100%;"></canvas>
    </div>
<!-- そばにいるね 背景音乐 -->
    <div id="service" class="container">
    <div class="area_title">
        <h2>我的开源项目</h2>
        <p>My github</p>

       <div style="width:80%;">
            <b-card-group columns>
        <b-card
        :img-src="item.faceUrl"
        :title="item.title"
        img-alt="Image"
        img-width="100"
        img-height="100"
        v-for="item,index in projectList"
      :key="index"
      @click="gotoProject(item.projectUrl)"
    >
      <b-card-text>
        {{item.des}}
      </b-card-text>
    </b-card>

   
  </b-card-group>
       </div>


    </div>

</div>

<div id="news" class="container">

    <div class="area_title">
       
        <h2>最新文章</h2>
        <p>THE LATEST ArticleS</p>
    </div>

    <dl>

        <dt class="leftfloat">
            <img src="/images/address.gif" alt="一杯咖啡一刻阅读" width="220px" height="160px">
        </dt>
        <dd class="leftfloat">

            <ul class="new_list">

                <li v-for="(article,index) in articleDataList">

                    <div class="new_date leftfloat">
                        <i>{{timeArr[index].day}}</i>
                        <span>{{timeArr[index].month}}</span>
                        <div class="new_text leftfloat">
                            <h3> <router-link :to="'/articleDetail?id='+article.id">{{article.title}}</router-link></h3>
                            <p>{{article.articleContent.substring(0,20)}}</p>
                        </div>
                    </div>
                </li>

            
            </ul>
        </dd>
    </dl>
        </div>
  </div>
</template>

<script>

import bannermethods from'@/cavastool/bannerscript.js'
import httpmethods from '@/http'
import '../../public/js/baseUrl.js'


function Part() {
  this.deg = 0;
  this.rad = 0;
  this.x = 0;
  this.y = 0;
  this.distX = 0;
  this.distY = 0;
  this.color = 'rgb(' + Math.floor(Math.random() * 130) + ',' + Math.floor(Math.random() * 50) + ',' + Math.floor(Math.random() * 100) + ')';
  this.size;
}
function TimeObj(){
    this.month="";
    this.day="";
}
export default {
  name: 'home',
  data() {
      return {
          timeArr:[],
          articleDataList:[],
          projectList:[{title:"zhiyiCMS",des:"基于springboot和VUE开发的一款通用",type:"后台管理系统",projectUrl:"https://github.com/q513021617/zhiyiCMS",faceUrl:"/images/icon01.svg"},
          {title:"zhiyiblog",des:"基于springboot和VUE开发的一款通用",type:"博客主页",projectUrl:"https://github.com/q513021617/zhiyiblog",faceUrl:"/images/icon01.svg"},
          {title:"在线考试系统",des:"基于SSM框架开发的考试系统",type:"考试系统",projectUrl:"",faceUrl:"/images/icon01.svg"},
          {title:"冲关答题系统",des:"支持手机端，PC端的",type:"答题系统",projectUrl:"",faceUrl:"/images/icon01.svg"}]
      }
  },
  methods:{
      getArticle:function(){
        //   http://localhost:8888/api/aricle/0/4
        var _this=this;
            httpmethods.getDataFuc({},httpbaseUrl+"api/aricle/0/4",function(data){
                    data=data.data;
                    console.log(data.content);
                    var datalist=data.content;
                    _this.articleDataList=datalist;
                    datalist.forEach(function(tItem){

                        _this.timeToEn(tItem.postTime);
                    });
            _this.$forceUpdate();
            })

      },
      gotoProject:function(url){
          location.href=url
      },
      returndata:function(index){

            console.log("returndata ");
            console.log(index);

            let tempdata =this.articleDataList;
            console.log(tempdata[0]);
            let tempobj = tempdata[index];
            console.log(tempobj);
          return tempobj.id;
      },
    timeToEn:function(time){
        var en_mon_arr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec"];
        let timeobj=new TimeObj();
        timeobj.month=time.substring(5,7);
        let monthindex=parseInt(timeobj.month);
        timeobj.month=en_mon_arr[monthindex];
        timeobj.day=time.substring(8,10);
        

        console.log(timeobj.month+" "+timeobj.day);
        this.timeArr.push(timeobj);
    }

  },
  components: {
    
  },mounted(){
    //   console.log("----mounted----");
       bannermethods.start();
  },created(){
       this.getArticle();
  }
}
</script>
<style lang="css" scoped>
@media screen and (min-width: 1028px)
{
  .card-columns {
    column-count: 4 !important;
  }
}
@media screen and (max-width: 1027px)
{
  .card-columns {
    column-count: 1 !important;
  }
}
</style>