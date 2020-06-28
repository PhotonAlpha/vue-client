<template>
  <blog :content="content" />
</template>

<script>
import Blog from '@/components/Blog'
import { getBlog } from '@/api/githubApi'

export default {
  name: 'Details',
  components: {
    Blog
  },
  data() {
    return {
      content: ''
    }
  },
  created() {
    const sha = this.$route.params.sha
    this.getBlogDetails(sha)
  },
  updated() {
    const select = document.querySelector('#markdown-content')
    const anchors = Array.from(select.querySelectorAll('h1,h2,h3,h4,h5,h6'))
    // console.log('anchors', anchors)
    const anchorsVal = []
    for (const item of anchors) {
      // console.log('ancher', item)
      anchorsVal.push(this.treeDecoration(item))
    }
    this.$store.dispatch('app/setPostDirectory', anchorsVal).then(() => {
      this.$message({
        message: `发布目录成功`,
        type: 'success'
      })
    })
  },
  methods: {
    getBlogDetails(sha) {
      getBlog(sha).then(response => {
        this.content = response.content
      })
    },
    treeDecoration(item) {
      const level = item.tagName.substring(1, 2)
      let content = item.innerHTML
      if (level > 1) {
        content = '-\u00a0' + content
        for (var i = 0; i < level - 1; i++) {
          content = '\u00a0\u00a0' + content
        }
      }
      // console.log('content:', content)
      return { label: content, element: item }
    }
  }
}
</script>
