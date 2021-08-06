<template>
  <div class="bookcontainer">
    <div class="bookcontainer-content">
      <b-card-group columns>
        <b-card
          :title="item.bookname"
          :img-src="item.imgurl"
          img-alt="Image"
          v-for="(item, index) in bookList"
          :key="index"
          @click="gotobook(item.id)"
        >
          <b-card-text>
            {{ item.bookdes }}
          </b-card-text>
        </b-card>
      </b-card-group>

      <Pagehelper
      v-bind:tatolpage="tatolpage"
      v-bind:curpage="curpage"
      v-on:queryAllBypagechild="getBookList"
      ref="pagehp"
    ></Pagehelper>
    </div>
  </div>
</template>

<script>
import Pagehelper from "@/components/pagehelper.vue";
import { queryBookDetail, queryBookList, saveBook, delBook } from "@/api/book";
export default {
  data() {
    return {
      pagesize: 999,
      bookList: [],
      curpage:0,
      tatolpage:0
    };
  },
  methods: {
    getBookList(page) {
        this.curpage=page;

      queryBookList(page, this.pagesize).then((res) => {
        let tempdata = res.data.data.content;
        // debugger
        this.tatolpage =  res.data.data.totalPages;
        let self = this;
        tempdata.forEach((element) => {
          self.bookList.push(element);
        });

        console.log(this.bookList);
        this.$forceUpdate();
        // debugger
      });
    },
    gotobook(id) {
      window.open("/#/bookDetail?id=" + id);
    },
  },
  components:{
      Pagehelper
  },
  mounted() {
    this.getBookList(0);
  },
};
</script>

<style scoped>
.bookcontainer {
  display: flex;
  justify-content: center;
}
.bookcontainer-content {
  width: 90%;
}

@media screen and (max-width: 600px) {
  .card-columns {
    column-count: 1 !important;
  }
}
@media screen and (min-width: 600px) and (max-width: 800px) {
  .card-columns {
    column-count: 3 !important;
  }
}

@media screen and (min-width: 800px) and (max-width: 2200px) {
  .card-columns {
    column-count: 5 !important;
  }
}
</style>