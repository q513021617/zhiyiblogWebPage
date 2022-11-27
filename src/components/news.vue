<template>
    <div id="news" class="container">

<div class="area_title">

  <h2>最新文章</h2>
  <p>THE LATEST Articles</p>
</div>

<dl>

  <dt class="leftfloat">
    <img src="/images/address.gif" alt="一杯咖啡一刻阅读" width="220px" height="160px">
  </dt>
  <dd class="leftfloat">

    <ul class="new_list">

      <li v-for="(article, index) in articleDataList">

        <div class="new_date leftfloat">
          <i>{{ timeArr[index].day }}</i>
          <span>{{ timeArr[index].month }}</span>
          <div class="new_text leftfloat">
            <h3>
              <router-link :to="'/articleDetail?id=' + article.id">{{ article.title }}</router-link>
            </h3>
            <p>{{ article.articleContent.substring(0, 20) }}</p>
          </div>
        </div>
      </li>


    </ul>
  </dd>
</dl>
</div>
</template>
<script>
import httpmethods from '@/http'
export default {
  name: 'news',
  data() {
    return {
      timeArr: [],
      articleDataList: []}
    },
    methods:{
        getArticle: function () {
      //   http://localhost:8888/api/aricle/0/4
      var _this = this;
      httpmethods.getDataFuc({}, httpbaseUrl + "api/aricle/0/4", function (data) {
        data = data.data;
        console.log(data.content);
        var datalist = data.content;
        _this.articleDataList = datalist;
        datalist.forEach(function (tItem) {

          _this.timeToEn(tItem.postTime);
        });
        _this.$forceUpdate();
      })

    }


    }, created() {
    this.getArticle();
  }


  }
</script>
<style>
#news{min-height: 450px;overflow: hidden;position: relative;}

#news .area_title{margin-top: 65px;}
#news dl{margin-top: 48px;}
#news dt{width:234px;}

#news dd{width: 846px;}

#news .new_list{width: 100%;}

#news .new_list li{width: 50%;float: left;margin-bottom: 48px;}

#news .new_date{width: 71px;height: 70px;border-right:1px solid #dcdcdc;text-align: center;}
#news .new_date i{color: #66c5b4;font-size: 39px;display: block;font-weight: bold;}
#news .new_date span{color: #999999;font-size: 20px;line-height: 36px;}
#news .new_text{width: 270px;margin-left: 80px;margin-top: -60px;}
#news .new_text h3{font-size: 14px;}
#news .new_text h3 a{color: #3f3f3f;}
#news .new_text p{color: #A4A4A4;font-size: 12px;line-height: 21px;margin-top: 17px;}






</style>