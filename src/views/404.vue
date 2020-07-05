<template>
  <div>
    <div class="http404-button">
      <el-button type="primary" round @click="backHome()">Back to Home</el-button>
    </div>
    <img class="http404-container" src="@/assets/404_images/404.gif" alt="404">
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  },
  methods: {
    backHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.http404-container{
  position:absolute;
  left:0;
  top:0;
  z-index:-1;
  height: 100%;
  width: 100%;
}
.http404-button {
  justify-content: center;
  display: flex;
  margin-top: 120px;
}
</style>
