<template>
  <div class="detail-params-info" v-if="Object.keys(paramInfo).length != 0">
    <table class="size">
      <tr v-for="(item, index) in paramInfo.sizes[0]" :key="index">
        <td v-for="(size, index) in item" :key="index">{{ size }}</td>
      </tr>
    </table>
    <table class="info">
      <tr v-for="(item, index) in paramInfo.infos" :key="index">
        <td class="info-key">{{ item.key }}</td>
        <td class="info-value">{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.detail-params-info {
  margin: 25px 15px;
  font-size: 15px;
}
.size {
  width: 100%;
  border-collapse: collapse;
}
.size tr {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eee;
}
.size tr:last-child {
  border-bottom: 2px solid #eee;
}
.size td {
  width: 58px;
}
.info {
  width: 100%;
  border-collapse: collapse;
}
.info tr {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eee;
}
.info-key {
  width: 80px;
}
.info-value {
  color: hotpink;
}
</style>
