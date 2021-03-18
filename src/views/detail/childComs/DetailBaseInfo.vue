<template>
  <!-- 数据全部获取后再渲染页面 -->
  <div class="detail-base-info" v-if="Object.keys(goods).length != 0">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="new-price">{{ goods.newPrice }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span class="discount" v-show="goods.discount != ''">{{
        goods.discount
      }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-services">
      <!-- "n in 10"  遍历 10 次，1~10 -->
      <span
        v-for="index in goods.services.length - 1"
        :key="index"
        class="services-item"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.info-title {
  margin: 13px 6px 10px;
  font-weight: 600;
}
.info-price {
  position: relative;
  height: 30px;
  margin: 0 6px 15px;
}
.new-price {
  color: hotpink;
  font-size: 23px;
}
.old-price {
  text-decoration: line-through;
  color: rgba(99, 87, 87, 0.678);
  margin: 0 7px;
  font-size: 14px;
}
.discount {
  position: absolute;
  top: 0;
  padding: 3px 4px 1px;
  color: #fff;
  background-color: hotpink;
  border-radius: 10px;
  font-size: 12px;
}
.info-other {
  display: flex;
  justify-content: space-between;
  margin: 0 7px;
  padding-bottom: 8px;
  font-size: 14px;
  color: rgba(99, 87, 87, 0.678);
  border-bottom: 1px solid #eee;
}
.info-services {
  display: flex;
  justify-content: space-between;
  padding: 23px 7px;
  font-size: 14px;
  border-bottom: 3px solid #eee;
}
.info-services img {
  width: 12px;
}
</style>
