const getters = {
  commenterToken: state => state.user.commenterToken,
  language: state => state.app.language,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  postDirectory: state => state.app.postDirectory,
  category: state => state.app.category,
  latestRecommend: state => state.app.latestRecommend,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  details: state => state.user.details,
  masterTreeItems: state => state.githubApi.masterTreeItems,
  nodeTreeItems: state => state.githubApi.nodeTreeItems,
  issues: state => state.githubApi.issues,
  comments: state => state.githubApi.comments,
  comment: state => state.githubApi.comment,
  blog: state => state.githubApi.blog
}
export default getters
