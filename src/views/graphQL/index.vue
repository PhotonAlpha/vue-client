<template>
  <common-list :category-name="categoryName" />
</template>

<script>
import CommonList from '@/views/common-list'

export default {
  name: 'GraphQL',
  components: {
    CommonList
  },
  data() {
    return {
      categoryName: 'GraphQL'
    }
  }
}
</script>

