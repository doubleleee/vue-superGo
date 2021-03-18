<template>
  <div class="category-content" v-if="Object.keys(subCategory).length != 0">
    <div class="list-item" v-for="(item, index) in subCategory" :key="index">
      <a :href="item.link">
        <img :src="item.image" />
        <div class="title">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryContent",
  props: {
    subCategory: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
.category-content {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 8px;
}
.list-item {
  width: 33%;
  padding: 0 5px;
  margin-bottom: 15px;
  text-align: center;
}
img {
  width: 100%;
}
.title {
  margin: 10px auto 0;
  font-size: 12px;
}
</style>
