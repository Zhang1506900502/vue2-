<template>
  <div class="shopcart">
    <div class="content" @click="handleClickList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ highlight: totalCount > 0 }">
            <span
              class="iconfont icon-ai66"
              :class="{ highlight: totalCount > 0 }"
            ></span>
          </div>
          <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="content-price" :class="{ highlight: totalPrice > 0 }">
          ￥{{ totalPrice }}
        </div>
        <div class="content-desc">另需配送费￥{{ deliveryPrise }}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="paydescClick">
        <div class="right-pay" :class="payClass">
          {{ payDesc }}
        </div>
      </div>
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="header-title">购物车</h1>
          <span class="header-delete" @click="listDelete">清空</span>
        </div>
        <div class="list-content" ref="contentList">
          <ul>
            <li
              class="list-food"
              v-for="(food, index) in selectFoods"
              :key="index"
            >
              <h1 class="food-title">{{ food.name }}</h1>
              <span class="food-price">￥{{ food.price * food.count }}</span>
              <div class="food-btn">
                <Carprice :food="food"></Carprice>
              </div>
            </li>
          </ul>
        </div>
        <!-- <div class="shopcart-blur"></div> -->
      </div>
    </transition>
    <div class="mack" v-show="listShow" @click.stop.prevent="handlelist"></div>
    <!-- @click.stop 阻止事件冒泡
    @click.prevent 阻止事件的默认行为 -->
  </div>
</template>
<script>
import Carprice from "../cartprice/cartprice";
import BScroll from "better-scroll";
import "animate.css";
// import BetterScroll from "better-scroll";
export default {
  props: {
    deliveryPrise: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default() {
        //当我们接受的是一个数组或者对象，vue建议default是一个函数
        return [];
      }
    }
  },
  data() {
    return {
      fold: false //购物车开始是折叠状态
    };
  },
  watch: {
    //所谓 侦听器(watch)，就是 当数据发生变化时，及时做出响应处理。
    //注意：当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的！
    // contentList() {
    // }
  },
  computed: {
    totalPrice() {
      let total = 0;
      //遍历所传来的数组商品
      this.selectFoods.forEach(food => {
        //拿到每一个商品累加价格
        total += food.price * food.count;
      });
      return total; //计算属性必须有返回值
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      //判断结算框样式变化
      if (this.minPrice === 0) {
        return `￥${this.minPrice}`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      //判断结算框class样式的绑定
      if (this.totalPrice < this.minPrice) {
        return "pay-enough";
      } else {
        return "enough";
      }
    },
    listShow: {
      //计算属性是依赖缓存改变而改变的 fold的判断返回了一个false 直接中断了
      get: function() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.contentList, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
        return this.fold;
      },
      set: function() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;

        return show;
      }
    }
  },
  methods: {
    //购物车状态点击取反
    handleClickList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    //清空按钮
    listDelete() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
      this.fold = false;
    },
    //结算按钮
    paydescClick() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      alert(`支付${this.totalPrice}元`);
    },
    //点击阴影部分折叠
    handlelist() {
      this.fold = false;
    }
  },
  components: {
    Carprice
  }
};
</script>
<style lang="scss" scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 50;
  height: 46px;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 18px;
        padding: 6px 6px 8px 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top; //顶部对齐
        border-radius: 50%;
        background: #141d27;
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 400;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 0.4);
        }
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #2b343c;
          text-align: center;
          &.highlight {
            background: rgb(0, 160, 220);
          }
          .iconfont {
            // display: block;
            font-size: 24px;
            line-height: 42px;
            color: #80858a;
            &.highlight {
              color: #ffffff;
            }
          }
        }
      }
      .content-price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        padding-right: 12px;
        border-right: 1px solid rgb(255, 255, 255, 0.1);
        color: rgb(255, 255, 255, 0.4);
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        &.highlight {
          color: #ffffff;
        }
      }
      .content-desc {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        // font-weight: 700;
        line-height: 24px;
        color: rgb(255, 255, 255, 0.4);
        margin-top: 11px;
        padding-left: 12px;
      }
    }
    .content-right {
      flex: 0 0 105px; // 放大属性 缩小属性 项目长度
      width: 105px;
      .right-pay {
        // vertical-align: top;

        font-size: 12px;
        color: rgb(255, 255, 255, 0.4);
        height: 48px;
        line-height: 48px;
        font-weight: 500;
        text-align: center;
        &.pay-enough {
          background-color: #2b333b;
        }
        &.enough {
          background-color: #00b43c;
          color: #ffffff;
        }
      }
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 2px solid rgba(7, 17, 27, 0.1);
      .header-title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .header-delete {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 230px;
      background: #fff;
      overflow: hidden;
      margin-bottom: 46px;
      .list-food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .food-title {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .food-price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .food-btn {
          position: absolute;
          right: 0;
          bottom: 13px;
        }
      }
    }
  }
  .mack {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgb(7, 17, 27, 0.6);
    z-index: -2;
  }
}
</style>