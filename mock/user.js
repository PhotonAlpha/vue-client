
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const userInfo = {
  'login': 'PhotonAlpha',
  'id': 5266946,
  'node_id': 'MDQ6VXNlcjUyNjY5NDY=',
  'avatar_url': 'https://avatars0.githubusercontent.com/u/5266946?v=4',
  'gravatar_id': '',
  'url': 'https://api.github.com/users/PhotonAlpha',
  'html_url': 'https://github.com/PhotonAlpha',
  'followers_url': 'https://api.github.com/users/PhotonAlpha/followers',
  'following_url': 'https://api.github.com/users/PhotonAlpha/following{/other_user}',
  'gists_url': 'https://api.github.com/users/PhotonAlpha/gists{/gist_id}',
  'starred_url': 'https://api.github.com/users/PhotonAlpha/starred{/owner}{/repo}',
  'subscriptions_url': 'https://api.github.com/users/PhotonAlpha/subscriptions',
  'organizations_url': 'https://api.github.com/users/PhotonAlpha/orgs',
  'repos_url': 'https://api.github.com/users/PhotonAlpha/repos',
  'events_url': 'https://api.github.com/users/PhotonAlpha/events{/privacy}',
  'received_events_url': 'https://api.github.com/users/PhotonAlpha/received_events',
  'type': 'User',
  'site_admin': false,
  'name': 'killua',
  'company': null,
  'blog': '',
  'location': 'china',
  'email': '411084090@qq.com',
  'hireable': null,
  'bio': " I'm a java developer. Welcome to my galaxy!",
  'twitter_username': null,
  'public_repos': 20,
  'public_gists': 0,
  'followers': 1,
  'following': 1,
  'created_at': '2013-08-20T04:24:48Z',
  'updated_at': '2020-06-22T11:56:23Z',
  'private_gists': 0,
  'total_private_repos': 1,
  'owned_private_repos': 1,
  'disk_usage': 268166,
  'collaborators': 0,
  'two_factor_authentication': false,
  'plan': {
    'name': 'free',
    'space': 976562499,
    'collaborators': 0,
    'private_repos': 10000
  }
}

export default [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user',
    type: 'get',
    response: config => {
      console.log('config', config)
      const { token } = config.query
      const info = users[token]
      console.log('info', info)
      // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }

      return userInfo
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
