<template>
  <div id="app">
    <!-- <el-scrollbar class="page-component__scrollbar"> -->
    <el-backtop />
    <button @click="scollerTo()">
      Scroll to #element
    </button>
    <h1>​概述​</h1>
    <h2>​  1.一个栗子​</h2>
    <h2>  ​2. 特性​</h2>
    <h2>​  3.泛型的使用​</h2>
    <h3>    ​3.1 泛型类​</h3>
    <h3>​    3.2 泛型接口​</h3>
    <h3>​    3.3 泛型通配符​</h3>
    <h3>    ​3.4 泛型方法​</h3>
    <h3>    ​3.4.1 泛型方法的基本用法​</h3>
    <h3>​    3.4.2 类中的泛型方法​</h3>
    <h3>    ​3.4.3 泛型方法与可变参数​</h3>
    <h3>​    3.4.4 静态方法与泛型​</h3>
    <h3>​    3.4.5 泛型方法总结​</h3>
    <h2>  ​4.7 泛型上下边界​</h2>
    <h2>  ​4 关于泛型数组要提一下​</h2>
    <h2>  ​5. 最后​</h2>

    <h1 id="element">Hi. I'm element</h1>

    <h1>Hi. I'm element2</h1>
    <!-- </el-scrollbar> -->

  </div>

</template>

<script>

export default {
  data() {
    return {
      userList: []
    }
  },
  created() {
    // setTimeout(() => {
    //   window.L2Dwidget.init({
    //     pluginRootPath: 'public/static/live2dw/',
    //     pluginJsPath: 'lib/',
    //     pluginModelPath: 'live2d-widget-model-hijiki/assets/',
    //     tagMode: false,
    //     debug: false,
    //     model: { jsonPath: '../static/live2dw/live2d-widget-model-hijiki/assets/hijiki.model.json' },
    //     display: { position: 'right', width: 300, height: 650 },
    //     mobile: { show: true },
    //     log: false
    //   })
    // }, 1000)
  },
  methods: {
    scollerTo() {
      const anchors = document.querySelector('#element')
      const anchors2 = document.querySelectorAll('h1,h2,h3,h4,h5,h6')[1]
      console.log(anchors)
      this.$scrollTo(anchors2, 500)
    }
  }
}
</script>

<style lang="scss">
// h1, button {
//   margin-bottom: 1000px;
// }
  // scrollbar style
  .page-component__scrollbar {
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
