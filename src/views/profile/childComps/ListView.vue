<template>
  <div class="list-view">
    <div class="image"><slot name="image"></slot></div>
    <div class="text"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.list-view {
  display: flex;
  background-color: #fff;
  line-height: 45px;
}
.image {
  margin-left: 15px;
}
.text {
  margin-left: 5px;
  padding-left: 5px;
  border-bottom: 1px solid #eee;
  width: 100%;
}
</style>
