<template>
  <blog :content="content" :current-issue="currentIssue" @commitComment="commitComment" @sign="sign" />
</template>

<script>
import Blog from '@/components/Blog'
import { getBlog, getIssues, getComments } from '@/api/githubApi'
import { CURRENT_TITLE } from '@/utils'
import { COMMENTER_TOKEN_KEY } from '@/utils/auth'

export default {
  name: 'Details',
  components: {
    Blog
  },
  data() {
    return {
      content: '',
      currentIssue: {}
    }
  },
  created() {
    const sha = this.$route.params.sha
    this.getBlogDetails(sha)
    this.initIssues()
  },
  updated() {
    const select = document.querySelector('#markdown-content')
    if (select) {
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
    }
  },
  methods: {
    getBlogDetails(sha) {
      getBlog(sha).then(response => {
        console.log('blog', response)
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
    },
    initIssues() {
      const currentTitle = localStorage.getItem(CURRENT_TITLE)
      getIssues().then(response => {
        console.log('get issues', response, currentTitle)
        if (response && Array.isArray(response)) {
          this.currentIssue = response.find(item => item.title === currentTitle)
          console.log('no', this.currentIssue)
        }
      })
        .catch(err => console.log(err))
        .finally(() => {
          if (this.currentIssue) {
            this.initComments(this.currentIssue.number)
          }
        })
    },
    initComments(issueNo) {
      if (issueNo) {
        getComments(issueNo).then(response => {
          console.log('get Comments response', response)
          this.currentIssue = { ...this.currentIssue, comments: response }
          console.log('get Comments', this.currentIssue)
        })
          .catch(err => console.log(err))
      }
    },
    commitComment(val) {
      const token = sessionStorage.getItem(COMMENTER_TOKEN_KEY)

      console.log('details commit', val, COMMENTER_TOKEN_KEY)
    },
    sign(action) {
      console.log('signUp start', action)
      if (action === 'signin') {
        this.$store.dispatch('user/setCommenterToken', '86954e4ca08987864a0527f5412ec90455bfcb2d')
      } else if (action === 'signout') {
        this.$store.dispatch('user/logout')
      }
    }
  }
}
</script>
