<template>
  <div class="merchant">
    <div class="merchant_wrapper">
      <div class="wrapper_header">
        <h1 class="header_name">{{ seller.name }}</h1>
        <div class="header_asses">
          <div class="asses_img">
            <Start :size="36" :score="seller.score"></Start>
          </div>
          <div class="asses_grren">
            <span class="asses_count">({{ seller.ratingCount }})</span>
            <span class="asses_sellcount">月售{{ seller.sellCount }}单</span>
          </div>
        </div>
        <div class="header_icon" @click="handlePull">
          <i
            class="iconfont icon-aixin1"
            ref="icon"
            :class="{ icon: iconShow }"
          ></i>
          <span class="pull">{{ pullTitle }}</span>
        </div>
      </div>
      <div class="header_title">
        <span class="title_price">
          <div class="price_topic">起送价</div>
          <div class="price_min">
            {{ seller.minPrice }}
            <i class="price_time">元</i>
          </div>
        </span>
        <span class="title_price">
          <div class="price_topic">商家配送</div>
          <div class="price_min">
            {{ seller.deliveryPrice }}
            <i class="price_time">元</i>
          </div>
        </span>
        <span class="title_price">
          <div class="price_topic">平均配送时间</div>
          <div class="price_min">
            {{ seller.deliveryTime }}
            <i class="price_time">分钟</i>
          </div>
        </span>
      </div>
      <Split></Split>
      <div class="notice">
        <div class="notice_title">
          <h1 class="notice_title_action">公告与活动</h1>
          <p class="notice_title_text">{{ seller.bulletin }}</p>
        </div>
        <!-- 优惠信息内容 -->
        <div class="notice_supprotse">
          <ul class="supprotse">
            <li
              v-for="(item, index) in seller.supports"
              :key="index"
              class="supprot-item"
            >
              <span
                class="supprot-icon"
                :class="mapClass[seller.supports[index].type]"
              ></span>
              <span class="supprot-text">{{ item.description }}</span>
            </li>
          </ul>
        </div>
      </div>
      <Split></Split>
      <div class="notice_shijing">
        <h1 class="shijing_title">商家实景</h1>
        <div class="propull" ref="propull">
          <ul class="shijing_dewite" ref="dewite">
            <li
              v-for="(sellerItem, index) in seller.pics"
              :key="index"
              class="shijing_nav"
            >
              <img :src="sellerItem" alt="" class="shijing_img" />
            </li>
          </ul>
        </div>
      </div>
      <Split></Split>
      <div class="infos_title">
        <h4 class="inofs_name">商家信息</h4>
        <ul>
          <li
            v-for="(infosItem, index) in seller.infos"
            :key="index"
            class="infos_nav"
          >
            {{ infosItem }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import BScroll from "better-scroll";
import Start from "../components/start/start";
import Split from "./film/split/split";
export default {
  data() {
    return {
      seller: [],
      iconShow: false
    };
  },
  computed: {
    pullTitle() {
      if (this.iconShow) {
        return "已收藏";
      } else {
        return "收藏";
      }
    }
  },
  created() {
    this.mapClass = ["decrease", "discount", "guarantee", "invoice", "special"];
  },
  mounted() {
    axios.get("/static/data.json").then(res => {
      console.log(res.data);
      this.seller = res.data.seller;
      this.$nextTick(() => {
        this._initScroll();
        this._initShijin();
      });
    });
  },
  methods: {
    _initScroll() {
      this.$nextTick(() => {
        if (!this.myscroll) {
          this.myscroll = new BScroll(".merchant", {
            click: true
          });
        } else {
          this.myscroll.refresh();
        }
      });
    },
    _initShijin() {
      if (this.seller.pics) {
        let picW = 120; //图片的宽度
        let margin = 6;
        let w = (picW + margin) * this.seller.pics.length - margin;
        this.$refs.dewite.style.width = w + "px";
        this.$nextTick(() => {
          if (!this.shijing) {
            this.shijing = new BScroll(this.$refs.propull, {
              scrollX: true,
              scrollY: false
              // eventPassthrough: "vertical" //忽略竖直方向的滚动
            });
          } else {
            this.seller.pics.refresh(); //重新刷新页面
          }
        });
      }
    },
    handlePull() {
      this.iconShow = !this.iconShow;
    }
  },
  components: {
    Start,
    Split
  }
};
</script>
<style lang="scss" scoped>
i {
  font-style: normal;
}

.merchant {
  position: absolute;
  top: 200px;
  bottom: 0;
  width: 100%;
  // height: 70%;
  overflow: hidden;
}
.wrapper_header {
  margin: 0 18px;
  position: relative;
  border-bottom: 1px solid rgb(7, 17, 27, 0.1);
  .header_name {
    font-size: 16px;
    color: rgb(7, 17, 27);
    line-height: 14px;
    padding-top: 18px;
    margin-bottom: 5px;
  }
  .header_asses {
    margin-bottom: 18px;
    .asses_img {
      display: inline-block;
      transform: translateY(3px);
    }
    .asses_grren {
      display: inline-block;
      font-size: 10px;
      color: rgb(77, 85, 93);
      line-height: 18px;
      .asses_count {
        padding: 0 12px 0 8px;
      }
    }
  }
  .header_icon {
    position: absolute;
    top: 18px;
    right: 18px;
    text-align: center;
    .icon-aixin1 {
      display: block;
      font-size: 24px;
      color: rgb(77, 85, 93);
      line-height: 24px;
    }
    .pull {
      display: block;
      font-size: 10px;
      color: rgb(77, 85, 93);
    }
    .icon {
      color: rgb(240, 20, 20);
    }
  }
}
.header_title {
  display: flex;
  width: 100%;
  font-size: 0;
  padding: 18px 0;
  // margin: 0 18px;
  .title_price {
    flex: 1;
    text-align: center;
    border-right: 1px solid rgb(7, 17, 27, 0.1);
    &.title_price:last-child {
      border: 0;
    }
    .price_topic {
      font-size: 10px;
      color: rgb(147, 153, 159);
      line-height: 10px;
      padding: 18px 0 6px 0;
    }
    .price_min {
      font-size: 22px;
      font-weight: 200;
      color: rgb(7, 17, 27);
      line-height: 24px;
      transform: translateX(2px);
      padding-bottom: 4px;
      .price_time {
        font-size: 10px;
        display: inline-block;
        transform: translateX(-5px);
      }
    }
  }
}
.notice {
  margin: 0 18px;
  .notice_title {
    padding: 18px 0;
    .notice_title_action {
      font-size: 12px;
      padding-bottom: 8px;
      font-weight: 400;
    }
    .notice_title_text {
      font-size: 12px;
      font-weight: 200;
      color: rgb(240, 20, 20);
      line-height: 24px;
      padding: 0 12px;
    }
  }
}
//优惠内容

.supprotse {
  text-align: left;
  .supprot-item {
    font-size: 0;
    padding: 16px 12px;
    border-top: 1px solid rgb(7, 17, 27, 0.1);
    &:last-child {
      margin-bottom: 0;
    }
    .supprot-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: top;
      margin-right: 6px;
      background-size: 16px 16px;
      background-repeat: no-repeat;
      //定义优惠信息小图片
      &.decrease {
        background-image: url("../assets/img/decrease_1@2x.png");
      }
      &.discount {
        background-image: url("../assets/img/discount_1@2x.png");
      }
      &.special {
        background-image: url("../assets/img/guarantee_1@2x.png");
      }
      &.invoice {
        background-image: url("../assets/img/invoice_1@2x.png");
      }
      &.guarantee {
        background-image: url("../assets/img/special_1@2x.png");
      }
    }
    .supprot-text {
      font-size: 12px;
      line-height: 16px;
      font-weight: 200;
      color: rgb(7, 17, 27);
    }
  }
}
.notice_shijing {
  // width: 100%;
  // padding-top: 18px;
  // padding-left: 16px;
  // padding-bottom: 18px;
  padding: 18px 16px;
  .shijing_title {
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 12px;
  }
  .propull {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    // margin: 0 12px;
    .shijing_nav {
      display: inline-block;
      width: 120px;
      height: 90px;
      margin-right: 6px;
      &.shijing_nav:last-child {
        margin: 0;
      }
      .shijing_img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .shijing_dewite {
    font-size: 0;
  }
}
.infos_title {
  margin: 0 18px;
  .infos_nav {
    font-size: 12px;
    font-weight: 200;
    color: rgb(7, 17, 27);
    line-height: 16px;
    padding: 16px 12px;
    border-top: 1px solid rgb(7, 17, 27, 0.1);
  }
  .inofs_name {
    font-size: 14px;
    font-weight: 500;
    padding: 12px 0;
  }
}
</style>