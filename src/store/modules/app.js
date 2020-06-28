import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'

const state = {
  sidebar: {
    // 默认打开侧边栏
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  postDirectory: {},
  category: [],
  latestRecommend: []
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_POST_DIRECTORY: (state, data) => {
    state.postDirectory = data
  },
  SET_CATEGORY: (state, data) => {
    state.category = data
  },
  SET_LATEST_RECOMMEND: (state, data) => {
    state.latestRecommend = data
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setPostDirectory({ commit }, data) {
    commit('SET_POST_DIRECTORY', data)
  },
  setCategory({ commit }, data) {
    commit('SET_CATEGORY', data)
  },
  setLatestRecommend({ commit }, data) {
    commit('SET_LATEST_RECOMMEND', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
