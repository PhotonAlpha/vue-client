<template>
  <el-card v-if="currentIssue" class="comment-list-card">
    <div slot="header" class="clearfix">
      <span>{{ currentIssue.body }}</span>
    </div>
    <template v-if="currentIssue.comments && currentIssue.comments.length > 0">
      <div v-for="item in currentIssue.comments" :key="item.id" class="box-card-item">
        <el-row type="flex" style="padding-bottom: 16px;">
          <el-col :span="2">
            <el-avatar class="box-avatar" shape="square" :size="'large'" :src="item.user.avatar_url" />
          </el-col>
          <el-col :span="22" class="box-card-border">
            <el-card>
              <div slot="header" class="box-card-border__header">
                <el-link href="https://element.eleme.io" target="_blank">{{ item.user.login }}</el-link>
                <span class="box-link-span">commented on  {{ formatDateTime(item.created_at) }}</span>
              </div>
              <div style="margin-left: 20px;">
                <vue-markdown id="markdown-content" class="markdown-body">{{ item.body }}</vue-markdown>
              </div>
              <reaction :id="item.id" />
            </el-card>
          </el-col>
        </el-row>
      </div>
    </template>
  </el-card>
</template>
<script>
import moment from 'moment'
import VueMarkdown from 'vue-markdown'
import Reaction from '@/components/Comment/Reaction'

export default {
  name: 'CommentList',
  components: {
    VueMarkdown,
    Reaction
  },
  props: {
    currentIssue: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      timeFormat: this.formatDateTime('2020-05-20T07:37:59Z'),
      checkboxGroup4: ['上海'],
      cities: ['上海', '北京', '广州', '深圳']
    }
  },
  computed: {

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
    padding: 5px 20px;
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
