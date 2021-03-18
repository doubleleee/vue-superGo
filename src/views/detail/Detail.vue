<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="navbar"></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-params-info ref="params" :param-info="paramInfo">
      </detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo">
      </detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="topClick" v-show="isShow"></back-top>
    <detail-tab-bar @addCart="addToCart"></detail-tab-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComs/DetailNavBar";
import DetailSwiper from "./childComs/DetailSwiper";
import DetailBaseInfo from "./childComs/DetailBaseInfo";
import DetailShopInfo from "./childComs/DetailShopInfo";
import DetailGoodsInfo from "./childComs/DetailGoodsInfo";
import DetailParamsInfo from "./childComs/DetailParamsInfo";
import DetailCommentInfo from "./childComs/DetailCommentInfo";
import DetailTabBar from "./childComs/DetailTabBar";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { debounce } from "common/untils";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailTabBar,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null, // 函数
      currentIndex: 0,
      isShow: false,
    };
  },

  created() {
    // 1、保存传入的iid，避免点入不同 GoodsListItem 仍显示上次点开的别的商品详细页面
    this.iid = this.$route.params.iid;

    // 2、根据 iid 请求详细数据
    this.getDetail();

    // 3、请求推荐数据
    this.getRecommend();

    // 4、给 getThemeTopY 赋值（对赋值操作进行防抖，提高性能）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    }, 500);
  },

  methods: {
    getDetail() {
      getDetail(this.iid).then((res) => {
        // 获取数据
        const data = res.result;
        // 获取轮播图数据
        this.topImages = data.itemInfo.topImages;
        // 获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 获取商品详细信息
        this.detailInfo = data.detailInfo;
        // 获取商品参数信息
        this.paramInfo = new GoodsParams(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 获取评论信息
        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },

    getRecommend() {
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
    },

    // 点击导航栏跳转
    titleClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },

    // 监听图片加载完成
    detailImageLoad() {
      // 加载完成重新计算高度
      this.$refs.scroll.refresh();

      // 加载完成给对应内容的滚动高度赋值

      // 1、方法一：赋值很多次（可用）
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);

      // 2、方法二：赋值一次或少次（最佳）
      this.getThemeTopY();
    },

    // 监听滚动位置
    contentScroll(position) {
      // 1、获取 y 值
      const positionY = -position.y;
      // 2、y 值与主题中的值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        // 方法一：复用性高，只打印一次
        if (
          this.currentIndex != i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }

        // 方法二：else if 或 switch
      }

      // 判断 backTop 是否显示
      this.isShow = -position.y > 1000;
    },

    // 点击返回顶部
    topClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },

    // 加入购物车
    addToCart() {
      // 1、获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 2、将商品添加到购物车
      this.$store.dispatch("addCart", product).then((res) => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);

        this.$toast.show(res, 1500);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
}
.goods-list {
  padding-top: 15px;
  padding-bottom: 50px;
  margin-top: 30px;
  border-top: 2px solid #eee;
}
</style>
