<template>
  <el-card class="comment-card">
    <div slot="header">
      <span>评论</span>
      <el-dropdown v-if="commenterProfile.avatar_url" :span="1" style="margin: auto 0px;float: right;">
        <span class="el-dropdown-link">
          <el-avatar shape="square" :size="35" :src="commenterProfile.avatar_url+'?imageView2/1/w/80/h/80'" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="signout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <comment-list :current-issue="currentIssue" />
      <comment-input :current-issue="currentIssue" @commitComment="commitComment" @sign="signin" />
    </div>
  </el-card>
</template>

<script>
import CommentInput from './CommentInput'
import CommentList from './CommentList'

export default {
  name: 'Comment',
  components: {
    CommentInput,
    CommentList
  },
  props: {
    currentIssue: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    commenterProfile() {
      return this.$store.getters.commenterDetails
    }
  },
  methods: {
    commitComment(html) {
      this.$emit('commitComment', html)
    },
    signin(action) {
      this.$emit('sign', action)
    },
    signout() {
      this.$emit('sign', 'signout')
    }
  }
}
</script>
<style lang="scss">
.comment-card {
  .el-card__body {
    padding: 0px;
  }
}
</style>

