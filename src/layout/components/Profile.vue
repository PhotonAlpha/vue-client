<template>
  <!-- <div>
    <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
  </div> -->
  <el-card shadow="hover" :body-style="{ padding: '0px', textAlign: 'center' }">
    <img src="@/assets/profile/killua.jpg" class="image">
    <div style="padding: 14px;">
      <h2>Ethan</h2>
      <span>I'm a java developer. Welcome to my galaxy!</span>
      <el-divider />
      <div>
        <i class="fas fa-map-marker-alt icon-right" />
        <span>China</span>
      </div>
      <div>
        <i class="far fa-envelope icon-right" />
        <span>411084090@qq.com</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      fit: 'fill',
      url: '@/assets/profile/killua.jpg',
      currentDate: new Date(),
      userList: [{ id: 1, name: 'test:1' },
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
        { id: 79, name: 'test:dsa1----------end' }]
    }
  }
}
</script>
<style lang="scss" scope>
.icon-right {
  margin-right: 10px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.image {
  height: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

</style>
