<template>
  <div class="detail-comment-info" v-if="Object.keys(commentInfo).length != 0">
    <div class="info-hd">
      <div class="hd-title">用户评价</div>
      <div class="hd-more">更多</div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" />
      <span class="user-name">{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-comment">
      <div class="comment-content">{{ commentInfo.content }}</div>
      <div class="comment-params">
        <span class="time">{{ commentInfo.created | showDate }}</span>
        <span class="style">{{ commentInfo.style }}</span>
      </div>
      <div class="comment-img">
        <img
          :src="item"
          v-for="(item, index) in commentInfo.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  filters: {
    showDate(value) {
      const date = new Date(value * 1000);
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      return y + "-" + m + "-" + d;
    },
  },
};
</script>

<style scoped>
.detail-comment-info {
  border-top: 3px solid #eee;
}
.info-hd {
  position: relative;
  margin: 15px 10px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.hd-more {
  position: absolute;
  top: 0;
  right: 0;
}
.info-user {
  margin: 15px 10px;
}
.info-user img {
  width: 46px;
  border-radius: 23px;
  vertical-align: middle;
  margin-right: 8px;
}
.info-comment {
  margin: 10px;
  font-size: 14px;
}
.comment-params {
  font-size: 12px;
  color: rgb(143, 138, 138);
  margin: 10px 0;
}
.time {
  margin-right: 10px;
}
.comment-img img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
