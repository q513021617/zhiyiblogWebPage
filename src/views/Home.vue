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
        <ul class="service_list">
            <li>
                <!-- 102 -->

                <a href="https://github.com/q513021617/zhiyiCMS"><div></div></a>
                <h3>1,zhiyiCMS</h3>
                <p>基于springboot和VUE开发的一款通用
                    <br>后台管理系统</p>
            </li>

            <li>
                  <a href="https://github.com/q513021617/zhiyiblog"><div></div></a>
                <h3>2,zhiyiblog</h3>
                <p>基于zhiyiCMS开发的一款个人
                    <br>博客主页</p>
            </li>

            <li>
                <a href="#"><div></div></a>
                <h3>3,在线考试系统</h3>
                <p>基于SSM框架开发的考试系统
                    <br>考试系统</p>
            </li>
            <li>
                 <a href="#"><div></div></a>
                <h3>4,冲关答题系统</h3>
                <p>支持手机端，PC端的
                    <br>答题系统</p>
            </li>
        </ul>
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
                            <h3> <router-link :to="'/articleDetail/'+article.id">{{article.title}}</router-link></h3>
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
          articleDataList:[]
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
