<template>
  <div>
    <b-container fluid>
      <b-row>
       <b-col cols="12">
         <b-card
    overlay
    img-src="https://picsum.photos/900/250/?image=3"
    img-alt="Card Image"
    text-variant="white"
    title="个人中心"
    sub-title="userinfo center"
  >
    <b-card-text>
      {{userinfo.username}}的个人中心
    </b-card-text>
  </b-card>
       </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-list-group>
            <b-list-group-item
              href="#"
              @mouseover="mouseOver(0)"
              :active="currentIndex == 0"
              @click="gotomenu(0)"
              >个人信息</b-list-group-item
            >
            <b-list-group-item
              href="#"
              @mouseover="mouseOver(1)"
              :active="currentIndex == 1"
              @click="gotomenu(1)"
              >书签管理</b-list-group-item
            >
          </b-list-group>
        </b-col>
        <b-col>
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      currentIndex: 9,
      userinfo:{username:'sasdasd'}
    };
  },
  mounted() {
    let user=localStorage.getItem("userData")
    this.userinfo=JSON.parse(user)
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    mouseOver(index) {
      this.currentIndex = index;
    },
    gotomenu(index) {
      let arr = ["/personCenter/personinfo", "/personCenter/booktags"];
      let menu = arr[index];

      // this.$router.push({ path: menu })
      location.href = "/#" + menu;
    },
  },
};
</script>

<style scoped>
.col {
  min-width: 300px;
}
</style>