import Vue from "vue";
import VueRouter from "vue-router";
import Appraise from "@/views/Appraise.vue"
import Commodity from "@/views/Commodity.vue"
import Merchant from "@/views/Merchant"
Vue.use(VueRouter);

const routes = [
  //一级路由
  {
    path: "/Appraise",
    component: Appraise
  },
  {
    path: "/Commodity",
    component: Commodity
  },
  {
    path: "/Merchant",
    component: Merchant
  },
  {
    path: "/", //路由重定向
    component: Commodity
  }

];

const router = new VueRouter({
  mode: 'hash', //vue-router 中hash模式和history模式。
  routes
});

export default router;
