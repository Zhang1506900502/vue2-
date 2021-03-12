<template>
  <div id="app">
    <Header></Header>
    <section>
      <transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>
<script>
import Header from "@/components/header/header.vue";
export default {
  data() {
    return {};
  },
  components: {
    Header
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.body {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
ul,
li {
  list-style: none;
}
</style>
