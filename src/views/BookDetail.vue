<template>
  <div class="pdf">
    <div class="pdf-tab">
      <div class="btn btn-primary" @click.stop="clock">顺时针</div>
      <div class="btn btn-primary" @click.stop="counterClock">逆时针</div>

      <div class="btn btn-primary" @click.stop="pdfPrintAll">全部打印</div>
      <div class="btn btn-primary" @click.stop="pdfPrint">部分打印</div>
    </div>

    <div class="pagination-com">
      <b-pagination
        v-model="curPageNum"
        :total-rows="pageTotalNum"
        limit="20"
        :per-page="1"
        aria-controls="my-table"
        @change="changePage"
      >
        <template v-slot:prev-text> <div>上一页</div></template>
        <template v-slot:next-text><div>下一页</div></template>
      </b-pagination>
      
      第
      <b-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0 pagination-com-input"
        v-model="curPageNum"
      ></b-input>
      页
      <button class="page-link" @click="changecurentPage">跳转</button>
    </div>

    <div class="bookfont">{{ pageNum }}/{{ pageTotalNum }}</div>
    <div class="bookTile">{{ decodeURIComponent(filename) }}</div>
    <div class="progress" v-if="loadedRatio < 1">
      <div
        class="progress-bar"
        role="progressbar"
        aria-valuenow="60"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: loadedRatio * 100 + '%' }"
      >
        <span class="sr-only">100% Complete</span>
      </div>
    </div>
    <pdf
      ref="pdf"
      :src="pdfUrl"
      :page="pageNum"
      :rotate="pageRotate"
      @progress="loadedRatio = $event"
      @page-loaded="pageLoaded($event)"
      @num-pages="pageTotalNum = $event"
      @error="pdfError($event)"
      @link-clicked="page = $event"
    >
    </pdf>
  </div>
</template>
<script>
import { queryBookDetail, queryBookList, saveBook, delBook } from "@/api/book";
import pdf from "vue-pdf";
export default {
  name: "Pdf",
  components: {
    pdf,
  },
  data() {
    return {
      filename:
        "Java%E9%AB%98%E7%BA%A7%E6%9E%B6%E6%9E%84%E9%9D%A2%E8%AF%95%E7%9F%A5%E8%AF%86%E7%82%B9%E6%95%B4%E7%90%86.pdf",
      pdfUrl:
        "http://cdn.zhiyigo.cn/Java%E9%AB%98%E7%BA%A7%E6%9E%B6%E6%9E%84%E9%9D%A2%E8%AF%95%E7%9F%A5%E8%AF%86%E7%82%B9%E6%95%B4%E7%90%86.pdf",
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
    };
  },
  mounted(){

    let id=this.$route.query.id;
    console.log(id);

    this.getBookDetail(id);
    

  },
  methods: {
    getBookDetail(id){
        queryBookDetail(id).then((res)=>{
          this.pdfUrl=res.data.data.bookUrl;
           this.filename=res.data.data.bookname;
          console.log(this.pdfUrl)
          debugger
        })
    },
    changePage(p) {
      this.pageNum = p;
    },
    changecurentPage() {
      this.pageNum = this.curPageNum;
    },
    clock() {
      this.pageRotate += 90;
    },
    counterClock() {
      this.pageRotate -= 90;
    },

    pageLoaded(e) {
      this.curPageNum = e;
    },
    pdfError(error) {
      console.error(error);
    },
    pdfPrintAll() {
      this.$refs.pdf.print();
    },
    pdfPrint() {
      this.$refs.pdf.print(100, [1, 2]);
    },
  },
};
</script>
<style lang="css" scoped>
.pdf {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pdf span {
  width: 80%;
}
.pdf-tab {
  position: fixed;
  width: 5%;
  height: 300px;
  display: flex;
  flex-direction: column;
  right: 10px;
  top: 30%;
}
.pdf-tab .btn {
  margin-top: 10px;
}
.bookfont {
  font-size: 32px;
}
.bookTile {
  font-size: 32px;
  top: -130px;
  width: 50%;
  text-align: center;
}
.progress {
  width: 90%;
}
.pagination-com-input {
  width: 50px;
  height: 33px;
}
.pagination-com{
    display: flex;
}
</style>