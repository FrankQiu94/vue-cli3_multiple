<template>
  <div id="box">
    hello project1
    <div class="">
      <!-- <hello-world/> -->
    </div>
    <!-- <img src="../img/logo.png"><br> -->
    <button type="button" @click="get">get请求</button><br>
    <button type="button" @click="post">post请求</button><br>
    <a href="/project2/index.html">跳转到二页面</a><br>
    <el-button icon="el-icon-search" @click.native="startHacking">Let's do it</el-button>
    <el-icon/>
  </div>
</template>

<script type="text/javascript">
// import HelloWorld from '@src/components/HelloWorld'
import Api from '@api/api'

export default {
  name: 'project1',
  // components: {
  //   HelloWorld
  // },
  data () {
    return {
      project1: false
    }
  },
  mounted () {
    console.log(this.project1)
  },
  methods: {
    get () {
      this.$service.get(Api.testApi1)
        .then(res => {
          console.log(res)
        })
    },
    post () {
      this.$service.post(Api.testApi2)
        .then(res => {
          console.log(res)
        })
        .catch(rej => {
          console.log(rej)
        })
    },
    startHacking () {
      this.$notify({
        title: 'It Works',
        message:
          "We have laid the groundwork for you. Now it's your time to build something epic!",
        duration: 6000
      })
    }
  }
}
</script>

<style lang="less" scoped>
#box {
  // background: rgba(155, 155, 155, .5) url('../img/logo.png') no-repeat center;
  background-size: contain;
}
button {
  width: 2rem;
  height: 1rem;
}
</style>
