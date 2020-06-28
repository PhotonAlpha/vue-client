<template>
  <!-- <div>
    <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
  </div> -->
  <el-card shadow="hover" :body-style="{ padding: '0px', textAlign: 'center' }">
    <img src="@/assets/profile/killua.jpg" class="image">
    <div style="padding: 14px;">
      <div class="box-name">Ethan</div>
      <span>{{ profile.bio }}</span>
      <el-divider />
      <div>
        <i class="fas fa-map-marker-alt icon-right" />
        <span>{{ profile.location }}</span>
      </div>
      <div>
        <i class="far fa-envelope icon-right" />
        <span>{{ profile.email }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    profile() {
      return this.$store.getters.details
    }
  }
}
</script>
<style lang="scss" scope>
.box-name {
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
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
