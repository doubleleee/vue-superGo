<template>
  <scroll class="content1">
    <div class="category-menu" v-if="Object.keys(menuList).length != 0">
      <div
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        @click="itemClick(index)"
        :class="{ active: index === currentIndex }"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CategoryMenu",
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Scroll,
  },

  data() {
    return {
      currentIndex: 0,
    };
  },

  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index);
    },
  },
};
</script>

<style scoped>
.content1 {
  height: 100%;
  width: 100px;
}
.menu-item {
  line-height: 45px;
  font-size: 15px;
  text-align: center;
  background-color: #f6f6f6;
}
.active {
  color: hotpink;
  font-weight: 600;
  background-color: #fff;
  border-left: 2px solid #ff8198;
}
</style>
