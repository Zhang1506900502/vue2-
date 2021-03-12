<template>
  <div class="cartprice">
    <transition name="fade" mode="out-in">
      <div class="cartprice-delete">
        <span
          class="iconfont icon-jianhao"
          v-show="food.count > 0"
          @click.stop.prevent="handleClickDelete()"
        >
        </span>
      </div>
    </transition>
    <div class="cartprice-content inner" v-show="food.count > 0">
      {{ food.count }}
    </div>

    <div class="cartprice-add">
      <span
        class="iconfont icon-tianjia"
        @click.stop.prevent="handleClickAdd()"
      ></span>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    handleClickAdd() {
      //!evnt._construected 原因可以去看Comodity组件实例化better-scrooll时做的注释
      if (!event._constructed) {
        return;
      }
      //   console.log("click");
      this.isShow = true;
      if (!this.food.count) {
        // Vue.set() 方法
        // 参数1： 要修改的对象
        // 参数2： 属性
        // 参数3： 属性的值是啥
        // 返回值：已经修改好的值
        Vue.set(this.food, "count", 1);
        //之所以使用set方法原因是，当我们想去修改视图的某个值却修改不了
        //因为Vue实例已经创建好，我们无法去修改视图中的值 比如我们修改一个数组其中的一个值，或者添加一条数据时，不管用。
        //vue提供方法 可以修改实例好了的数据  Vue.set
      } else {
        this.food.count++;
      }
    },
    handleClickDelete() {
      if (!event._constructed) {
        return;
      }
      if (this.food.count === 0) {
        return;
      } else {
        this.food.count--;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.icon-jianhao {
  font-size: 20px;
  color: rgb(0, 160, 220);
  line-height: 20px;
  vertical-align: middle;
}
.icon-tianjia {
  font-size: 18px;
  color: rgb(0, 160, 220);
  line-height: 20px;
  vertical-align: middle;
}
.cartprice-content {
  display: inline;
  font-size: 12px;
  color: rgb(147, 153, 159);
  line-height: 20px;
  padding: 0 12px;
}
.cartprice-delete,
.cartprice-add {
  display: inline-block;
}
.cartprice-delete {
  transition: all 0.5s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(24px, 0, 0);
}

.fade-enter-active {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.inner {
  transition: all 0.5s linear;
}
</style>