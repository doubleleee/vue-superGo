<template>
  <div class="cart-list">
    <cart-list-item
      v-for="(item, index) in cartList"
      :key="index"
      :product="item"
    >
    </cart-list-item>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  data() {
    return {};
  },
  components: {
    CartListItem,
  },
  computed: {
    cartList() {
      return this.$store.getters.cartList;
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
