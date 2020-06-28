import { getMasterTrees, getDestinationTrees, getIssues, getComments, createIssue, getBlog } from '@/api/githubApi'

const state = {
  masterTreeItems: {},
  nodeTreeItems: [],
  issues: [],
  comments: [],
  comment: {},
  blog: {}
}

const mutations = {
  SET_MASTER_TREES: (state, masterTreeItems) => {
    state.masterTreeItems = masterTreeItems
  },
  SET_NODE_TREE: (state, nodeTreeItems) => {
    state.nodeTreeItems = nodeTreeItems
  },
  SET_ISSUES: (state, issues) => {
    state.issues = issues
  },
  SET_COMMENTS: (state, comments) => {
    state.comments = comments
  },
  // TODO
  SET_COMMENT: (state, comment) => {
    state.comment = comment
  },
  SET_BLOG: (state, blog) => {
    state.blog = blog
  }
}

const actions = {
  getMasterTreeItems({ commit }) {
    return new Promise((resolve, reject) => {
      getMasterTrees().then(response => {
        // console.log('getMasterTreeItems', data)
        commit('SET_MASTER_TREES', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getNodeTreeItems({ commit }, tree_sha) {
    return new Promise((resolve, reject) => {
      getDestinationTrees(tree_sha).then(response => {
        // console.log('getNodeTreeItems', data, tree_sha)
        commit('SET_NODE_TREE', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getIssues({ commit }) {
    return new Promise((resolve, reject) => {
      getIssues().then(response => {
        // console.log('getIssues', data)
        commit('SET_COMMENT', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getComments({ commit }, issue_id) {
    return new Promise((resolve, reject) => {
      getComments(issue_id).then(response => {
        // console.log('getComments', data)
        commit('SET_NODE_TREE', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  createIssue({ commit }, data) {
    return new Promise((resolve, reject) => {
      createIssue(data).then(response => {
        // console.log('createIssue', data)
        commit('SET_COMMENT', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getBlog({ commit }, sha) {
    return new Promise((resolve, reject) => {
      getBlog(sha).then(response => {
        // console.log('createIssue', data)
        commit('SET_BLOG', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

