<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="showImage" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    },
  },
  methods: {
    imageLoad() {
      // 事件总线 $bus
      // 事件总线中发射事件
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-list-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  font-size: 12px;
  text-align: center;
  overflow: hidden;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.price {
  color: #fa90c1;
  margin-right: 20px;
}
.collect {
  position: relative;
}
.collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
