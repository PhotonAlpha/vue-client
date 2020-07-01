<template>
  <timeline :total-num="blogItems.length" :tree="blogItemsPagination" @getPageNum="handleSizeChange" />
</template>

<script>
import Timeline from '@/components/Timeline'
import { reconstructorTitle } from '@/utils'
import { getMasterTrees, getDestinationTrees } from '@/api/githubApi'

export default {
  name: 'CommonList',
  components: {
    Timeline
  },
  props: {
    categoryName: {
      type: String,
      default: 'SpringBoot'
    }
  },
  data() {
    return {
      pendingItems: [],
      masterTreeItems: [],
      nodeTreeItems: [],
      blogItems: [],
      blogItemsPagination: []
    }
  },
  created() {
    this.cleanPostDirectory()
    this.initData()
  },
  methods: {
    async initData() {
      this.masterTreeItems = await this.fetchMasterTrees()
      if (this.masterTreeItems.tree && Array.isArray(this.masterTreeItems.tree)) {
        const array = ['navigation']
        this.pendingItems = this.masterTreeItems.tree.filter(item => array.includes(item.path))
        // console.log('this.pendingItems', this.pendingItems)
        for (const item of this.pendingItems) {
          const nodeTreeItems = await this.fetchNodeTreeItems(item.sha)
          if (nodeTreeItems.tree) {
            // 设置目录
            const cData = nodeTreeItems.tree.map(item => {
              return { label: item.path, url: item.url, sha: item.sha }
            })
            this.$store.dispatch('app/setCategory', cData)

            const finalResult = nodeTreeItems.tree.filter(item => item.path === this.categoryName && item.type === 'tree')
            this.nodeTreeItems = this.nodeTreeItems.concat(finalResult)
          }
        }
        // console.log('this.nodeTreeItems', this.nodeTreeItems)
        if (this.nodeTreeItems && this.nodeTreeItems.length > 0) {
          const blogTreeItems = await this.fetchNodeTreeItems(this.nodeTreeItems[0].sha)
          if (blogTreeItems && blogTreeItems.tree) {
            this.blogItems = reconstructorTitle(blogTreeItems.tree)
            console.log('this.blogItems', this.blogItems)
            // 前三个日志为推荐选项
            let recommended = this.blogItems.slice(0, 3)
            recommended = recommended.map(item => {
              return { ...item, title: this.categoryName }
            })
            this.$store.dispatch('app/setLatestRecommend', recommended)

            this.blogItemsPagination = this.blogItems.slice(0, 10)
          }
        }
      }
    },
    async fetchMasterTrees() {
      let result
      await getMasterTrees().then(response => {
        console.log('getMasterTrees', response)
        result = response
      })
        .catch(error => {
          console.log('error occur', error)
        })
      return result
    },
    async fetchNodeTreeItems(sha) {
      let result
      await getDestinationTrees(sha).then(response => {
        console.log('getDestinationTrees', response)
        result = response
      })
        .catch(error => {
          console.log('error occur', error)
        })
      return result
      // this.$store.dispatch('githubApi/getNodeTreeItems', sha).then(() => {
      //   const result = this.$store.getters.nodeTreeItems
      //   if (result.tree) {
      //     const finalResult = result.tree.filter(item => item.path === 'SpringBoot' && item.type === 'tree')
      //     this.nodeTreeItems = this.nodeTreeItems.concat(finalResult)
      //     console.log('this.nodeTreeItems', this.nodeTreeItems)
      //   }
      // })
    },
    handleSizeChange(val) {
      // console.log('handleSizeChange', val)
      const start = (val - 1) * 10
      const end = val * 10
      this.blogItemsPagination = this.blogItems.slice(start, end)
      // console.log('this.blogItemsPagination', this.blogItemsPagination)
    },
    cleanPostDirectory() {
      this.$store.dispatch('app/setPostDirectory', [])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
