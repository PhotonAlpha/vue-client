<template>
  <timeline :total-num="blogItems.length" :tree="blogItemsPagination" @getPageNum="handleSizeChange" />
</template>

<script>
import { mapGetters } from 'vuex'
import Timeline from '@/components/Timeline'
import { reconstructorTitle } from '@/utils'

export default {
  name: 'Dashboard',
  components: {
    Timeline
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

  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    // this.fetchMasterTrees()
    this.fetchBlogTrees('5b790722441620896bc7238a0aefba2650005ccb')
  },
  methods: {
    fetchMasterTrees() {
      this.$store.dispatch('githubApi/getMasterTreeItems').then(() => {
        console.log('fetchMasterTrees', this.$store.getters.masterTreeItems)
        this.masterTreeItems = this.$store.getters.masterTreeItems
        if (this.masterTreeItems.tree && Array.isArray(this.masterTreeItems.tree)) {
          const array = ['navigation']
          this.pendingItems = this.masterTreeItems.tree.filter(item => array.includes(item.path))
          // console.log('this.pendingItems', this.pendingItems)
          this.pendingItems.forEach(element => {
            this.fetchNodeTreeItems(element.sha)
          })
        }
      })
    },
    fetchNodeTreeItems(sha) {
      this.$store.dispatch('githubApi/getNodeTreeItems', sha).then(() => {
        const result = this.$store.getters.nodeTreeItems
        console.log('result', result)
        if (result.tree) {
          this.nodeTreeItems = this.nodeTreeItems.concat(result.tree)
          // console.log('this.nodeTreeItems', this.nodeTreeItems)
        }
      })
    },
    fetchBlogTrees(sha) {
      this.$store.dispatch('githubApi/getNodeTreeItems', sha).then(() => {
        const result = this.$store.getters.nodeTreeItems
        console.log('fetchBlogTrees', result)
        if (result.tree) {
          this.blogItems = reconstructorTitle(result.tree)
          console.log('this.blogItems', this.blogItems)
          this.blogItemsPagination = this.blogItems.slice(0, 10)
        }
      })
    },
    handleSizeChange(val) {
      // console.log('handleSizeChange', val)
      const start = (val - 1) * 10
      const end = val * 10
      this.blogItemsPagination = this.blogItems.slice(start, end)
      // console.log('this.blogItemsPagination', this.blogItemsPagination)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
