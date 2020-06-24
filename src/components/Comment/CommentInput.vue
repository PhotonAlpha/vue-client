<template>
  <div class="editor-container">
    <markdown-editor ref="markdownEditor" v-model="content" :language="language" :options="{hideModeSwitch:false,previewStyle:'tab'}" />
    <el-row style="padding-top: 10px;" type="flex" justify="space-between">
      <el-tag type="success">Styling with Markdown is supported</el-tag>
      <el-col :span="5" style="text-align: right;"><el-button type="primary" @click="getComment()">Comment</el-button></el-col>
    </el-row>
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
    language() {
      console.log('current language', this.languageTypeList[this.$store.getters.language])
      return this.languageTypeList[this.$store.getters.language]
    }
  },
  methods: {
    getComment() {
      this.html = this.$refs.markdownEditor.getValue()
      console.log('val:', this.html)
    }
  }
}
</script>
<style lang="scss" scoped>
.editor-container{
  margin-bottom: 30px;
}
.tag-title{
  margin-bottom: 5px;
}
</style>
