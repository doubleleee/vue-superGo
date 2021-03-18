<template>
  <div class="profile">
    <!-- 导航栏 -->
    <nav-bar>
      <div slot="center">大宝商店</div>
    </nav-bar>
    <!-- 用户登录信息 -->
    <user-info></user-info>
    <!-- 卡券相关区域 -->
    <div class="card">
      <div>
        <span class="count">0.00</span>元
        <div>我的余额</div>
      </div>
      <div>
        <span class="count">0</span>个
        <div>我的优惠</div>
      </div>
      <div class="score">
        <span class="count">0</span>分
        <div>我的积分</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="order">
      <list-view>
        <img src="~assets/img/profile/xiaoxi1.png" slot="image" />
        <span slot="text">我的消息</span>
      </list-view>
      <list-view>
        <img src="~assets/img/profile/icon-.png" slot="image" />
        <span slot="text">积分商城</span>
      </list-view>
      <list-view>
        <img src="~assets/img/profile/huiyuan.png" slot="image" />
        <span slot="text">会员卡</span>
      </list-view>
    </div>
    <div class="order">
      <list-view>
        <img src="~assets/img/profile/ziyuan.png" slot="image" />
        <span slot="text">我的购物车</span>
      </list-view>
      <list-view>
        <img src="~assets/img/profile/ziyuan_1.png" slot="image" />
        <span slot="text">下载购物APP</span>
      </list-view>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";

export default {
  name: "Profile",
  data() {
    return {};
  },
  components: {
    NavBar,
    UserInfo,
    ListView,
  },
};
</script>

<style scoped>
.profile {
  background-color: #eee;
}
.nav-bar {
  background-color: #fa90c1;
  color: #fff;
}
.card {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
}
.card > div {
  width: 33%;
  /* height: 100%; */
  text-align: center;
  border-right: 1px solid #eee;
  padding: 20px;
}
.card .score {
  border: none;
}
.count {
  color: hotpink;
  font-size: 22px;
  font-weight: 600;
}
.card > div > div {
  font-size: 14px;
  margin-top: 5px;
}
.order {
  margin-top: 5px;
}
.list-view img {
  width: 20px;
  vertical-align: middle;
}
</style>
