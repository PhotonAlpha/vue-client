import request from '@/utils/request'

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
// 创建issue,用作评论栏
export function createIssue(data) {
  return request({
    url: `/repos/PhotonAlpha/blogs/issues`,
    method: 'post',
    data
  })
}
