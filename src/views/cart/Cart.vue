<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar>
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Cart",
  data() {
    return {};
  },
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  computed: {
    cartLength() {
      return this.$store.getters.cartLength;
    },
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
  },
};
</script>

<style scoped>
.cart {
  position: relative;
  height: 100vh;
}
.nav-bar {
  background-color: #fa90c1;
  color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
