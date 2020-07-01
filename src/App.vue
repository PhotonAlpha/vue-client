<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    setTimeout(() => {
      window.L2Dwidget
        .init({
          pluginRootPath: 'public/static/live2dw/', // 加载模块路径
          pluginJsPath: 'lib/',
          pluginModelPath: 'live2d-widget-model-shizuku/assets/', // 引入模块名称
          tagMode: false,
          debug: false,
          model: { jsonPath: '../static/live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json' }, // 引入配置文件
          display: { position: 'right', width: 180, height: 320 }, // 配置方位 （left right）可选
          mobile: { show: true },
          log: false,
          dialog: {
            enable: true,
            script: { // 对话框配置，这里暂时还有bug，需要进一步研究
            // 每空闲 10 秒钟，显示一条一言
              'every idle 10s': '$hitokoto$',
              // 当触摸到角色身体
              'tapbody': '哎呀！别碰我！',
              // 当触摸到角色头部
              'tapface': '人家已经不是小孩子了！'
            }
          }
        })
    }, 1000)
  }
}
</script>
