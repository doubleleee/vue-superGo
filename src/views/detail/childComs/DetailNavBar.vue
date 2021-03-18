<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" class="back" />
      </div>
      <div slot="center" class="title">
        <span
          v-for="(item, index) in titles"
          :key="index"
          :class="{ activeItem: index === currentIndex }"
          @click="itemClick(index)"
        >
          {{ item }}
        </span>
      </div>
      <div slot="right"></div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      // this.$router.go(-1);
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.title span {
  flex: 1;
}
.activeItem {
  color: hotpink;
}
.back {
  width: 35%;
  margin-top: 11px;
}
</style>
