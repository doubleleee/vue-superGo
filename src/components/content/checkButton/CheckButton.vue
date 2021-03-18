<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" :class="{ checked: isChecked }" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  font-size: 0;
}
img {
  border-radius: 50%;
  border: 1px solid rgb(212, 210, 210);
}
.checked {
  background-color: hotpink;
  border: 1px solid hotpink;
}
</style>
