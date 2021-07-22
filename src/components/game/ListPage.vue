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
          <router-link v-for="key in Object.keys(config.ROMS)" :key="key" :to="'/run/' + encodeURIComponent(key)" class="list-group-item">
            {{key}}
            <span class="float-right">&rsaquo;</span></router-link>
        </b-list-group>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/ListPage.css'
import config from '@/assets/script/config'
export default {

  data () {
    return {
      config: config,
      start: null
    }
  },
  mounted () {

  },
  methods: {

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
