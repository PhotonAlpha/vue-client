<template>
  <common-list :category-name="categoryName" />
</template>

<script>
import CommonList from '@/views/common-list'

export default {
  name: 'React',
  components: {
    CommonList
  },
  data() {
    return {
      categoryName: 'ReactJS'
    }
  }
}
</script>

