<template>
  <div style="margin-top: 20px;">
    <el-checkbox-group v-model="checkboxGroup1">
      <el-checkbox-button v-for="item in reactions" :key="item.id" :label="item.content" @change="handleCheckedChange($event, item)">
        <span class="box-image-font">{{ getemoji(item.content) }}</span>
        <!-- <el-image :fit="'contain'" class="box-image-icon" :src="getemoji(item.content)" /> -->
        <span class="box-image-font">{{ item.amount }}</span>
      </el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script>
import gemoji from '@/api/name-to-emoji'
import { getCommentReactions } from '@/api/githubApi'

const cityOptions = ['上海', '北京', '广州', '深圳']

export default {
  name: 'Reaction',
  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      checkboxGroup1: [],
      cities: cityOptions,
      reactions: []
    }
  },
  created() {
    this.initReactions()
  },
  methods: {
    getemoji(name) {
      return gemoji[name]
    },
    initReactions() {
      getCommentReactions(this.id).then(response => {
        console.log('getCommentReactions', response)
        const loginUser = 'ethan-creed' // this.$store.getters.name
        const reactions = []
        response.forEach(element => {
          let reaction = reactions.find(item => item.content === element.content)
          const isCurrentUser = loginUser === element.user.login
          if (reaction) {
            reaction.amount += 1
          } else {
            reaction = { id: element.id, content: element.content, user: { login: element.user.login, isCurrent: false }, amount: 1 }
            reactions.push(reaction)
          }
          if (isCurrentUser) {
            reaction.id = element.id
            reaction.user.isCurrent = true
            reaction.user.login = loginUser
            this.checkboxGroup1.push(element.content)
          }
        })
        console.log('final reaction', reactions)
        this.reactions = reactions
      })
    },
    handleCheckedChange(value, item) {
      console.log('checkboxGroup1', value, item)
      if (value) {
        item.amount += 1
      } else {
        item.amount -= 1
      }
    }
  }
}
</script>
<style lang="scss">
.box-image-icon {
  height: 18px;
  width: 18px;
}
.box-image-font {
  vertical-align: super;
  font-size: medium;
}
</style>

