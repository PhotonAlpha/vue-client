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
import { getCommentReactions, addCommentReaction, deleteCommentReaction } from '@/api/githubApi'

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
      reactions: [],
      loading: null
    }
  },
  computed: {
    commenterProfile() {
      return this.$store.getters.commenterDetails
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
      const reactions = []
      for (const k in gemoji) {
        reactions.push({ content: k, user: { login: '', isCurrent: false }, amount: 0 })
      }
      getCommentReactions(this.id).then(response => {
        // console.log('getCommentReactions', response)
        const loginUser = 'ethan-creed' // this.$store.getters.name
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
        // console.log('final reaction', reactions)
        this.reactions = reactions
      })
    },
    handleCheckedChange(value, item) {
      if (!this.commenterProfile.avatar_url) {
        this.$message({
          showClose: true,
          dangerouslyUseHTMLString: true,
          type: 'warning',
          message: `<i class="fa-3x fas fa-dragon"></i>  ${this.$t('messgae.loginWarning')}！`
        })
        return
      }
      // console.log('checkboxGroup1', value, item)
      this.loading = this.$loading({ lock: true, text: 'Loading' })
      if (value) {
        item.amount += 1
        addCommentReaction(this.id, { content: item.content }).then(response => {
          // console.log('addCommentReaction', response)
          const { id, user } = response
          item.id = id
          item.user = user
        })
          .catch(error => {
            this.loading.close()
            console.log('addCommentReaction encounter error:', error)
            this.$message({
              message: `${this.$t('messgae.unknownError')}`,
              type: 'error'
            })
          }).finally(() => this.loading.close())
        // this.$emit('commitReaction', { type: 'addReaction', reactionId: item.id, commentId: this.id, content: item.content })
      } else {
        item.amount -= 1
        deleteCommentReaction(this.id, item.id).then(response => {
          // console.log('removeReaction', response)
        })
          .catch(error => {
            this.loading.close()
            console.log('deleteCommentReaction encounter error:', error)
            this.$message({
              message: `${this.$t('messgae.unknownError')}`,
              type: 'error'
            })
          }).finally(() => this.loading.close())
        // this.$emit('commitReaction', { type: 'removeReaction', reactionId: item.id, commentId: this.id, content: item.content })
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

