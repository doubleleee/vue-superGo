<template>
  <div class="detail-tab-bar">
    <div class="bar-left bar-item">
      <div>
        <i class="service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="collect"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-right bar-item">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailTabBar",
  data() {
    return {};
  },
  methods: {
    addCart() {
      this.$emit("addCart");
    },
  },
};
</script>

<style scoped>
.detail-tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 49px;
  background-color: #fff;
  text-align: center;
  font-size: 14px;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
}
i {
  display: block;
  width: 22px;
  height: 22px;
  margin: 7px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.service {
  background-position: 0 -52px;
}
.shop {
  background-position: 0 -98px;
}
.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}
.cart {
  background-color: rgba(255, 166, 0, 0.911);
}
.buy {
  background-color: hotpink;
}
</style>
