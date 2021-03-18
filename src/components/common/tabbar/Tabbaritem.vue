<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabbaritem",
  props: {
    path: String,
    activeColor: {
      path: String,
      default: "#fa90c1",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 22px;
  height: 22px;
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 4px;
}
.active {
  /* 颜色不要写死 直接写到入口文件中 避免修改子组件源码 */
  /* color: #fa90c1; */
}
</style>
