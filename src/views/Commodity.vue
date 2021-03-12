<template>
  <div class="commodity">
    <!-- 左侧 -->
    <div class="menu-wrapper">
      <ul>
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="menu-item"
          :class="{ curren: currentIndex === index }"
          @click="currentClick(index, $event)"
        >
          <!-- :class="{curren:currenIndex===index}"绑定一个class类名里面一个对象条件是当currenIndex等于当前元素index就添加类名 -->
          <span class="text">
            <span
              v-show="item.type > 0"
              class="icon"
              :class="mapClass[item.type]"
            ></span
            >{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <!-- 右侧 -->
    <div class="food-wrapper" ref="foodWrapper">
      <ul>
        <li
          class="food-item food-item-hook"
          v-for="(item, index) in goods"
          :key="index"
        >
          <h1 class="title">
            {{ item.name }}
          </h1>
          <ul>
            <li
              v-for="(food, index) in item.foods"
              :key="index"
              class="food-name"
              @click="selectFood(food, $event)"
            >
              <div class="food-icon">
                <img :src="food.icon" alt="" width="57" height="57" />
              </div>
              <div class="content">
                <p class="name">{{ food.name }}</p>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="price-money">￥{{ food.price }}</span>
                  <span class="price-now" v-show="food.oldPrice"
                    >￥{{ food.oldPrice }}</span
                  >
                </div>
                <div class="price-icon">
                  <Cartprice :food="food"></Cartprice>
                  <!-- food是上面遍历时拿到的对象 -->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 结算栏 -->
    <Shopcart
      :deliveryPrise="selector.deliveryPrice"
      :minPrice="selector.minPrice"
      :selectFoods="selectFoods"
    >
      <!-- :selectFoods="selectFoods" -->
    </Shopcart>
    <Food :food="selectedFood" ref="foodInfo"></Food>
  </div>
</template>
<script>
import axios from "axios";
// import BetterScroll from "better-scroll";
import BScroll from "better-scroll";
import Shopcart from "./film/shopcart/shopcart";
import Cartprice from "./film/cartprice/cartprice";
import Food from "./film/food/shopFood";
export default {
  data() {
    return {
      goods: [],
      isfoodWrapper: 0,
      listHeight: [],
      scrollY: 0,
      selector: [],
      selectedFood: {}
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        //判断当currentIndex在height1和height2之间的时候显示
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        //判断是否在height1和height2之间，并且最后一个区间是没有下一个区间
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      //如果说listHeight.lenght没有就返回一个0
      //computed里函数建议有返回值
      return 0;
    },
    selectFoods() {
      let foods = [];
      //遍历外层goods
      this.goods.forEach(good => {
        //遍历内层foods
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    this.mapClass = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  mounted() {
    // this.isfoodWrapper=food-wrapper.
    //发送请求
    axios.get("/static/data.json").then(res => {
      this.goods = res.data.goods;
      this.selector = res.data.seller;

      // console.log(res.data);
      // console.log(this.goods);
      // console.log(this.selector);

      this.$nextTick(() => {
        //betterscroll实例化
        this.intScroll();
        //
        this.calculateHeight();
      });
    });
  },
  methods: {
    currentClick(index, event) {
      if (!event._constructed) {
        return;
      }
      // console.log(index);
      // 使用BSscroll接口，滚动到响应位置
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        "food-item-hook"
      );
      //获取对应元素列表
      let el = foodList[index];
      // console.log(el);
      //设置滚动事件
      //scrollToElement better-scroll库内置接口
      this.foodScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.foodInfo.initShow();
    },
    intScroll() {
      this.foodScroll = new BScroll(".food-wrapper", {
        scrollbar: true,
        probeType: 3, //能实时告诉我们滚动的位置，同于探针的效果
        click: true
      });
      this.foodMenu = new BScroll(".menu-wrapper", {
        // scrollbar: true
        click: true
        //支持原生点击事件，否则better-scroll中有很多事件，会阻止原生事件
        //pc端使用不会阻止,如果pc端在实例化better-scroll时派发了click=true会出现两个点击事件
        //解决方法点击时传入点击事件对象，对象下有一个_constructed判断是否存在，不存在则直接return不执行
        //浏览器原生点击事件是没有_constructed属性
      });
      //监听滚动位置
      //利用better-scroll的监听滚动条的接口
      this.foodScroll.on("scroll", pos => {
        //scrollY接收变量
        this.scrollY = Math.abs(Math.round(pos.y)); //.abs取绝对指，.round四舍五入
      });
    },
    calculateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        "food-item-hook"
      );
      let height = 0;
      //先存入第一个区块的高度
      this.listHeight.push(height);
      //遍历这个foodlist类数组
      for (let i = 0; i < foodList.length; i++) {
        //获取每一个元素
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height - 2);
        //-2的原因是当我们点击了左侧分类，滚动条滚动到菜品时高亮提前显示，否则会出现有时点击左侧分类的高亮显示在上一个分类上
      }
      // console.log(this.listHeight);
      // 每一个foodWrapper 分类下面的所有菜品的高度
    }
  },
  components: {
    Shopcart,
    Cartprice,
    Food
  }
};
</script>
<style lang="scss" scoped>
.commodity {
  display: flex;
  position: absolute;
  top: 200px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      width: 56px;
      height: 54px;
      line-height: 14px;
      padding: 0 12px;
      &.curren {
        position: relative;
        margin-top: -1px;
        background: #ffffff;
        font-weight: 700;
        z-index: 10;
        .text {
          border: none;
        }
      }
      .text {
        display: table-cell;
        width: 54px;
        font-size: 12px;
        font-weight: 100;
        vertical-align: middle;
        border-bottom: 1px solid rgb(7, 17, 27, 0.1);
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          vertical-align: top;
          margin-right: 3px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          //定义优惠信息小图片
          &.decrease {
            background-image: url("../assets/img/decrease_3@2x.png");
          }
          &.discount {
            background-image: url("../assets/img/discount_3@2x.png");
          }
          &.guarantee {
            background-image: url("../assets/img/guarantee_3@2x.png");
          }
          &.invoice {
            background-image: url("../assets/img/invoice_3@2x.png");
          }
          &.special {
            background-image: url("../assets/img/special_3@2x.png");
          }
        }
      }
    }
  }
  .food-wrapper {
    flex: 1;
    .food-item {
      .title {
        font-size: 12px;
        color: rgb(147, 153, 159);
        line-height: 26px;
        font-weight: 400;
        padding-left: 14px;
        border-left: 2px solid #d9dde1;
        background-color: #f3f5f7;
        height: 26px;
      }
      .food-name {
        position: relative;
        // padding: 30px 0 0 25px;
        margin: 18px;
        display: flex;
        border-bottom: 1px solid rgb(7, 17, 27, 0.1);
        padding-bottom: 18px;

        &.food-name:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .food-icon {
          float: left;
        }
        .content {
          float: left;
          margin-left: 10px;
          .name {
            font-size: 14px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            padding-top: 2px;
          }
          .desc {
            font-size: 10px;
            color: rgb(147, 153, 159);
            padding: 4px 0;
            white-space: nowrap; //不换行
            width: 15em;
            text-overflow: ellipsis; //多余部分省略号显示
            overflow: hidden;
            // height: 15px;
          }
          .extra {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            .count {
              padding-right: 5px;
            }
          }
          .price {
            .price-money {
              font-size: 14px;
              color: red;
              font-weight: 700;
              line-height: 24px;
            }
            .price-now {
              font-size: 10px;
              color: rgb(147, 153, 159);
              font-weight: 700;
              line-height: 24px;
              text-decoration: line-through;
            }
          }
          .price-icon {
            position: absolute;
            right: 0;
            bottom: 15px;
          }
        }
      }
    }
  }
}
</style>