<template>
  <div>
    <el-card v-if="anchor && anchor.length > 0" class="box-directory">
      <div slot="header">
        <span>Post Directory</span>
      </div>
      <div>
        <el-tree
          :data="anchor"
          :props="defaultProps"
          @node-click="handlePostClick"
        />
      </div>
    </el-card>
    <el-card v-if="recommend && recommend.length > 0" class="box-article">
      <div slot="header" class="item-title">
        <span>最新文章</span>
      </div>
      <el-collapse v-model="activeName" accordion>
        <template v-for="(item, index) in recommend">
          <el-collapse-item :key="index" :title="item.title" :name="'name'+index" class="item-header">
            <el-link :underline="false" @click="handleRecommendedClick(item)">
              <div>{{ item.name }}</div>
            </el-link>
            <div class="item-date">{{ handlerDateFormatSlash(item.date) }}</div>
          </el-collapse-item>
        </template>
      </el-collapse>
    </el-card>
    <el-card v-if="category && category.length > 0" class="box-card">
      <div slot="header">
        <span>分类</span>
      </div>
      <div>
        <el-tree
          :data="category"
          :props="defaultProps"
          :load="loadNode"
          lazy
          accordion
          @node-click="handleNodeClick"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ArchiveRight',
  data() {
    return {
      activeName: 'name0',
      defaultProps: {
        label: 'label'
      }
    }
  },
  computed: {
    anchor() {
      return this.$store.getters.postDirectory
    },
    category() {
      console.log('category', this.$store.getters.category)
      return this.$store.getters.category
    },
    recommend() {
      console.log('recommend', this.$store.getters.latestRecommend)
      return this.$store.getters.latestRecommend
    }
  },
  methods: {
    handleNodeClick(data) {
      this.$emit('handlerCategory', data)
    },
    handlePostClick(data) {
      console.log(data)
      this.$scrollTo(data.element, 500)
    },
    loadNode(node, resolve) {
      this.$emit('getCategoryList', node, resolve)
    },
    handlerDateFormatSlash(timestamp) {
      return moment(timestamp).format('YYYY/MM/DD')
    },
    handleRecommendedClick(data) {
      this.$emit('handlerCategory', { ...data, subItem: true })
    }
  }
}
</script>
<style lang="scss" scope>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700");

.item-title {
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
}
.item-header .el-collapse-item__header {
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
}

.item-date {
  color: #aaa;
  font-size: 13px;
  text-transform: uppercase;
}

</style>
<style lang="scss">
.box-directory {
  .el-card__body {
    padding: 0px
  }
  .el-tree-node__content {
    color: #337ab7;
    font-weight: bold;
  }
  .el-card__header {
    font-weight: bold;
    font-family: "Montserrat", sans-serif;
    padding-top: 1px;
    padding-bottom: 1px;
  }
}
.box-article{
  .el-collapse-item__header{
    color: #38b7ea;
  }
}
</style>
