<template>
  <b-pagination
        v-model="curpagedata"
        :total-rows="tatolpagedata"
        limit="20"
        :per-page="1"
        aria-controls="my-table"
        @change="querybypage"
      >
        <template v-slot:prev-text> <div>上一页</div></template>
        <template v-slot:next-text><div>下一页</div></template>
      </b-pagination>
</template>

<script>
export default {
  name: "pagehelper",
  data() {
    return {
      tatolpagedata: 0,
      curpagedata: 0,
    };
  },
  props: {
    tatolpage: Number,
    curpage: Number,
  },
  methods: {
  
    refreshdata: function (data) {
      this.tatolpagedata = data;
    },
    querybypage: function (num) {
      this.curpagedata = num;
      // queryAllBypage();
      this.$emit("queryAllBypagechild", this.curpagedata-1);
      console.log(num);
    },
  },
  created: function () {
    this.tatolpagedata = this.tatolpage;
  },
  mounted: function () {
    console.log("pagehelper---组件创建成功!");
  },
};
</script>

<style>
</style>