<template>
  <div class="detail-goods-info" v-if="Object.keys(detailInfo).length != 0">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="goods-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imageLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    imageLoad() {
      this.$emit("detailImageLoad");
    },
  },
};
</script>

<style scoped>
.detail-goods-info {
  padding: 20px 0 25px;
  border-top: 3px solid #eee;
  border-bottom: 3px solid #eee;
  font-size: 15px;
}
.info-desc {
  margin: 0 10px;
  overflow: hidden;
}
.desc {
  margin: 15px 0 10px;
}
.start {
  width: 70px;
  height: 5px;
  border-bottom: 1px solid #666666;
}
.start::before {
  content: "";
  display: block;
  width: 4px;
  height: 5px;
  background-color: #666666;
}
.end {
  float: right;
  width: 70px;
  height: 5px;
  border-bottom: 1px solid #666666;
  text-align: right;
}
.end::before {
  content: "";
  float: right;
  display: block;
  width: 4px;
  height: 5px;
  background-color: #666666;
}
.info-key {
  margin: 20px 10px;
}
.goods-list img {
  width: 100%;
}
</style>
