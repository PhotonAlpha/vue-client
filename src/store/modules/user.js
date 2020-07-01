import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getCommenterToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    commenterToken: getCommenterToken(),
    token: getToken(),
    name: '',
    avatar: '',
    details: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_DETAILS: (state, details) => {
    state.details = details
  },
  SET_COMMENTER_TOKEN: (state, token) => {
    state.commenterToken = token
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

  // get user info
  getInfo({ commit, state }) {
    console.log('getInfo state', state)
    return new Promise((resolve, reject) => {
      getInfo(state.commenterToken).then(response => {
        console.log('getInfo', response)
        const { login, avatar_url } = response

        if (!login) {
          reject('Verification failed, please Login again.')
        }

        commit('SET_NAME', login)
        commit('SET_AVATAR', avatar_url)
        commit('SET_DETAILS', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
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

