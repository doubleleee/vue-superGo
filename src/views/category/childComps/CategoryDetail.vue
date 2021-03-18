<template>
  <div class="category-detail">
    <goods-list></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";

export default {
  name: "CategoryDetail",
  props: {
    detailList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsList,
  },
};
</script>

<style scoped>
</style>
