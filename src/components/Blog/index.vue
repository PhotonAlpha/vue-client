<template>
  <div>
    <el-backtop :bottom="260" :right="0" />
    <template v-if="blogVal">
      <markdown id="markdown-content" class="dashboard-container markdown-body" :content="blogVal" />
      <comment :current-issue="currentIssue" @commitComment="commitComment" @sign="sign" @commitReaction="commitReaction" />
    </template>
    <template v-else>
      <el-alert
        title="未找到数据"
        type="info"
        show-icon
      />
    </template>
  </div>
</template>

<script>
import Markdown from '@/components/Markdown'
import { Base64 } from 'js-base64'
import Comment from '@/components/Comment'

export default {
  name: 'Blog',
  components: {
    Markdown,
    Comment
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    currentIssue: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    blogVal() {
      if (this.content) {
        return Base64.decode(this.content)
      }
      return ''
    }
  },
  methods: {
    commitComment(html) {
      this.$emit('commitComment', html)
    },
    sign(action) {
      this.$emit('sign', action)
    },
    commitReaction(val) {
      this.$emit('commitReaction', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    margin-bottom: 50px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
