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
            <span class="float-right">&rsaquo;</span></router-link>
        </b-list-group>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/ListPage.css'
import config from '@/assets/script/config'

import {queryGameDetail,
  queryGameList,
  saveGame,
  delGame,} from '@/api/game'
export default {

  data () {
    return {
      config: config,
      gameList:[],
      start: null,
      pagesize:20
    }
  },
  async mounted () {
    await this.queryAllGameBypage(0);
  
  },
  
  methods: {
    
     queryAllGameBypage:async function (page) {
      var _this = this;

     let {data} =await queryGameList(page, _this.pagesize);
      let tempdata = data.data.content;
      debugger
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