<template>
  <div class="container ListPage my-4" @ondragover="handleDragOver" @onDrop="handleDrop">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <header class="mb-4">
          <h1 class="mb-3">小霸王世界</h1>
          <p>致我们逝去的青春.</p>
          <p>
            By john zhang          
          </p>
        </header>
        <b-list-group class="mb-4">
          <router-link v-for="key in gameList" :key="key.id" :to="'/run/' + key.id" class="list-group-item">
            {{key.gameName}}
            <span class="float-right">&rsaquo;</span>
          </router-link>
        </b-list-group>
        
        <b-pagination
        v-model="curpage"
        :total-rows="tatolpage"
        limit="20"
        :per-page="1"
        aria-controls="my-table"
        @change="queryAllGameBypage"
      >
        <template v-slot:prev-text> <div>上一页</div></template>
        <template v-slot:next-text><div>下一页</div></template>
      </b-pagination>

      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/ListPage.css'
import config from '@/assets/script/config'
import Pagehelper from "@/components/pagehelper.vue";
import {queryGameDetail,
  queryGameList,
  saveGame,
  delGame,} from '@/api/game'
import { create } from 'nipplejs';
export default {

  data () {
    return {
      config: config,
      gameList:[],
      start: null,
      pagesize:20,
      tatolpage:0,
      curpage:1
    }
  },
  created () {
    this.queryAllGameBypage(1);  
  },
  components:{
    Pagehelper
  },
  methods: {
    
     queryAllGameBypage:async function (page) {

      var _this = this;
      this.curpage=page;

     let {data} =await queryGameList(page-1, _this.pagesize);
      let tempdata = data.data.content;
      this.tatolpage= data.data.totalPages;
      // debugger
        _this.gameList = tempdata.slice(0, tempdata.length);
    },
    handleDragOver (e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleDrop (e) {
      e.preventDefault()

      const file = e.dataTransfer.items
        ? e.dataTransfer.items[0].getAsFile()
        : e.dataTransfer.files[0]

      this.$route.history.push({ path: '/run', state: { file } })
    }
  }
}
</script>
<style lang="css" scoped>

</style>