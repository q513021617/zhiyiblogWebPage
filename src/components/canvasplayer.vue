<template>
   <div class="contaner-fluid" style="height:399px;">
      <canvas id="canv" class="p5Canvas" width="100%" height="100%" style="width: 100%; height: 100%;"></canvas>
    </div>
</template>
<script>
import bannermethods from '@/cavastool/bannerscript.js'

function TimeObj() {
  this.month = "";
  this.day = "";
}
export default {
  name: 'canvasplayer',
  methods: {

    timeToEn: function (time) {
      var en_mon_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
      let timeobj = new TimeObj();
      timeobj.month = time.substring(5, 7);
      let monthindex = parseInt(timeobj.month);
      timeobj.month = en_mon_arr[monthindex];
      timeobj.day = time.substring(8, 10);


      console.log(timeobj.month + " " + timeobj.day);
      this.timeArr.push(timeobj);
    }

  },mounted() {
    //   console.log("----mounted----");
    bannermethods.start();
  }




}
</script>
<style>
</style>