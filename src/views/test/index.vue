<template>
  <div style="height:100%" class="main-cnt">
    <el-scrollbar class="page-component__scrollbar">
      <!-- <el-row type="flex">Header</el-row>
      <el-row type="flex" class="main-cnt">
        <el-col :span="24">
          <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
        </el-col>
      </el-row> -->
      <el-container>
        <el-header>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect"
          >
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <el-row type="flex">
            <el-col :span="5" class="side-cnt">
              <el-scrollbar class="page-component__scrollbar">
                <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
              </el-scrollbar>
            </el-col>
            <el-col :span="12" :offset="6" style="background: #fff">
              <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
            </el-col>
            <el-col :span="5" :offset="18" class="right-side-cnt">
              <el-scrollbar class="page-component__scrollbar">
                <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
              </el-scrollbar>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-scrollbar>
  </div>

  <!-- 内部漂亮的滚动条 -->
  <!-- <div class="zy-main">
    <el-scrollbar
      class="page-component__scrollbar"
    >
      <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
    </el-scrollbar>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      userList: []
    }
  },
  created() {
    this.userList = [
      { id: 1, name: 'test:1' },
      { id: 2, name: 'test:2' },
      { id: 3, name: 'test:3' },
      { id: 4, name: 'test:4' },
      { id: 5, name: 'test:5' },
      { id: 6, name: 'test:11' },
      { id: 7, name: 'test:21' },
      { id: 8, name: 'test:31' },
      { id: 9, name: 'test:41' },
      { id: 10, name: 'test:51' },
      { id: 11, name: 'test:61' },
      { id: 12, name: 'test:71' },
      { id: 13, name: 'test:81' },
      { id: 14, name: 'test:91' },
      { id: 15, name: 'test:111' },
      { id: 16, name: 'test:121' },
      { id: 17, name: 'test:1231' },
      { id: 18, name: 'test:1211' },
      { id: 19, name: 'test:211' },
      { id: 20, name: 'test:211' },
      { id: 21, name: 'test:211' },
      { id: 22, name: 'test:211' },
      { id: 23, name: 'test:211' },
      { id: 24, name: 'test:211' },
      { id: 25, name: 'test:211' },
      { id: 26, name: 'test:211' },
      { id: 27, name: 'test:211' },
      { id: 28, name: 'test:211' },
      { id: 29, name: 'test:211' },
      { id: 30, name: 'test:dsa1' },
      { id: 31, name: 'test:dsa1' },
      { id: 32, name: 'test:dsa1' },
      { id: 33, name: 'test:dsa1' },
      { id: 34, name: 'test:dsa1' },
      { id: 35, name: 'test:dsa1' },
      { id: 36, name: 'test:dsa1' },
      { id: 37, name: 'test:dsa1' },
      { id: 38, name: 'test:dsa1' },
      { id: 39, name: 'test:dsa1' },
      { id: 40, name: 'test:dsa1' },
      { id: 41, name: 'test:dsa1' },
      { id: 42, name: 'test:dsa1' },
      { id: 43, name: 'test:dsa1' },
      { id: 44, name: 'test:dsa1' },
      { id: 45, name: 'test:dsa1' },
      { id: 46, name: 'test:dsa1' },
      { id: 47, name: 'test:dsa1' },
      { id: 48, name: 'test:dsa1' },
      { id: 49, name: 'test:dsa1' },
      { id: 50, name: 'test:dsa1' },
      { id: 51, name: 'test:dsa1' },
      { id: 52, name: 'test:dsa1' },
      { id: 53, name: 'test:dsa1' },
      { id: 54, name: 'test:dsa1' },
      { id: 55, name: 'test:dsa1' },
      { id: 56, name: 'test:dsa1' },
      { id: 57, name: 'test:dsa1' },
      { id: 58, name: 'test:dsa1' },
      { id: 59, name: 'test:dsa1' },
      { id: 60, name: 'test:dsa1' },
      { id: 61, name: 'test:dsa1' },
      { id: 62, name: 'test:dsa1' },
      { id: 63, name: 'test:dsa1' },
      { id: 64, name: 'test:dsa1' },
      { id: 65, name: 'test:dsa1' },
      { id: 66, name: 'test:dsa1' },
      { id: 67, name: 'test:dsa1' },
      { id: 68, name: 'test:dsa1' },
      { id: 69, name: 'test:dsa1' },
      { id: 70, name: 'test:dsa1' },
      { id: 71, name: 'test:dsa1' },
      { id: 72, name: 'test:dsa1' },
      { id: 73, name: 'test:dsa1' },
      { id: 74, name: 'test:dsa1' },
      { id: 75, name: 'test:dsa1' },
      { id: 76, name: 'test:dsa1' },
      { id: 77, name: 'test:dsa1' },
      { id: 78, name: 'test:dsa1' },
      { id: 79, name: 'test:dsa1----------end' }
    ]
  }
}
</script>

<style lang="scss">
.main-cnt {
  height: 100%;
  overflow-y: hidden;
}
.page-component__scrollbar {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: hidden;
}

// 侧边栏
.side-cnt {
  height:80vh;
  overflow: hidden;
  background: #e6acac;
  position: fixed;
}
.right-side-cnt {
  height: 80vh;
  overflow: hidden;
  background: antiquewhite;
  position: fixed;
}
</style>
