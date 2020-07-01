<template>
  <common-list :category-name="categoryName" />
</template>

<script>
import CommonList from '@/views/common-list'

export default {
  name: 'Docker',
  components: {
    CommonList
  },
  data() {
    return {
      categoryName: 'Docker'
    }
  }
}
</script>

