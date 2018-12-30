<template lang="html">
  <div class="project2">
    <h1>project2</h1>
    <p>{{project2}}</p>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  data () {
    return {
      project2: 'project2'
    }
  },
  mounted () {
    console.log(html2canvas)
  }
}
</script>

<style lang="less">
h1,
p {
  font-size: .5rem;
}
.project2 {
  width: 100%;
  height: 0.4rem;
  background: url('../img/logo.png') no-repeat center / contain;
}
</style>
