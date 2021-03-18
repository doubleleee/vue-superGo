<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control-fixed"
      v-show="isTabFixed"
    >
    </tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!-- 推荐信息 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!-- 商品列表 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      >
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "./childComponents/RecommendView";
import FeatureView from "./childComponents/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/untils";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        // 当前加载的页数，当前加载的数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },

  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },

  created() {
    // 把方法抽取到 methods 内，钩子函数内只做调用
    // 1、请求多个数据
    this.getHomeMultidata();

    // 2、请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  mounted() {
    // 监听 item 中图片加载完成  （修复滚动卡顿bug）
    // 每次图片加载完调用防抖函数，若两次图片加载间隔小于 500 毫秒，则清除上一次定时器
    // 若时间间隔超过 500 毫秒，则调用一次 scroll.refresh()，重新计算高度
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  // 切换路由后仍保持原来位置
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  },

  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // type 为变量，必须用 []
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // ... 对数组进行解析展开，分别 push 每个元素
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 调用 scroll 组件中 scroll 属性的 finishPullUp 方法
        // scroll 的上拉加载更多方法只能加载一次
        // finishPullUp 类似控制一个开关，在触发 pullingUp 事件的时候，插件会关掉开关，防止用户重复上拉
        // 在数据加载完成以后，需要执行 finishPullUp 把开关打开，以便下次可以继续执行上拉刷新
        this.$refs.scroll.scroll.finishPullUp();
      });
    },

    /**
     * 事件监听相关方法
     */

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // 调用 scroll 组件中 scroll 属性的 scrollTo 方法
      // $refs 可直接访问子组件
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // 1、判断 backTop 是否显示
      this.isShow = -position.y > 1000;
      // 2、决定 tabControl 是否吸顶 (position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 组件没有 OffsetTop 的，需要通过 $el 来获取组件中的 DOM 元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  /* margin-top: 44px; */
  /* padding-bottom: 49px; */
  height: 100vh;
}
.nav-bar {
  /* position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999; */
  background-color: #fa90c1;
  color: #fff;
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control-fixed {
  position: relative;
  z-index: 9;
}
</style>
