<template>
  <div class="cart-list-item">
    <check-button
      :is-checked="product.checked"
      @click.native="checkedClick"
    ></check-button>
    <div class="image">
      <img :src="product.image" />
    </div>
    <div class="info">
      <div class="title">{{ product.title }}</div>
      <div class="desc">{{ product.desc }}</div>
      <div class="bottom">
        <div class="price">￥{{ product.price }}</div>
        <div class="count">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkedClick() {
      this.product.checked = !this.product.checked;
    },
  },
  components: {
    CheckButton,
  },
};
</script>

<style scoped>
.cart-list-item {
  display: flex;
  width: 100%;
  padding: 5px;
  /* font-size: 0; */
  border-bottom: 1px solid rgb(190, 186, 186);
}
.check-button {
  display: flex;
  align-items: center;
}
.image {
  margin: 5px;
}
.image img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
}
.info {
  font-size: 17px;
  color: #333;
  margin: 5px 10px;
  overflow: hidden;
}
.title,
.desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.desc {
  font-size: 14px;
  margin-top: 15px;
  color: #666;
}
.bottom {
  position: relative;
  margin-top: 30px;
}
.price {
  color: orange;
}
.count {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
