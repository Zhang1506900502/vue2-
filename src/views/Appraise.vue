<template>
  <div class="appraise">
    <div class="appraise-content">
      <div class="appraise_header">
        <div class="header_left">
          <div class="left_score">{{ selector.score }}</div>
          <div class="left_pull">综合评分</div>
          <div class="left_price">高于周边商家{{ selector.rankRate }}%</div>
        </div>
        <div class="header_right">
          <div class="right_one">
            <span class="title"> 服务态度</span>
            <Start :size="36" :score="selector.serviceScore"></Start>
            <span class="pull">{{ selector.serviceScore }}</span>
          </div>
          <div class="right_tow">
            <span class="title"> 服务态度</span>
            <Start :size="36" :score="selector.foodScore"></Start>
            <span class="pull">{{ selector.foodScore }}</span>
          </div>
          <div class="right_three">
            <span class="title">送达时间</span>
            <span class="three_title">{{ selector.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <Judeg
        :ratings="ratings"
        :desc="desc"
        :selectType="selectType"
        :onlyContent="onlyContent"
        @filterRatings="filterRatings"
        @isContent="isContent"
      >
      </Judeg>
      <div class="appraise_nav">
        <ul>
          <li
            class="rating_item"
            :key="index"
            v-for="(ratingItem, index) in ratings"
            v-show="needShowList(ratingItem.rateType, ratingItem.text)"
          >
            <div class="avatar">
              <img :src="ratingItem.avatar" alt="" width="28" height="28" />
            </div>
            <div class="content">
              <h4 class="username">{{ ratingItem.username }}</h4>
              <div class="username_title">
                <Start :size="24" :score="ratingItem.score"></Start>
                <div class="rating_time" v-show="ratingItem.deliveryTime">
                  {{ ratingItem.deliveryTime }}分钟
                </div>
              </div>
              <div class="rating_text">{{ ratingItem.text }}</div>
              <div class="recommend_wrapper">
                <span
                  class="iconfont"
                  :class="{
                    'icon-dianzan': ratingItem.rateType === 0,
                    'icon-icon-thumb_down': ratingItem.rateType === 1
                  }"
                ></span>
                <span
                  v-for="(recommendItem, index) in ratingItem.recommend"
                  :key="index"
                  class="text"
                  v-show="ratingItem.recommend && ratingItem.recommend.length"
                  >{{ recommendItem }}</span
                >
              </div>
              <div class="time">2020-10-21 12:34</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Start from "../components/start/start";
import Split from "./film/split/split";
import Judeg from "./film/judeg/judeg";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      goods: [],
      selector: [],
      onlyContent: false,
      selectType: 2,
      ratings: [],
      desc: {
        total: "全部",
        propose: "推荐",
        wrang: "吐槽"
      }
    };
  },
  components: {
    Start,
    Split,
    Judeg
  },
  methods: {
    isContent(onlyContent) {
      // 获取子组件点击事件传递过来的数据
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    filterRatings(type) {
      // 获取子组件点击事件传递过来的数据
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShowList(type, text) {
      // 筛选需要展示的评价
      if (this.onlyContent && !text) {
        // alert(11)
        // 只要有内容的评论
        return false;
      }
      if (this.selectType === 2) {
        // 显示所有评论
        return true;
      } else {
        return this.selectType === type;
      }
    }
  },
  mounted() {
    //发送请求
    axios.get("/static/data.json").then(res => {
      this.goods = res.data.goods;
      this.selector = res.data.seller;
      this.ratings = res.data.ratings;
      console.log(this.ratings);
      this.$nextTick(() => {
        this.scroll = new BScroll(".appraise", {
          click: true
        });
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.title {
  display: inline-block;
  font-size: 12px;
  color: rgb(7, 17, 27);
  padding-right: 10px;
}
.pull {
  display: inline-block;
  font-size: 12px;
  color: rgb(255, 153, 0);
  line-height: 18px;
  padding-left: 10px;
}
.star {
  display: inline-block;
  vertical-align: middle;
}
.judeg {
  margin: 18px;
}
.icon-dianzan {
  display: inline-block;
  font-size: 12px;
  color: rgb(0, 160, 220);
  line-height: 24px;
  padding-right: 5px;
}
.icon-icon-thumb_down {
  display: inline-block;
  font-size: 12px;
  color: rgb(147, 153, 159);
  line-height: 24px;
  padding-right: 5px;
}
.appraise {
  position: absolute;
  top: 200px;
  bottom: 0;
  width: 100%;
  height: 70%;
  overflow: hidden;
}
.appraise_header {
  width: 100%;
  display: flex;
  padding: 10px 0;
  .header_left {
    flex: 0 0 137px;
    text-align: center;
    padding-top: 5px;
    .left_score {
      font-size: 24px;
      color: rgb(255, 153, 0);
      line-height: 28px;
      padding: 18px 0 6px 0;
    }
    .left_pull {
      font-size: 12px;
      color: rgb(7, 17, 27);
      line-height: 18px;
      padding-bottom: 8px;
    }
    .left_price {
      font-size: 10px;
      color: #93999f;
      line-height: 10px;
      padding-bottom: 18px;
    }
  }
  .header_right {
    flex: 1;
    margin: 18px 0;
    // padding: 0 20px;
    padding: 5px 20px;
    border-left: 1px solid #cccccc;
    .three_title {
      font-size: 12px;
      color: #93999f;
      line-height: 18px;
      padding-left: 10px;
    }
  }
}
.appraise_nav {
  margin: 0 18px;
  .rating_item {
    display: flex;
    padding: 18px 0;
    border-top: 1px solid rgb(7, 17, 27, 0.1);
    .avatar {
      flex: 0 0 28px;
      width: 28px;
      margin-right: 12px;
      img {
        border-radius: 50%;
      }
    }
    .content {
      flex: 1;
      position: relative;
      .username {
        font-size: 10px;
        color: rgb(7, 17, 27);
        line-height: 12px;
      }
      .username_title {
        transform: translateY(-5px);
        .rating_time {
          display: inline-block;
          font-size: 10px;
          font-weight: 200;
          color: (147, 153, 159);
          line-height: 12px;
          padding-left: 6px;
          transform: translateY(3px);
        }
      }
      .rating_text {
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 18px;
        width: 22em;
      }
      .recommend_wrapper {
        width: 15em;
        .text {
          border: 1px solid rgb(7, 17, 27, 0.1);
          border-radius: 2px;
          background-color: rgb(255, 255, 255);
          margin: 8px 5px 0 5px;
          padding: 0 6px;
          width: 5em;
          white-space: nowrap; //强制不换行
          overflow: hidden;
          text-overflow: ellipsis; //显示省略号
          font-size: 9px;
          color: rgb(147, 153, 159);
          line-height: 16px;
        }
      }
      .time {
        float: right;
        font-size: 10px;
        font-weight: 200;
        color: rgb(147, 153, 159);
        line-height: 12px;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>