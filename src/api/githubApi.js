import axios from 'axios'
import request from '@/utils/request'
import requestcommenter from '@/utils/request-commenter'

// 查询readme
export function getReadme() {
  return request({
    url: '/repos/PhotonAlpha/blogs/readme',
    method: 'get'
  })
}

// 查询父master的结构
export function getMasterTrees(params) {
  return request({
    url: '/repos/PhotonAlpha/blogs/git/trees/master',
    method: 'get',
    params
  })
}

// 查询子node的结构
export function getDestinationTrees(tree_sha) {
  return request({
    url: `/repos/PhotonAlpha/blogs/git/trees/${tree_sha}`,
    method: 'get'
  })
}
// 获取issue列表
export function getIssues() {
  return request({
    url: `/repos/PhotonAlpha/blogs/issues`,
    method: 'get'
  })
}
// 获取评论列表
export function getComments(issue_id) {
  return request({
    url: `/repos/PhotonAlpha/blogs/issues/${issue_id}/comments`,
    method: 'get'
  })
}

// 查询日志内容
export function getBlog(sha) {
  return request({
    url: `/repos/PhotonAlpha/blogs/git/blobs/${sha}`,
    method: 'get'
  })
}

// 查询日志内容
export function getCommentReactions(commentId) {
  return request({
    url: `/repos/PhotonAlpha/blogs/issues/comments/${commentId}/reactions`,
    headers: { Accept: 'application/vnd.github.squirrel-girl-preview' },
    method: 'get'
  })
}

// 查询日志内容
export function authGithub(params) {
  // create an axios instance
  const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
  })
  return service({
    url: `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token`,
    method: 'post',
    params
  })
}

// 创建issue,用作评论栏
export function createIssue(data) {
  return request({
    url: `/repos/PhotonAlpha/blogs/issues`,
    method: 'post',
    data
  })
}

// 添加评论
export function addComment(issueId, data) {
  return requestcommenter({
    url: `/repos/PhotonAlpha/blogs/issues/${issueId}/comments`,
    method: 'post',
    data
  })
}
// 添加reaction, add header Accept application/vnd.github.squirrel-girl-preview+json
export function addCommentReaction(commentId, data) {
  return requestcommenter({
    url: `/repos/PhotonAlpha/blogs/issues/comments/${commentId}/reactions`,
    method: 'post',
    headers: { Accept: 'application/vnd.github.squirrel-girl-preview+json' },
    data
  })
}

// 删除reaction
export function deleteCommentReaction(commentId, reactionId) {
  return requestcommenter({
    url: `/repos/PhotonAlpha/blogs/issues/comments/${commentId}/reactions/${reactionId}`,
    method: 'delete',
    headers: { Accept: 'application/vnd.github.squirrel-girl-preview+json' }
  })
}
