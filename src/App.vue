<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import header from "./components/header/header";
import Goods from "./components/goods/goods";
import Ratings from "./components/ratings/ratings";
import Seller from "./components/seller/seller";
import Tab from "./components/tab/tab";
import { getSeller } from "api/api";
import qs from "query-string";

export default {
  name: "app",
  data() {
    return {
      seller: {
        id: qs.parse(location.search).id
      }
    };
  },
  computed: {
    tabs() {
      return [
        {
          label: "商品",
          component: Goods,
          data: { seller: this.seller }
        },
        {
          label: "评分",
          component: Ratings,
          data: { seller: this.seller }
        },
        {
          label: "商家",
          component: Seller,
          data: { seller: this.seller }
        }
      ];
    }
  },
  created() {
    getSeller({ id: this.seller.id }).then(seller => {
      this.seller = seller;
    });
  },
  components: {
    "v-header": header,
    Tab
  }
};
</script>
<style lang="stylus" scoped>
#app {
  .tab-wrapper {
    position: fixed;
    top: 136px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>