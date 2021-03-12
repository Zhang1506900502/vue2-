<template>
  <div class="star" :class="starType">
    <span
      v-for="(itemClass, index) in itemClasses"
      :class="itemClass"
      :key="index"
      class="star-item"
    ></span>
  </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  data() {
    return {};
  },
  // props: {
  //   size: {
  //     type: Number
  //   },
  //   score: {
  //     type: Number
  //   }
  // },
  // 第二种写法
  props: ["size", "score"], //通过props接收父组件传递过来的两个参数
  computed: {
    starType() {
      return "star-" + this.size; //返回动态拼接的class
    },
    itemClasses() {
      //声明常量，便于数据更改
      let result = [];
      // 这步的做法就是判断传过来的数字是不是大于4.5的,如果大于4.5就保留小数,否则就是整数
      let score = Math.floor(this.score * 2) / 2; //向下取0.5倍数的值
      let hasDecimal = score % 1 !== 0; //是否有小数（是否有半星）
      let integer = Math.floor(score);
      //遍历score 添加整星
      for (let i = 0; i < integer; i++) {
        //循环有几个全星
        result.push(CLS_ON);
      }
      //如果是有小数就放一个半星
      if (hasDecimal) {
        //是否有半星
        result.push(CLS_HALF);
      }
      //如果result的长度小于了5，那么剩下的就是灰色的星星
      while (result.length < LENGTH) {
        //补齐没有星
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>
<style  lang="scss" scoped>
.star .star-item {
  display: inline-block;
  background-repeat: no-repeat;
}
/* 尺寸为48 */
.star-48 .star-item {
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 20px 20px;
}
.star-item：last-child {
  margin-right: 0;
}
/* 全星 */
.on {
  background-image: url("./star48_on@2x.png");
}
/* 半星 */
.half {
  background-image: url("./star48_half@2x.png");
}
/* 没有星 */
.off {
  background-image: url("./star48_off@2x.png");
}

/* 尺寸为36 */
.star-36 .star-item {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  background-size: 15px 15px;
}
.star-item：last-child {
  margin-right: 0;
}
/* 全星 */
.on {
  background-image: url("star36_on@2x.png");
}
/* 半星 */
.half {
  background-image: url("star36_half@2x.png");
}
/* 没有星 */
.off {
  background-image: url("star36_off@2x.png");
}
/* 尺寸为24 */
.star-24 .star-item {
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px 10px;
}
.star-item：last-child {
  margin-right: 0;
}
/* 全星 */
.on {
  background-image: url("star24_on@2x.png");
}
/* 半星 */
.half {
  background-image: url("star24_half@2x.png");
}
/* 没有星 */
.off {
  background-image: url("star24_off@2x.png");
}
</style>