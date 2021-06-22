<template>
  <div class="bookcontainer">
      <div class="bookcontainer-content">
      <b-card-group columns>
    <b-card
      :title="item.bookname"
      :img-src="item.imgurl"
      img-alt="Image"
    
     
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
  </div>
</template>

<script>
import { queryBookDetail, queryBookList, saveBook, delBook } from "@/api/book";
export default {
    data() {
    return {
        pagesize:999,
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
.bookcontainer{
   
    display: flex;
    justify-content: center;
}
.bookcontainer-content{
 width: 90%;
}
.card-columns{
    column-count: 5 !important;
}
</style>