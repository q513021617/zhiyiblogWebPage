<template>
  <div>
 
  <canvasplayer></canvasplayer>

    <div id="service" class="container">
      <div class="area_title">
        <h2>我的开源项目</h2>
        <p>My github</p>

        <div style="width:80%;">
          <b-card-group columns>
            <b-card :img-src="item.faceUrl" :title="item.title" img-alt="Image" img-width="100" img-height="100"
              v-for="item,index in projectList" :key="index" @click="gotoProject(item.projectUrl)">
              <b-card-text>
                {{ item.des }}
              </b-card-text>
            </b-card>


          </b-card-group>
        </div>


      </div>

    </div>

    <news></news>

  </div>
</template>

<script>



import '../../public/js/baseUrl.js'
import news from "@/components/news";
import canvasplayer from "@/components/canvasplayer";


export default {
  name: 'home',
  data() {
    return {
      timeArr: [],
      articleDataList: [],
      projectList: [{ title: "zhiyiCMS", des: "基于springboot和VUE开发的一款通用", type: "后台管理系统", projectUrl: "https://github.com/q513021617/zhiyiCMS", faceUrl: "/images/icon01.svg" },
      { title: "zhiyiblog", des: "基于springboot和VUE开发的一款通用", type: "博客主页", projectUrl: "https://github.com/q513021617/zhiyiblog", faceUrl: "/images/icon01.svg" },
      { title: "在线考试系统", des: "基于SSM框架开发的考试系统", type: "考试系统", projectUrl: "", faceUrl: "/images/icon01.svg" },
      { title: "冲关答题系统", des: "支持手机端，PC端的", type: "答题系统", projectUrl: "", faceUrl: "/images/icon01.svg" }]
    }
  },
  components:{
    news,canvasplayer
  },
  methods: {
 
    gotoProject: function (url) {
      location.href = url
    },
    returndata: function (index) {

      console.log("returndata ");
      console.log(index);

      let tempdata = this.articleDataList;
      console.log(tempdata[0]);
      let tempobj = tempdata[index];
      console.log(tempobj);
      return tempobj.id;
    }

  }
}
</script>
<style lang="css" scoped>
@media screen and (min-width: 1028px) {
  .card-columns {
    column-count: 4 !important;
  }
}

@media screen and (max-width: 1027px) {
  .card-columns {
    column-count: 1 !important;
  }
}
</style>