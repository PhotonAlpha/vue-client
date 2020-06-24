<template>
  <el-card class="box-card">
    <div slot="header">
      <span>评论</span>
    </div>
    <div>
      <comment-list />
      <comment-input />
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
  }
}
</script>

