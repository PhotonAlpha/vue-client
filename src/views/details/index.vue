<template>
  <blog
    :content="content"
    :current-issue="currentIssue"
    @commitComment="handlerCommitComment"
    @sign="sign"
  />
</template>

<script>
import Blog from '@/components/Blog'
import { getBlog, getIssues, getComments, createIssue, addComment } from '@/api/githubApi'
import { CURRENT_TITLE } from '@/utils'
import { COMMENTER_TOKEN_KEY, AUTHURL } from '@/utils/auth'

const options = {
  lock: true,
  text: 'Loading'
}

export default {
  name: 'Details',
  components: {
    Blog
  },
  data() {
    return {
      content: '',
      currentIssue: {},
      loading: null
    }
  },
  created() {
    const sha = this.$route.params.sha
    this.getBlogDetails(sha)
    this.initIssues()
  },
  destroyed() {
    if (this.loading) {
      this.loading.close()
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
  methods: {
    getBlogDetails(sha) {
      this.loading = this.$loading(options)
      getBlog(sha).then(response => {
        // console.log('blog', response)
        this.content = response.content
      })
        .catch(error => {
          console.log('getBlogDetails', error)
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
    },
    initIssues() {
      const currentTitle = localStorage.getItem(CURRENT_TITLE)
      getIssues().then(response => {
        // console.log('get issues', response, currentTitle)
        if (response && Array.isArray(response)) {
          this.currentIssue = response.find(item => item.title === currentTitle)
          // console.log('no', this.currentIssue)
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
    addCommentEvent(issueId, html) {
      const data = { body: html }
      this.loading = this.$loading(options)
      addComment(issueId, data).then(response => {

      })
        .catch(error => {
          console.log('addComment encounter error:', error)
          this.loading.close()
          this.$message({
            message: `${this.$t('messgae.unknownError')}`,
            type: 'error'
          })
        }).finally(() => {
          this.initIssues()
          this.loading.close()
        })
    },
    handlerCommitComment(val) {
      const token = sessionStorage.getItem(COMMENTER_TOKEN_KEY)
      // 如果存在 添加issue
      if (val.html && val.issueId) {
        console.log('issue 存在', val)
        this.addCommentEvent(val.issueId, val.html)
      } else if (val.html) {
        console.log('issue 不存在', val)
        // 如果不存在主题，创建并添加注释
        const currentTitle = localStorage.getItem(CURRENT_TITLE)
        createIssue({ title: currentTitle, body: currentTitle }).then(response => {
          const { number } = response
          this.addCommentEvent(number, val.html)
        })
          .catch(error => {
            console.log('createIssue encounter error:', error)
            this.$message({
              message: `${this.$t('messgae.unknownError')}`,
              type: 'error'
            })
          })
      } else {
        this.$message({
          message: `${this.$t('messgae.unknownError')}`,
          type: 'error'
        })
      }
      console.log('details commit', val, token)
    },
    sign(action) {
      console.log('signUp start', action)
      if (action === 'signin') {
        const sha = this.$route.params.sha
        console.log('sha', sha)
        const authPath = AUTHURL + '?hash=' + sha
        console.log(authPath)
        window.location.href = authPath
        // this.$store.dispatch('user/setCommenterToken', '86954e4ca08987864a0527f5412ec90455bfcb2d')
      } else if (action === 'signout') {
        this.$store.dispatch('user/logout')
      }
    }
  }
}
</script>
