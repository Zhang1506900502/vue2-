<template>
  <div>
    <!-- 头部商家图 -->
    <div class="content-wrapper">
      <!-- :style="{
        background: 'url(' + this.$store.state.datalist.avatar + ')'
      }"  -->
      <!-- 商家图 -->
      <div>
        <div class="avatar">
          <img
            :src="$store.state.datalist.avatar"
            alt=""
            height="64"
            width="64"
            class="avatar_img"
          />
          <div class="title">
            <span>
              <img :src="imgUrl" alt="" class=" title_img" />
              <h4>{{ $store.state.datalist.name }}</h4>
            </span>
            <span class="title_description"
              >{{ $store.state.datalist.description }}/{{
                $store.state.datalist.deliveryTime
              }}分钟送达</span
            >
            <span class="title-size" v-if="$store.state.datalist.supports">
              <img :src="imgUrl2" alt="" class="title_img2" />

              {{ $store.state.datalist.supports[0].description }}
            </span>
          </div>
        </div>
        <!-- 头部详情按钮 -->
        <div
          class="header-supports"
          v-if="$store.state.datalist.supports"
          @click="handleClickdetail()"
        >
          {{ $store.state.datalist.supports.length }}个<span>></span>
        </div>
        <!-- 详情页 -->
        <transition
          enter-active-class="animate__animated animate__zoomIn animate__fast"
          leave-active-class="animate__animated animate__zoomOut"
        >
          <!-- animate__animated animate__zoomIn -->
          <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
              <div class="detail-main">
                <h1 class="name">{{ $store.state.datalist.name }}</h1>
                <div class="star-wrapper">
                  <Star :size="48" :score="$store.state.datalist.score"></Star>
                </div>
                <!-- 优惠信息 -->
                <div class="title_name">
                  <div class="title_line"></div>
                  <div class="title_text">优惠信息</div>
                  <div class="title_line"></div>
                </div>
                <!-- 优惠信息内容 -->
                <ul class="supprotse">
                  <li
                    v-for="(item, index) in $store.state.datalist.supports"
                    :key="index"
                    class="supprot-item"
                  >
                    <span
                      class="supprot-icon"
                      :class="
                        mapClass[$store.state.datalist.supports[index].type]
                      "
                    ></span>
                    <span class="supprot-text">{{ item.description }}</span>
                  </li>
                </ul>
                <!-- 商家公告 -->
                <div class="title_name">
                  <div class="title_line"></div>
                  <div class="title_text">商家公告</div>
                  <div class="title_line"></div>
                </div>
                <div class="bulletin">
                  <p class="content">{{ $store.state.datalist.bulletin }}</p>
                </div>
              </div>
            </div>
            <div class="detail-close" @click="handleClickHidden()">
              <i class="iconfont icon-X"></i>
            </div>
          </div>
        </transition>
      </div>
      <!-- 公告 -->
      <div class="bulletin-wrapper" @click="handleClickdetail()">
        <img :src="imgUrl3" alt="" />
        <p class="text-overflow">{{ $store.state.datalist.bulletin }}</p>
        <!-- <img :src="imgUrl4" alt="" class="icont" /> -->
        <div class="icon">></div>
      </div>
      <!-- 背景图 -->
      <div class="background">
        <img
          :src="$store.state.datalist.avatar"
          alt=""
          width="100%"
          height="100%"
        />
      </div>
    </div>
    <!-- 头部导航 -->
    <ul class="header-nav">
      <router-link
        to="/Commodity"
        tag="li"
        active-class="active"
        class="header-nav-item"
        >商品</router-link
      >
      <router-link
        to="/Appraise"
        tag="li"
        active-class="active"
        class="header-nav-item"
        >评价</router-link
      >
      <router-link
        to="Merchant"
        tag="li"
        active-class="active"
        class="header-nav-item"
        >商家</router-link
      >
    </ul>
  </div>
</template>
<script>
// import Star from "./start/start";
import Star from "../start/start";
import "animate.css";

export default {
  data() {
    return {
      imgUrl: require("../../assets/img/brand@2x.png"), //品牌
      imgUrl2: require("../../assets/img/decrease_1@2x.png"), //减
      imgUrl3: require("../../assets/img/bulletin@2x.png"), //公告
      imgUrl4: require("../../assets/next.png"), //字体图标png格式
      mapClass: [],
      detailShow: false
    };
  },
  methods: {
    //点击显示公告详情
    handleClickdetail() {
      this.detailShow = true;
    },
    //点击隐藏公告详情
    handleClickHidden() {
      this.detailShow = false;
    }
  },
  mounted() {
    if (this.$store.state.comingsoonlist.length === 0) {
      //数据请求，存储store
      //ajax
      this.$store.dispatch("GetComingSoonAction", "传去参数");
    } else {
      console.log("使用缓存数据", this.$store.state.datalist.avatar);
    }
  },
  created() {
    this.mapClass = ["decrease", "discount", "guarantee", "invoice", "special"];
  },
  components: {
    Star
  }
};
</script>
<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  height: 150px;
  background-size: cover;
  position: relative;
  color: #ffffff;
  background: rgb(7, 17, 27, 0.5);
  overflow: hidden;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}
