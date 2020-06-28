<template>
  <common-list :category-name="categoryName" />
</template>

<script>
import CommonList from '@/views/common-list'

export default {
  name: 'Springboot',
  components: {
    CommonList
  },
  data() {
    return {
      categoryName: 'SpringBoot'
    }
  }
}
</script>

