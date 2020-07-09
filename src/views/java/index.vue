<template>
  <common-list :category-name="categoryName" />
</template>

<script>
import CommonList from '@/views/common-list'

export default {
  name: 'Java',
  components: {
    CommonList
  },
  data() {
    return {
      categoryName: 'Java'
    }
  }
}
</script>

