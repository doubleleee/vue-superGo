<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: Array,
    default() {
      return [];
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 2px;
}
</style>
