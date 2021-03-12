<template>
  <div class="foodinfo" v-show="showFlag" ref="foodInfo">
    <div class="food_content">
      <div>
        <img :src="food.image" alt="" class="content_img" />
        <div class="content_title">
          <h1 class="title_name">{{ food.name }}</h1>
          <div class="title_poll">
            <span class="poll_one">月售{{ food.sellCount }}份</span>
            <span>好评率{{ food.rating }}%</span>
          </div>
          <div class="title_meony">
            <span class="meony_pull">￥{{ food.price }}</span>
            <span v-show="food.oldPrice" class="pull"
              >￥{{ food.oldPrice }}</span
            >
          </div>
          <div class="title_wapper">
            <Cartprice :food="food"></Cartprice>
          </div>
          <div
            class="title_add"
            @click="handleAdd($event)"
            v-show="!food.count || food.count === 0"
            @isContent="isContent"
          >
            加入购物车
          </div>
        </div>
        <Split></Split>
        <div class="content_commodity" v-show="food.info">
          <h1 class="commodity_header">商品介绍</h1>
          <div class="commodity_nav">{{ food.info }}</div>
        </div>
      </div>
      <Split></Split>
      <div class="evalution">
        <h1 class="evalution_total">商品评价</h1>
        <Judeg
          :ratings="food.ratings"
          :desc="desc"
          :selectType="selectType"
          :onlyContent="onlyContent"
          @filterRatings="filterRatings"
          @isContent="isContent"
        >
        </Judeg>
        <div class="evalution_title">
          <ul v-show="food.ratings && food.ratings.length">
            <li
              v-for="(ratingItem, index) in food.ratings"
              :key="index"
              class="ratings_title"
              v-show="needShowList(ratingItem.rateType, ratingItem.text)"
            >
              <h1 class="rating_time">2020-10-21 12:34</h1>
              <div class="user">
                <span class="user_title">{{ ratingItem.username }}</span>
                <img :src="ratingItem.avatar" alt="" class="user_img" />
              </div>
              <span class="uname">
                <i
                  class="iconfont icon-dianzan"
                  v-show="ratingItem.rateType === 0"
                ></i>
                <i
                  class="iconfont icon-icon-thumb_down"
                  v-show="ratingItem.rateType === 1"
                ></i>
                <p class="name">{{ ratingItem.text }}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="iconfont icon-left" @click="handleInfo"></div>
  </div>
</template>
<script>
import Vue from "vue";
import Cartprice from "../cartprice/cartprice";
import Split from "../split/split";
import BScroll from "better-scroll";
import Judeg from "../judeg/judeg";
// const ALL = 2;
export default {
  props: {
    food: {
      type: Object
    },
    ratings: []
  },
  data() {
    return {
      showFlag: false,
      selectType: 2,
      onlyContent: false,
      desc: {
        total: "全部",
        propose: "推荐",
        wrang: "吐槽"
      }
    };
  },
  methods: {
    initShow() {
      this.showFlag = true;
      //初始化状态
      this.selectType = 2;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodInfo, {
            click: true
          });
        } else {
          this.scroll.refresh(); //页面重新刷新
        }
      });
    },
    filterRatings(type) {
      //获取子组件传递来的数据
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShowList(type, text) {
      if (this.onlyContent && !text) {
        //判断有无内容 只要有内容的评论
        return false;
      }
      if (this.selectType === 2) {
        //显示所有评论
        return true;
      } else {
        return this.selectType === type;
      }
    },
    handleInfo() {
      this.showFlag = false;
    },
    handleAdd() {
      //添加购物车
      if (!event._constructed) {
        // 阻止pc端点击后执行两次
        return;
      }
      Vue.set(this.food, "count", 1);
    },
    isContent(onlyContent) {
      // 获取子组件点击事件传递过来的数据
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  components: {
    Cartprice,
    Split,
    Judeg
  }
};
</script>
<style lang="scss" scoped>
.foodinfo_title {
  padding-bottom: 46px;
  //滚动盒子距离底部要有距离，结算栏会遮住一部分内容滚动无法停留
}
.evalution_total {
  padding-left: 18px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(7, 17, 27);
  line-height: 14px;
  padding-bottom: 6px;
  padding-top: 18px;
}
.foodinfo {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  width: 100%;
  height: 100%;
  z-index: 30;
  background: #ffffff;
}
.food_content {
  padding-bottom: 46px;
  .content_img {
    width: 100%;
    height: 100%;
  }
  .content_title {
    position: relative;
    padding: 15px 17px;
    // width: 100%;
    .title_name {
      font-size: 16px;
      font-weight: 700;
      line-height: 14px;
      color: rgb(7, 17, 27);
      padding-bottom: 5px;
    }
    .title_poll {
      font-size: 10px;
      color: rgb(147, 153, 159);
      line-height: 20px;
      padding-bottom: 10px;
      .poll_one {
        padding-right: 12px;
      }
    }
    .title_meony {
      padding-bottom: 18px;
      .meony_pull {
        font-size: 18px;
        font-weight: 700;
        color: rgb(240, 20, 20);
        line-height: 24px;
        padding-right: 12px;
      }
      .pull {
        font-size: 10px;
        font-weight: 700;
        color: rgb(147, 153, 159);
        line-height: 24px;
        text-decoration: line-through; //删除线
      }
    }
    .title_wapper {
      position: absolute;
      right: 18px;
      bottom: 35px;
      z-index: 11;
    }
    .title_add {
      position: absolute;
      right: 18px;
      bottom: 35px;
      width: 74px;
      height: 24px;
      border-radius: 12px;
      z-index: 12;
      background-color: rgb(0, 160, 220);
      font-size: 10px;
      color: rgb(255, 255, 255);
      line-height: 24px;
      text-align: center;
    }
  }
  .content_commodity {
    padding: 18px;
    .commodity_header {
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 14px;
      padding-bottom: 6px;
    }
    .commodity_nav {
      font-size: 12px;
      font-weight: 200;
      color: rgb(77, 85, 93);
      line-height: 24px;
      padding-left: 8px;
    }
  }
}
.evalution_title {
  .ratings_title {
    padding: 0 18px;
    position: relative;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 12px;
    .rating_time {
      font-size: 10px;
      color: rgb(147, 153, 159);
      line-height: 12px;
      padding: 16px 0 6px 0;
    }
    .user {
      position: absolute;
      top: 12px;
      right: 15px;
      .user_title {
        display: inline-block;
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 12px;
        padding-right: 6px;
      }
      .user_img {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .uname {
      padding-bottom: 16px;
      .icon-dianzan {
        display: inline-block;
        font-size: 12px;
        color: rgb(0, 160, 220);
        line-height: 24px;
        padding-right: 4px;
      }
      .icon-icon-thumb_down {
        display: inline-block;
        font-size: 12px;
        color: rgb(147, 153, 159);
        line-height: 24px;
        padding-right: 4px;
      }
      .name {
        display: inline-block;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 16px;
      }
    }
  }
}
.icon-left {
  font-size: 18px;
  position: absolute;
  top: 10px;
  left: 5px;
  color: #fff;
}
</style>