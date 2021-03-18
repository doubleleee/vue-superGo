<template>
  <div class="user-info">
    <a href="#">
      <slot name="iamge">
        <img src="~assets/img/common/user.jpg" class="user" />
      </slot>

      <div class="center">
        <slot name="login">登录/注册</slot>
        <div class="phone">
          <slot name="phone">暂无绑定手机号</slot>
        </div>
      </div>
      <img src="~assets/img/common/right.png" class="right" />
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {};
  },
};
</script>

<style scoped>
.user-info {
  position: relative;
}
a {
  background-color: rgba(247, 105, 176, 0.911);
  display: flex;
  align-items: center;
  width: 100%;
  color: #fff;
}
.user {
  width: 70px;
  border-radius: 50%;
  margin: 12px 10px 15px 20px;
}
.center {
  height: 100%;
}
.phone {
  font-size: 13px;
  font-weight: 300;
  margin-top: 5px;
}
.right {
  position: absolute;
  top: 50%;
  margin-top: -8px;
  right: 15px;
  width: 16px;
}
</style>
