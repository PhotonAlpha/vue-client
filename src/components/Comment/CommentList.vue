<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>GraphQL 面向未来的API。Facebook 将其开源了一年多的 GraphQL 标记为 production ready ( http://graphql.org/blog/production-ready/ )，几乎同一时间，Github 开放了其 GraphQL API 的 early access ( GitHub GraphQL API )。两颗重磅炸弹先后落地，是否意味着已有五年多历史，和 Facebook 的 news feed 几乎同时诞生的 GraphQL 将在接下来的日子里大放异彩，逐渐取代 REST API 的地位？</span>
    </div>
    <div v-for="o in 4" :key="o" class="box-card-item">
      <el-row type="flex" style="padding-bottom: 16px;">
        <el-col :span="2">
          <el-avatar class="box-avatar" shape="square" :size="'large'" :src="'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" />
        </el-col>
        <el-col :span="20" class="box-card-border">
          <el-card>
            <div slot="header" class="box-card-border__header">
              <el-link href="https://element.eleme.io" target="_blank">PhotonAlpha</el-link>
              <span class="box-link-span">commented on  {{ timeFormat }}</span>
            </div>
            <div style="margin-left: 20px;">
              我是留言
            </div>
            <div style="margin-top: 20px;">
              <el-checkbox-group v-model="checkboxGroup4" size="mini">
                <el-checkbox-button v-for="i in 8" :key="i" :label="i">
                  <el-image :fit="'contain'" class="box-image-icon" src="https://github.githubassets.com/images/icons/emoji/unicode/1f604.png" />
                  <span class="box-image-font">{{ o }}</span>
                </el-checkbox-button>
              </el-checkbox-group>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import moment from 'moment'

export default {
  name: 'CommentList',
  data() {
    return {
      timeFormat: this.formatDateTime('2020-05-20T07:37:59Z'),
      checkboxGroup4: ['上海'],
      cities: ['上海', '北京', '广州', '深圳']
    }
  },
  methods: {
    formatDateTime(date) {
      const createTime = moment(date)
      const now = moment()
      const days = now.diff(createTime, 'days')
      console.log(days)
      if (days > 5) {
        return moment(date).format('YYYY-MM-DD')
      } else {
        return moment(date).fromNow()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.box-link {
  font-weight: bold;
  font-size: 0.8rem;
}
.box-link-span {
  color: #586069;
  font-weight: 400;
  font-size: smaller;
  margin-left: 10px;
}
.box-comment {
  min-height: 60px;
  padding-left: 60px;
  margin: 19px 0;
}
.box-card-item {
  padding: 0px;
}
.box-avatar {
  float: left;
  margin-right: 20px;
}
.box-image-icon {
  height: 18px;
  width: 18px;
}
.box-image-font {
  vertical-align: super;
  font-size: medium;
}

.box-card-border {
  position: relative;
  color: #24292e;
  border: 1px solid #d1d5da;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background-color: #f1f8ff;
  border-bottom-color: #c0d3eb;
  border-radius: 3px;

  .el-card .el-card__header {
    background-color: #c0d3eb;
  }
}

.box-card-border::before {
  position: absolute;
  top: 11px;
  right: 100%;
  left: -16px;
  display: block;
  width: 0;
  height: 0;
  pointer-events: none;
  content: " ";
  border-color: transparent;
  border-style: solid solid outset;
  border-width: 8px;
  border-right-color: #c0d3eb;
}
.box-card-border::after {
  position: absolute;
  top: 11px;
  right: 100%;
  left: -16px;
  display: block;
  width: 0;
  height: 0;
  pointer-events: none;
  content: " ";
  border-color: transparent;
  border-style: solid solid outset;
  margin-top: 1px;
  margin-left: 2px;
  border-width: 7px;
  border-right-color: #f1f8ff;
}
</style>
<style lang="scss">
.box-card-border .el-card {
  .el-card__header {
    background-color: #f1f8ff;
    padding: 8px 20px;
  }
  .el-card__body {
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .el-checkbox-group {
    background-color: #f1f8ff;
  }
  .el-checkbox-button__inner {
    // background-color: transparent;
  }
}

</style>
