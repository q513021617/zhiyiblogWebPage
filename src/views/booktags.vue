<template>
  <div class="tagpage">
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(opt)="row">
        <b-button size="sm" class="mr-2" @click="enterone(row.item)">
          进入
        </b-button>
        <b-button size="sm" class="mr-2" @click="delone(row.item)">
          删除
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { queryBookMarTagList, delBookMarTag } from "@/api/bookMark";
import { makeToast } from "@/tools/msg";
export default {
  data() {
    return {
      fields: ["id", "name", "time", "opt"],
      items: [],
      contents:[]
    };
  },
  created() {
    this.getMarkList();
  },
  methods: {
    async enterone(obj){
        console.log(obj)
       let temparr=this.contents.filter((item)=>{return item.id==obj.id})
       temparr=temparr[0]
    //    debugger
    //    this.$router.push("/bookDetail?id="+temparr.id+"&bookPage="+temparr.bookPage)
       location.href="/#/bookDetail?id="+temparr.bookId+"&bookPage="+temparr.bookPage
    },
    async delone(item) {
      await delBookMarTag(item.id);
      makeToast(this, "success", "删除书签");
      this.getMarkList();
    },
    getMarkList: async function () {
     let user=localStorage.getItem("userData")
    this.userinfo=JSON.parse(user)
      this.items = [];
      let { data } = await queryBookMarTagList(0, 20,this.userinfo.id);
      this.contents = data.data.content;
      this.contents.forEach((element) => {
        this.items.push({
          id: element.id,
          name: element.bookTagContent,
          time: element.createTime,
        });
      });

      // debugger
    },
  },
};
</script>

<style scoped>
</style>