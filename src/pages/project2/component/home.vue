<template lang="html">
  <div>
    <h1>home</h1>
    <p>{{msg}}</p>
    <img src="../img/logo.png" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'HOME'
    }
  }
}
</script>

<style lang="less">
img {
  width: 100%;
  object-fit: contain;
}
</style>
