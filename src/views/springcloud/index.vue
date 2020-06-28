<template>
  <common-list :category-name="categoryName" />
</template>

<script>
import CommonList from '@/views/common-list'

export default {
  name: 'Springcloud',
  components: {
    CommonList
  },
  data() {
    return {
      categoryName: 'SpringCloud'
    }
  }
}
</script>

