<template>
  <blog :content="content" />
</template>

<script>
import Blog from '@/components/Blog'
import { getReadme } from '@/api/githubApi'

const options = {
  lock: true,
  text: 'Loading'
}

export default {
  name: 'AboutApp',
  components: {
    Blog
  },
  data() {
    return {
      content: ''
    }
  },
  updated() {
    const select = document.querySelector('#markdown-content')
    if (select) {
      const anchors = Array.from(select.querySelectorAll('h1,h2,h3,h4,h5,h6'))
      console.log('anchors', anchors)
      const anchorsVal = []
      for (const item of anchors) {
        // console.log('ancher', item)
        anchorsVal.push(this.treeDecoration(item))
      }
      this.$store.dispatch('app/setPostDirectory', anchorsVal)
    }
  },
  created() {
    this.initReadme()
  },
  methods: {
    initReadme() {
      this.loading = this.$loading(options)
      getReadme().then(response => {
        this.content = response.content
      })
        .catch(error => {
          console.log('initReadme', error)
          this.loading.close()
        })
        .finally(() => this.loading.close())
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

<style lang="scss">

</style>
