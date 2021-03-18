<template>
  <div class="cart-bottom-bar">
    <div class="check">
      <check-button
        :is-checked="isCheckedAll"
        @click.native="checkedAll"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total">合计：￥{{ totalPrice }}</div>
    <div class="calculate">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      // filter：返回购物车列表中 checked 为 true 的商品数组
      // reduce：计算过滤后数组中的价格总和，返回数值
      return this.$store.getters.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },

    checkLength() {
      return this.$store.getters.cartList.filter((item) => item.checked).length;
    },

    // 是否全选
    isCheckedAll() {
      // 方法一
      // if (this.$store.getters.cartList.length != 0) {
      //   return !this.$store.getters.cartList.filter((item) => !item.checked)
      //     .length;
      // }

      // 方法二
      // if (this.$store.getters.cartList.length != 0) {
      //   return (
      //     this.$store.getters.cartList.filter((item) => item.checked).length ===
      //     this.$store.getters.cartList.length
      //   );
      // }

      // 方法三
      if (this.$store.getters.cartList.length != 0) {
        return !this.$store.getters.cartList.find((item) => !item.checked);
      }
    },
  },

  methods: {
    checkedAll() {
      if (this.isCheckedAll) {
        this.$store.getters.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.getters.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 49px;
  height: 40px;
  width: 100%;
  background-color: #eee;
}
.check,
.total {
  display: flex;
  align-items: center;
  height: 100%;
}
.check-button {
  margin: 0 8px;
}
.total {
  font-size: 15px;
  margin-left: 25px;
}
.calculate {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: rgb(247, 53, 150);
}
</style>
