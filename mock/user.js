
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
  'login': 'ethan-creed',
  'id': 57406646,
  'node_id': 'MDQ6VXNlcjU3NDA2NjQ2',
  'avatar_url': 'https://avatars2.githubusercontent.com/u/57406646?v=4',
  'gravatar_id': '',
  'url': 'https://api.github.com/users/ethan-creed',
  'html_url': 'https://github.com/ethan-creed',
  'followers_url': 'https://api.github.com/users/ethan-creed/followers',
  'following_url': 'https://api.github.com/users/ethan-creed/following{/other_user}',
  'gists_url': 'https://api.github.com/users/ethan-creed/gists{/gist_id}',
  'starred_url': 'https://api.github.com/users/ethan-creed/starred{/owner}{/repo}',
  'subscriptions_url': 'https://api.github.com/users/ethan-creed/subscriptions',
  'organizations_url': 'https://api.github.com/users/ethan-creed/orgs',
  'repos_url': 'https://api.github.com/users/ethan-creed/repos',
  'events_url': 'https://api.github.com/users/ethan-creed/events{/privacy}',
  'received_events_url': 'https://api.github.com/users/ethan-creed/received_events',
  'type': 'User',
  'site_admin': false,
  'name': null,
  'company': null,
  'blog': '',
  'location': null,
  'email': null,
  'hireable': null,
  'bio': null,
  'twitter_username': null,
  'public_repos': 2,
  'public_gists': 0,
  'followers': 0,
  'following': 0,
  'created_at': '2019-11-05T15:32:38Z',
  'updated_at': '2020-07-01T07:11:52Z'
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
