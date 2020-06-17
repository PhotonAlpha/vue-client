# vue-creed
## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## Demo
[demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

排坑指南
1. 当设置 `publicPath: '/creed/'` 时并且启用router `history`模式的时候, 需要在 router 中添加 base的设置. `const createRouter = () => new Router({ base: process.env.VUE_APP_SRC })`
2. <el-scrollbar></el-scrollbar> 可以自定义滚动条