.avatar {
  padding: 30px 0 0 25px;
  height: 65px;

  .avatar_img {
    border-radius: 5px;
    float: left;
  }
  .title {
    // height: 64px;
    float: left;
    position: relative;
    width: 180px;
    margin-left: 20px;
    .title_img {
      width: 30px;
      height: 20px;
      position: absolute;
      top: 0;
      left: 0;
    }
    h4 {
      left: 40px;
      margin: 0;
      padding-left: 5px;
      position: absolute;
      top: 0;
      left: 30px;
    }
    .title_description {
      font-size: 13px;
      position: absolute;
      top: 25px;
      left: 0;
    }
    .title-size {
      position: absolute;
      left: 0;
      top: 48px;
      font-size: 12px;
      .title_img2 {
        width: 15px;
        height: 15px;
        transform: translateY(2px);
      }
    }
  }
}
.bulletin-wrapper {
  position: absolute;
  bottom: 0;
  left: 0px;
  height: 30px;
  width: 100%;
  line-height: 30px;
  background-color: rgba(7, 17, 27, 0.2);
  img {
    display: inline-block;
    width: 25px;
    height: 15px;
    padding-bottom: 7px;
    padding-left: 10px;
  }
  .text-overflow {
    display: inline-block;
    width: 22em;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 5px;
    font-size: 13px;
  }
  .icon {
    // width: 25px;
    // height: 25px;
    color: #ffffff;
    float: right;
    padding-right: 15px;
  }
}
.header-supports {
  width: 50px;
  height: 28px;
  position: absolute;
  right: 15px;
  bottom: 50px;
  border-radius: 13px;
  background-color: rgba(7, 17, 27, 0.2);
  font-size: 12px;
  line-height: 28px;
  text-align: center;
  span {
    padding-left: 5px;
  }
}
.detail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgb(7, 17, 27, 0.8);
  .detail-wrapper {
    min-height: 100%;
    width: 100%;
    text-align: center;
    .detail-main {
      margin-top: 64px;
      padding-bottom: 64px;
      .name {
        line-height: 16px;
        font-size: 16px;
        font-weight: 700;
      }
      .star-wrapper {
        margin-top: 18px;
        padding: 2px 0;
      }
      //优惠信息大标题
      .title_name {
        display: flex;
        width: 80%;
        margin: 30px auto 24px auto;
        .title_line {
          flex: 1;
          //也可以使用定位
          // position: relative;
          // top: -6px;
          //也可以使用转换Y轴
          transform: translateY(-6px);
          border-bottom: 1px solid rgb(255, 255, 255, 0.2);
        }
        .title_text {
          padding: 0 12px;
          font-size: 14px;
          font-weight: 700;
        }
      }
      //优惠信息内容
      .supprotse {
        width: 80%;
        margin: 0 auto;
        text-align: left;
        .supprot-item {
          padding: 0 12px;
          margin-bottom: 12px;
          font-size: 0;
          // float: left;
          &:last-child {
            margin-bottom: 0;
          }
          .supprot-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-top: -2px;
            margin-right: 7px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            //定义优惠信息小图片
            &.decrease {
              background-image: url("../../assets/img/decrease_1@2x.png");
            }
            &.discount {
              background-image: url("../../assets/img/discount_1@2x.png");
            }
            &.special {
              background-image: url("../../assets/img/guarantee_1@2x.png");
            }
            &.invoice {
              background-image: url("../../assets/img/invoice_1@2x.png");
            }
            &.guarantee {
              background-image: url("../../assets/img/special_1@2x.png");
            }
          }
          .supprot-text {
            font-size: 12px;
            line-height: 12px;
          }
        }
      }
      .bulletin {
        width: 80%;
        margin: 0 auto;
        .content {
          font-size: 12px;
          font-weight: 200;
          color: rgb(255, 255, 255);
          line-height: 24px;
        }
      }
    }
  }
  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }
}
.header-nav {
  display: flex;
  height: 50px;
  width: 100%;
  line-height: 50px;
  border-bottom: 1px solid #cccccc;
  font-size: 18px;
  color: rgb(77, 85, 93);
  text-align: center;
  .header-nav-item {
    flex: 1;
    float: left;
    list-style: none;
  }
}
.active {
  color: red;
}
.clearfix {
  display: inline-block;
}
.clearfix:after {
  display: block;
  content: "";
  height: 0;
  line-height: 0;
  clear: both;
  visibility: hidden;
}
</style>