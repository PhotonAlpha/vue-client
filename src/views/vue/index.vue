<template>
  <common-list :category-name="categoryName" />
</template>

<script>
import CommonList from '@/views/common-list'

export default {
  name: 'Vue',
  components: {
    CommonList
  },
  data() {
    return {
      categoryName: 'Vue'
    }
  }
}
</script>

