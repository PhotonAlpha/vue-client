<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in tree"
        :key="index"
        :timestamp="handlerDateFormatSlash(item.date)"
        :size="handlerColor(index).size"
        :type="handlerColor(index).type"
        :icon="handlerColor(index).icon"
        :color="handlerColor(index).color"
        placement="top"
      >
        <el-card>
          <el-link :underline="false" @click="showDetails(item.sha)"><h4>{{ item.name }}</h4></el-link>
          <p><i class="el-icon-date" /> {{ handlerDateFormat(item.date) }}</p>
        </el-card>
      </el-timeline-item>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="handleCurrentChange"
      />
    </el-timeline></div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'Timeline',
  props: {
    tree: {
      type: Array,
      default() {
        return []
      }
    },
    totalNum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    showDetails(sha) {
      console.log('showDetails', sha)
      this.$router.push({ name: 'spring-details', params: { sha: '348f439d9ed283201b9cc190124edb9318f8f068' }})
    },
    handleCurrentChange(val) {
      this.$emit('getPageNum', val)
    },
    handlerDateFormat(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD')
    },
    handlerDateFormatSlash(timestamp) {
      return moment(timestamp).format('YYYY/MM/DD')
    },
    handlerColor(index) {
      if (index === 0) {
        return { icon: 'el-icon-more', size: 'large', type: 'primary' }
      } else if (index === 1) {
        return { icon: 'el-icon-star-on', size: 'large', type: 'primary' }
      } else if (index === 2) {
        return { size: 'large', type: 'warning' }
      } else {
        return { color: '#0bbd87', size: 'normal' }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.block {
  padding-top: 30px;
  background: #fff;
}
</style>
