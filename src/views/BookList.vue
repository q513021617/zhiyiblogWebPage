<template>
  <div class="container">
      <b-card-group columns>
    <b-card
      :title="item.bookname"
      :img-src="item.imgurl"
      img-alt="Image"
      img-top
      v-for="item,index in bookList"
      :key="index"
      @click="gotobook(item.id)"
    >
      <b-card-text>
        {{item.bookdes}}
      </b-card-text>
    </b-card>

   
  </b-card-group>
  </div>
</template>

<script>
import { queryBookDetail, queryBookList, saveBook, delBook } from "@/api/book";
export default {
    data() {
    return {
        pagesize:12,
        bookList:[         
            ]
        }
    },
    methods:{
        getBookList(page){
            queryBookList(page,this.pagesize).then((res)=>{
                let tempdata=res.data.data.content;
                let self=this;
                tempdata.forEach(element => {
                    self.bookList.push(element)
                });
                
                console.log(this.bookList)
                this.$forceUpdate();
                debugger
            })
        },
        gotobook(id){
            window.open("/#/bookDetail?id="+id)
        }


    },mounted(){
        this.getBookList(0)
    }


}
</script>

<style>

</style>