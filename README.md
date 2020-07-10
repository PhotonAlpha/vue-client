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

排坑指南
1. 当设置 `publicPath: '/creed/'` 时并且启用router `history`模式的时候, 需要在 router 中添加 base的设置. `const createRouter = () => new Router({ base: process.env.VUE_APP_SRC })`
2. <el-scrollbar></el-scrollbar> 可以自定义滚动条

3. 当发布到GitHub IO 之后，刷新页面是404.  解决办法是，在build好了之后，**复制一份index.html重命名为404.html即可**


https://github.com/login/oauth/authorize?client_id=22f33b7f43ec9ae6d0c9&scope=public_repo&redirect_uri=http://localhost:4200/auth?hash=f6de6f924fdbb5b8f3802f6a3e01976086d99b6a


http://localhost:9528/auth?hash=f6de6f924fdbb5b8f3802f6a3e01976086d99b6a&code=b818e5a107875bde4226

### Task List

- [ ] add comment function what is comment can be edit. 
- [ ] enhance markdown, can show big image