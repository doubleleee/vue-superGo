<template>
  <div class="category">
    <!-- 导航栏 -->
    <nav-bar>
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="box">
      <!-- 左侧菜单栏 -->

      <category-menu
        :menuList="menuList"
        @itemClick="menuClick"
      ></category-menu>

      <!-- 右侧菜单栏 -->
      <scroll class="content2">
        <div>
          <category-content :subCategory="contentList"></category-content>
          <tab-control
            :titles="['综合', '新品', '销量']"
            @tabClick="tabClick"
          ></tab-control>
          <goods-list :goods="detailList"></goods-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CategoryMenu from "./childComps/CategoryMenu";
import CategoryContent from "./childComps/CategoryContent";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import {
  getCategory,
  getSubCategory,
  getCategoryDetail,
} from "network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    CategoryMenu,
    CategoryContent,
    TabControl,
    GoodsList,
    Scroll,
  },

  data() {
    return {
      menuList: [],
      categortContent: {},
      currentIndex: -1,
      currentType: "pop",
    };
  },

  created() {
    this.getCategory();
  },

  computed: {
    contentList() {
      // 若 data 中定义 currentIndex=0 的话，subCategory 属性还未初始化，会报错
      if (this.currentIndex === -1) return [];
      return this.categortContent[this.currentIndex].subCategory;
    },

    detailList() {
      if (this.currentIndex === -1) return [];
      return this.categortContent[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },

  methods: {
    getCategory() {
      getCategory().then((res) => {
        // 1、获取左侧分类菜单数据
        this.menuList = res.data.category.list;

        // 2、初始化每个类别的子数据
        for (let i = 0; i < this.menuList.length; i++) {
          // 在 this.categortContent 内部定义 i 个 i 属性，与 menuList 一一对应
          // 每个 i 内部包含 subCategory 和 CategoryContent 属性
          this.categortContent[i] = {
            subCategory: [],
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }

        // 3、创建请求第一行菜单的分类数据（左侧分类菜单数据请求完毕才执行）
        this.menuClick(0);
      });
    },

    // 点击左侧菜单列表请求右侧数据
    menuClick(index) {
      this.currentIndex = index;
      const maitKey = this.menuList[index].maitKey;
      getSubCategory(maitKey).then((res) => {
        this.categortContent[index].subCategory = res.data.list;
        // 解构赋值保存到 categortContent 对象中
        this.categortContent = { ...this.categortContent };

        this.getCategoryDetail("pop");
        this.getCategoryDetail("new");
        this.getCategoryDetail("sell");
      });
    },

    // 请求右侧下方详情数据
    getCategoryDetail(type) {
      const miniWallkey = this.menuList[this.currentIndex].miniWallkey;
      getCategoryDetail(type, miniWallkey).then((res) => {
        this.categortContent[this.currentIndex].categoryDetail[type] = res;
        this.categortContent = { ...this.categortContent };
        console.log(this.categortContent);
      });
    },

    // 点击 tabControl 切换页面
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
  },
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.nav-bar {
  position: relative;
  background-color: #fa90c1;
  color: #fff;
  z-index: 9;
}
.box {
  /* position: relative; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
}

.content2 {
  height: 100%;
  flex: 1;
}
</style>

