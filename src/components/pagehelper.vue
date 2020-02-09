<template>
   <div class="card-footer clearfix">

                    <ul class="pagination pagination-sm m-0 float-right">
                      <li class="page-item"><a class="page-link" href="#" @click="prepage">«</a></li>
                   
                      <li class="page-item" v-if="tatolpagedata<=5 " v-for="index in tatolpagedata"  v-bind:Key="index" :class=" (index-1 == curpagedata) ?'active':''"><a class="page-link"  href="#" @click="querybypage(index-1)" >{{index}}</a></li>
                 
                      
               
                      <li class="page-item"  v-if=" index <= 2 && tatolpagedata>5 " v-for="index in tatolpagedata"   v-bind:Key="index"  :class=" (index-1 == curpagedata) ?'active':''" > <a class="page-link" href="#" @click="querybypage(index-1)" >{{index}}</a></li>


           
                    <li class="page-item" v-if=" (index> 2 && index < tatolpagedata - 1) && tatolpage > 5 "v-for="index in tatolpagedata"  v-bind:Key="index"  :class="(index-1 == curpagedata) ?'active':''" ><a  href="#" :class="index==curpagedata?'page-link':''" @click="querybypage(index-1)">{{index==curpagedata?index:'.'}}</a></li>
                      
             
                     
                 
                    <li class="page-item"  v-if="index >= tatolpagedata -1  && tatolpagedata > 5 " v-for="index in tatolpagedata"   v-bind:Key="index"  :class=" (index-1 == curpagedata) ?'active':''"  ><a class="page-link" href="#" @click="querybypage(index-1)" >{{index}}</a></li>
       
                    
                    
                      <li class="page-item"><a class="page-link" href="#" @click="nextpage">»</a></li>
                    </ul>

                  </div>
</template>

<script>
       export default {
        
        name:"pagehelper",
         data(){
            return {
                tatolpagedata:0,
                curpagedata:0
                }},
        props:{
            
                tatolpage:Number,
                curpage:Number,
        }
        ,methods:{
        prepage:function () {

          if(this.curpagedata <= 0){

            return;
          }
        //   this.curpagedata = this.curpagedata-1;

        this.querybypage(this.curpagedata-1)
           
      },nextpage:function () {

            if(this.curpagedata >= this.tatolpagedata-1 ){
                this.curpagedata = this.tatolpagedata-1;
                return;
            }

            this.querybypage(this.curpagedata+1)
          
      },
      refreshdata:function (data) {
          this.tatolpagedata=data;
        
      },
      querybypage:function (num) {
        this.curpagedata=num;
        // queryAllBypage();
        this.$emit('queryAllBypagechild',this.curpagedata);
        console.log(num);
      },
        },created:function(){
              
          this.tatolpagedata=this.tatolpage;
          this.curpagedata=this.curpage-1;
        },mounted:function () {
          
            console.log("pagehelper---组件创建成功!");
        }
}
</script>

<style>
</style>