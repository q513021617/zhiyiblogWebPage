<template>
  <div class="pdf">
    <div class="pdf-tab">
      <div class="btn btn-primary" @click.stop="clock">顺时针</div>
      <div class="btn btn-primary" @click.stop="counterClock">逆时针</div>
      <div class="btn btn-primary" @click.stop="pdfPrintAll">全部打印</div>
      <div class="btn btn-primary" @click.stop="pdfPrint">部分打印</div>
      <div class="btn btn-primary" @click.stop="addtag">添加到书签</div>
    </div>

    <div class="btn btn-primary top-btn" @click.stop="backTop">回到顶部</div>

    <div class="pagination-com" id="top-pagination">
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
    <div class="bookTile" id="bookTitle">
      {{ decodeURIComponent(filename) }}
    </div>
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
  </div>
</template>
<script>
import cookieOption from "@/tools/cooks";
import { queryBookDetail } from "@/api/book";
import {
  queryBookMarTagDetail,
  queryBookMarTagList,
  saveBookMarTag,
} from "@/api/bookMark";
import pdf from "vue-pdf";
export default {
  name: "Pdf",
  components: {
    pdf,
  },
  data() {
    return {
      bookid: 0,
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
      booktagDetail: {},
    };
  },
  activated(){
     console.log("-----updated------")
      this.init();
  },
   mounted() {
      console.log("-----mounted------")
    // this.init();
  },
  methods: {
    async init(){
     
        let tempbookid = this.$route.query.id;
        if (tempbookid) {
          this.bookid = tempbookid;
        }
      this.getBookDetail(this.bookid);
    },
    makeToast(variant = null, title) {
      let successtag = [
        { name: "success", des: "成功" },
        { name: "fail", des: "失败" },
        { name: "warning", des: "警告" },
      ].filter((item) => {
        return item.name === variant;
      });
      //  debugger
      successtag = successtag[0].des;
      this.$bvToast.toast(title + "" + successtag, {
        title: "提示",
        variant: variant,
        solid: true,
      });
    },
    addtag() {
      let userid = cookieOption.getCookie("userdata");
      let mark = {
        bookId: this.bookid,
        bookPage: this.curPageNum,
        bookTagContent: this.filename + "的第" + this.curPageNum + "页",
        userId: userid,
      };
      saveBookMarTag(mark).then((res) => {
        console.log(res);
        this.makeToast("success", "添加书签");
      });
    },
    backTop() {
      location.href = "#top-pagination";
    },
    async getBookDetail(id) {
      let { data } = await queryBookDetail(id);
      data = data.data;
      if(!data){
          this.makeToast("fail", "查询失败");
          this.$router.push("/bookList");
          return;
      }
      this.pdfUrl = data.bookUrl;
      this.filename = data.bookname;
      console.log(this.pdfUrl);
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

      console.log("-----pageLoaded-------");
      if(e==1){
        let tempcurPageNum = this.$route.query.bookPage;
        if (tempcurPageNum) {
          this.curPageNum = tempcurPageNum;
        }
      }
      //  e;
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
.top-btn {
  position: fixed;
  right: 10px;
  bottom: 20%;
  z-index: 999;
}
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
.pagination-com {
  display: flex;
}
</style>