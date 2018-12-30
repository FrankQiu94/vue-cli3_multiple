<template lang="html">
  <div id="app">
    <header>
    <!-- router-link 定义点击后导航到哪个路径下 -->
      <router-link to="/home">Home</router-link>
      <router-link to="/project2_">project2</router-link>
    </header>
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 3rem;
  // background: url('./img/logo.png') no-repeat center;
  background-size: contain;
}
header>a {
  font-size: .8rem;
}
</style>
