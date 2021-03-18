<template>
  <div class="detail-shop-info">
    <div class="shop-hd">
      <img :src="shop.logo" />
      <span class="shop-name">{{ shop.name }}</span>
    </div>
    <div class="shop-bd">
      <div class="shop-left">
        <div class="shop-sell">
          {{ shop.sells | sellCounts }}
          <div>总销量</div>
        </div>
        <div class="shop-goods">
          {{ shop.goodsCount }}
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="shop-right">
        <div
          class="score-item"
          v-for="(item, index) in shop.score"
          :key="index"
        >
          <span class="item-left">{{ item.name }}</span>
          <span class="item-center" :class="{ 'high-score': item.isBetter }">
            {{ item.score }}
          </span>
          <span class="item-right" :class="{ high: item.isBetter }">{{
            item.isBetter ? "高" : "低"
          }}</span>
        </div>
      </div>
    </div>
    <div class="shop">
      <a :href="shop.shopUrl">进店逛逛</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCounts(sells) {
      if (sells >= 10000) {
        return (sells / 10000).toFixed(1) + "万";
      } else {
        return sells;
      }
    },
  },
};
</script>

<style scoped>
.detail-shop-info {
  margin: 30px 7px 15px;
}
.shop-hd {
  margin-bottom: 25px;
}
.shop-hd img {
  width: 50px;
  vertical-align: middle;
  border: 1px solid #eee;
  border-radius: 25px;
  margin-right: 8px;
}
.shop-name {
  font-size: 16px;
  color: rgba(99, 87, 87, 0.746);
}
.shop-bd {
  display: flex;
  font-size: 14px;
}
.shop-left {
  flex: 1;
  margin-top: 7px;
}
.shop-sell {
  float: left;
  text-align: center;
  font-size: 18px;
  margin-left: 12px;
}
.shop-sell div {
  font-size: 13px;
  margin-top: 8px;
}
.shop-right {
  flex: 1;
}
.shop-goods {
  float: right;
  text-align: center;
  font-size: 18px;
  padding-right: 12px;
  border-right: 1px solid #eee;
}
.shop-goods div {
  font-size: 13px;
  margin-top: 8px;
}
.shop-right {
  margin-left: 20px;
}
.score-item {
  margin-bottom: 6px;
}
.item-center {
  display: inline-block;
  width: 30px;
  margin-left: 10px;
  color: rgb(54, 192, 54);
}
.item-right {
  margin-left: 8px;
  color: #fff;
  background-color: rgb(54, 192, 54);
  text-align: left;
}
.high-score {
  color: rgb(245, 50, 24);
}
.high {
  color: #fff;
  background-color: rgb(245, 50, 24);
}
.shop {
  width: 80px;
  height: 25px;
  background-color: #eee;
  border-radius: 15px;
  text-align: center;
  line-height: 25px;
  margin: 10px auto 20px;
  font-size: 14px;
}
</style>
