<template>
  <div class="editor-container">
    <markdown-editor ref="markdownEditor" v-model="content" :language="language" :options="{hideModeSwitch:false,previewStyle:'tab'}" />
    <template v-if="avatar">
      <el-row style="padding-top: 10px;" type="flex" justify="space-between">
        <el-tag type="success">Styling with Markdown is supported</el-tag>
        <el-col :span="5" style="text-align: right;"><el-button type="primary" @click="getComment()">Comment</el-button></el-col>
      </el-row>
    </template>
    <template v-else>
      <el-alert
        class="alter-login"
        title="Login with GitHub to join this conversation"
        type="success"
        show-icon
        :closable="false"
      >
        <el-button type="primary" round size="mini" @click="signin()">Sign in</el-button>
      </el-alert>
    </template>
  </div>
</template>
<script>
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  name: 'CommentInput',
  components: { MarkdownEditor },
  data() {
    return {
      content: ``,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh-CN'
      }
    }
  },
  computed: {
    avatar() {
      const token = this.$store.getters.commenterToken
      if (token) {
        this.$store.dispatch('user/getInfo')
      }
      return this.$store.getters.avatar
    },
    language() {
      console.log('current language', this.languageTypeList[this.$store.getters.language])
      return this.languageTypeList[this.$store.getters.language]
    }
  },
  methods: {
    getComment() {
      const html = this.$refs.markdownEditor.getValue()
      this.$emit('commitComment', html)
    },
    signin() {
      this.$emit('sign', 'signin')
    }
  }
}
</script>
<style lang="scss">
.editor-container{
  margin-bottom: 30px;
}
.tag-title{
  margin-bottom: 5px;
}
.alter-login {
  .el-alert__content {
    width: 100%;
  }
  .el-alert__description {
    float: right;
  }
}
</style>
