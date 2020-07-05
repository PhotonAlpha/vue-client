<template>
  <el-row style="margin-top: 100px;" type="flex" justify="center">
    <el-col class="loader">
      <span />
      <span />
      <span />
      <span />
    </el-col>
    <div class="loading-position">Loading</div>
  </el-row>
</template>
<script>
import { authGithub } from '@/api/githubApi'
import { decrypt } from '@/utils/aes'

export default {
  name: 'Authorization',
  data() {
    return {
      size: '40px'
    }
  },
  computed: {
    innerStyles() {
      const size = parseInt(this.size)
      return {
        transform: 'scale(' + (size / 164) + ')'
      }
    },
    styles() {
      return {
        width: this.size,
        height: this.size
      }
    }
  },
  created() {
    const sha = this.$route.query.hash
    const code = this.$route.query.code
    // console.log('hash', sha)
    // console.log('code', code)
    if (!sha || !code) {
      this.$router.push({ path: '404' })
    } else {
      const clientId = process.env.VUE_APP_CLIENT_ID
      const clientSecret = process.env.VUE_APP_CLIENT_SECRET

      const cookendClientId = decrypt(clientId)
      const cookendClientSecret = decrypt(clientSecret)
      // console.log('cookend_client_id', cookendClientId)
      // console.log('cookend_client_secret', cookendClientSecret)

      const params = { code: code, client_id: cookendClientId, client_secret: cookendClientSecret }
      authGithub(params).then(response => {
        // console.log('response', response)
        // response.data = 'error=bad_verification_code&error_description=The+code+passed+is+incorrect+or+expired.&error_uri=https%3A%2F%2Fdeveloper.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-oauth-app-access-token-request-errors%2F%23bad-verification-code'
        const queryParams = new URLSearchParams(response.data)
        const errorMsg = queryParams.get('error')
        // console.log('queryParams', queryParams)
        const accessToken = queryParams.get('access_token')
        // console.log('accessToken', accessToken, errorMsg)
        if (accessToken) {
          this.$store.dispatch('user/setCommenterToken', accessToken).then(res => {
            this.$message({
              message: `${this.$t('login.successful')}`,
              type: 'success'
            })
            this.$store.dispatch('user/getCommenterInfo')
            this.$router.push({ name: 'spring-details', params: { sha: sha }})
          })
        } else if (errorMsg) {
          this.$router.push({ path: '/' })
          this.$message({
            message: `${this.$t('login.loginError')}${errorMsg}`,
            type: 'error'
          })
        } else {
          this.$message({
            message: `${this.$t('login.unknownError')}${errorMsg}`,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-position {
  right: 200px;
  position: relative;
  z-index: 10;
  top: 160px;
}
.loader {
  position: relative;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: linear-gradient(#f07e6e, #84cdfa, #5ad1cd);
  animation: animate 1.2s linear infinite;
}

@keyframes animate {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
}

.loader span {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(#f07e6e, #84cdfa, #5ad1cd);
}

.loader span:nth-child(1) {
  filter: blur(5px);
}

.loader span:nth-child(2) {
  filter: blur(10px);
}

.loader span:nth-child(3) {
  filter: blur(25px);
}

.loader span:nth-child(4) {
  filter: blur(50px);
}

.loader:after {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: #f1f1f1;
  border: solid white 10px;
  border-radius: 50%;
}

</style>
