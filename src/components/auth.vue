<template>
  <div>
      <main class="reader">
    <h1> zhiyigo授权 </h1>
    <hr />
    <img src="../assets/logo.png" alt="" srcset="">
    <button class="sweep" @click="scanLogin()">确认授权</button>
    <button  @click="cancel()">取消授权</button>
  </main>
  </div>
</template>

<script>
export default {
    props:{
        url:String
    },
    methods:{
        cancel(){
            this.$router.back()
        },async scanLogin(){
            let url=this.url;
            let token=localStorage.getItem("token")

            let {data}=await loginBytoken(url,token);
            // alert("识别成功！")
        }
    }
}
</script>

<style lang="less">
.reader {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .sweep {
    position: relative;
    margin: 20px;
    padding: 12px;
    width: 300px;
    font-size: 18px;
    cursor: pointer;
    color: white;
    background: #42b983;
    border: 1px solid #42b983;
    overflow: hidden;
    input {
      position: absolute;
      font-size: 100px;
      opacity: 0;
    }
  }
  }
</style>