import { login, getInfo, getCommenterInfo } from '@/api/user'
import { getToken, setToken, removeToken, getCommenterToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    commenterToken: getCommenterToken(),
    token: getToken(),
    name: '',
    avatar: '',
    details: {},
    commenterDetails: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 博主信息
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_DETAILS: (state, details) => {
    state.details = details
  },
  // 评论着的信息
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_COMMENTER_TOKEN: (state, token) => {
    state.commenterToken = token
  },
  SET_COMMENTER_DETAILS: (state, data) => {
    state.commenterDetails = data
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setCommenterToken({ commit }, token) {
    setToken(token)
    commit('SET_COMMENTER_TOKEN', token)
  },
  // 获取博主账户信息
  getInfo({ commit, state }) {
    // console.log('getInfo state', state)
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        // console.log('getInfo', response)
        const { login } = response

        if (!login) {
          reject('Verification failed, please Login again.')
        }

        commit('SET_NAME', login)
        commit('SET_DETAILS', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取评论登录者的账户信息
  getCommenterInfo({ commit, state }) {
    console.log('getCommenterInfo state', state)
    return new Promise((resolve, reject) => {
      getCommenterInfo(state.commenterToken).then(response => {
        console.log('getCommenterInfo', response)
        const { avatar_url } = response

        commit('SET_AVATAR', avatar_url)
        commit('SET_COMMENTER_DETAILS', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

