<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.swiper {
  height: 300px;
  overflow: hidden;
}
</style>
