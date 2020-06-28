<template>
  <div>
    <template v-if="blogVal">
      <vue-markdown id="markdown-content" class="dashboard-container markdown-body">{{ blogVal }}</vue-markdown>
      <comment />
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
import VueMarkdown from 'vue-markdown'
import { Base64 } from 'js-base64'
import Comment from '@/components/Comment'

export default {
  name: 'Blog',
  components: {
    VueMarkdown,
    Comment
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    blogVal() {
      if (this.content) {
        return Base64.decode(this.content)
      }
      return ''
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
