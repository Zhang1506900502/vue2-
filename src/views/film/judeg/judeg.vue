<template>
  <div class="judeg">
    <div class="judeg_header">
      <div
        class="judeg_total judeg_box"
        @click="select(2, $event)"
        :class="{ active: selectType === 2 }"
      >
        {{ desc.total }}
        <span>{{ ratings.length }}</span>
      </div>
      <div
        class="judeg_propose judeg_box"
        @click="select(0, $event)"
        :class="{ active: selectType === 0 }"
      >
        {{ desc.propose }}
        <span>{{ proposes.length }}</span>
      </div>
      <div
        class="judeg_wrang judeg_box"
        @click="select(1, $event)"
        :class="{ active: selectType === 1 }"
      >
        {{ desc.wrang }}
        <span>{{ wrangs.length }}</span>
      </div>
    </div>
    <div class="judeg_title" @click="toggleContent">
      <span class="iconfont icon-zhengque" :class="{ on: onlyContent }"></span>
      <span class="title_not">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    //由父级传入的数据
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    desc: {
      type: Object,
      default() {
        return {
          total: "全部",
          propose: "推荐",
          wrang: "吐槽"
        };
      }
    }
  },
  data() {
    // 自身定义的数据
    return {
      selectType: {
        type: Number,
        default: 2
      },
      onlyContent: false
    };
  },
  computed: {
    proposes() {
      //筛选出 rateType=0的
      return this.ratings.filter(item => {
        return item.rateType === 0;
      });
    },
    wrangs() {
      return this.ratings.filter(item => {
        return item.rateType === 1;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.selectType = type;
      this.$emit("filterRatings", type);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.onlyContent = !this.onlyContent;
      // 自定义事件，并想父级传输数据
      this.$emit("isContent", this.onlyContent);
    }
  }
};
</script>
<style lang="scss" scoped>
span {
  font-size: 10px;
  padding-left: 3px;
}
.judeg_box {
  padding: 8px;
  margin-right: 8px;
}
.judeg {
  padding: 0 18px;
}
.judeg_header {
  margin: 12px 0 0 0;
  font-size: 0; //去除白边
  border-bottom: 1px solid #cccccc;
  padding-bottom: 15px;
  .judeg_total {
    display: inline-block;
    font-size: 12px;
    color: rgb(255, 255, 255);
    line-height: 16px;
    border-radius: 2px;
    background: rgb(0, 160, 220, 0.6);
    padding-right: 8px;
    text-align: center;
  }
  .judeg_propose {
    display: inline-block;
    font-size: 12px;
    color: (77, 85, 93);
    line-height: 16px;
    border-radius: 2px;
    background: rgb(0, 160, 220, 0.2);
  }
  .judeg_wrang {
    display: inline-block;
    font-size: 12px;
    color: (77, 85, 93);
    line-height: 16px;
    border-radius: 2px;
    background: rgb(77, 85, 93, 0.2);
  }
  .active {
    color: #fff;
    background: rgb(0, 160, 220);
  }
}
.judeg_title {
  .iconfont {
    display: inline-block;
    padding: 12px 0;
    font-size: 24px;
    color: rgb(147, 153, 159);
    line-height: 24px;
    vertical-align: middle;
    &.on {
      color: #00c850;
      z-index: 50;
    }
  }
  .title_not {
    display: inline-block;
    padding-left: 4px;
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 24px;
  }
}
</style>