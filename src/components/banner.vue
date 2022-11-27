<template>

</template>
<script>
</script>
<style>
    #banner{position: relative;}

#banner .banner_list{width: 100%;height: 469px;position: relative;}
/* position: absolute;left: 0;top: 0; opacity:0; z-index: 1; 使所有图片都在一个位置上,并隐藏所有图片,并把图片放在底层 */
#banner .banner_list li{width: 100%;height: 100%;background: center 0 no-repeat;position: absolute;left: 0;top: 0;opacity:0;z-index: 1;}
/* 显示图片，并放在上层 */
#banner .banner_list li.active{opacity:1;z-index: 10;}
/* 宽高属性直接会继承自父节点 */
#banner .banner_list li a{display: block;width: 100%;height: 100%;}
/* banner按钮因为是固定一个位置不动因此采用绝对定位 font-size: 0px 是按钮之间的宽度*/
#banner .banner_btn{width: 100%;position: absolute;bottom: 8px;left: 6px;z-index: 20;font-size: 0px;text-align: center;
}
/* 四个按钮是并排显示因此采用的是 inline-block 每个按钮的大小就是li的大小*/
#banner .banner_btn li{display: inline-block;width: 12px;height: 12px;border: 2px solid white;
    border-radius: 50%; box-sizing: border-box;margin: 0 6px;cursor: pointer;

}

#banner .banner_btn li.active{background: red;}
</style>