<template>
    <div id="foot" class="container-fluid" style="position: absolute;bottom: 1px;">
        <div id="container">
            <p class="leftfloat">Copyright 2018-2020 Zhiyigo.cn culture All Rights Reserved<a
                    href="http://beian.miit.gov.cn">蜀ICP备20002097号</a></p>
            <div class="rightfloat">

                <a href="#">首页 </a> |<a href="#">关于我</a> | <a href="#">文章列表</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
 name: 'pagefooter'
 }
</script>
<style>
 #foot {background: linear-gradient(to right, #19026d, #0ec4a2) no-repeat 0 0 / cover;height: 54px;margin-top: 35px;}

#foot #container{height: 54px;font-size: 12px;color:white;display: flex;align-items: center;}

#foot div{margin: 0 220px;}

#foot div a{color: white;margin: 0 10px;}
@media screen and (max-width: 1666px){

  #foot{ display: none;}

  .b-sidebar{
    width: 50% !important;
  }
  .head_menu{
    display: none;
  }
  .head_menu_icon{
    margin-top:19px;
  }
  .b-sidebar-body{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>