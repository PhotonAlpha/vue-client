<template>
  <section>
    <el-row type="flex" justify="center">
      <el-col :xs="22" :sm="22" :md="22" :lg="18" :xl="18">
        <vue-navigation-bar
          :options="routes"
          @vnb-item-clicked="vnbItemClicked"
        />

      </el-col>
      <el-col :span="1" style="margin: auto 0px;">
        <!-- 设置多语言 -->
        <lang-select class="right-menu-item hover-effect" />
      </el-col>

      <el-dropdown :span="1" style="margin: auto 0px;">
        <span class="el-dropdown-link">
          <el-avatar class="fa-spin" :size="50" :src="avatar+'?imageView2/1/w/80/h/80'" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import { generateTitle } from '@/utils/i18n'
import path from 'path'
import { isExternal } from '@/utils/validate'
import LangSelect from '@/components/LangSelect' // 多语言

export default {
  components: {
    LangSelect
  },
  data() {
    return {
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    routes() {
      const rawRoutes = this.$router.options.routes
      // console.log('rawRoutes', rawRoutes)
      const menuOptionsLeft = []
      if (rawRoutes) {
        rawRoutes.filter(item => !item.hidden).forEach(item => this.combination(item, menuOptionsLeft))
      }
      return {
        elementId: 'main-navbar',
        isUsingVueRouter: true,
        mobileBreakpoint: 993,
        brandImagePath: './',
        brandImage: require('@/assets/images/brave.svg'),
        brandImageAltText: 'brand-image',
        collapseButtonImageOpen: require('@/assets/images/collapse-menu-dark.png'),
        collapseButtonImageClose: require('@/assets/images/times.png'),
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: 'Main Navigation',
        tooltipAnimationType: 'shift-away',
        menuOptionsLeft: menuOptionsLeft
      }
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    }
  },
  methods: {
    generateTitle,
    combination(item, menuOptionsLeft = []) {
      const oneShowingChild = this.hasOneShowingChildEvent(item.children, item)
      const oneShow = oneShowingChild.hasOneShowingChild &&
        (!oneShowingChild.onlyOneChild.children || oneShowingChild.onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      const oneChild = oneShowingChild.onlyOneChild
      if (oneShow && oneChild.meta) {
        // console.log('oneShowingChild', oneChild)
        menuOptionsLeft.push(this.singlePathMetaData(oneChild, item.path))
      } else {
        const subMenuOptions = []
        if (item.children) {
          item.children
            .filter(child => !child.hidden)
            .forEach(child => subMenuOptions.push(this.singlePathMetaData(child, item.path)))
        }
        menuOptionsLeft.push({ type: 'link', text: this.generateTitle(item.meta.title), subMenuOptions: subMenuOptions, iconLeft: `<i class="${item.meta.icon || 'fas fa-tachometer-alt'}"></i>` })
      }
      // console.log('item', item)
      // console.log('menuOptionsLeft', menuOptionsLeft)
      return menuOptionsLeft
    },
    singlePathMetaData(item = { path: '/' }, basePath) {
      return {
        type: 'link',
        text: this.generateTitle(item.meta.title),
        path: this.resolvePath(item.path, basePath),
        iconLeft: `<i class="${item.meta.icon || 'fas fa-tachometer-alt'}"></i>`
      }
    },
    hasOneShowingChildEvent(children = [], parent) {
      let onlyOneChild = {}
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return { hasOneShowingChild: true, onlyOneChild: onlyOneChild }
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return { hasOneShowingChild: true, onlyOneChild: onlyOneChild }
      }

      return { hasOneShowingChild: false, onlyOneChild: onlyOneChild }
    },
    resolvePath(routePath, basePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(basePath)) {
        return basePath
      }
      return path.resolve(basePath, routePath)
    },
    vnbItemClicked(text) {
      if (text === 'About') {
        alert("'About' was selected.")
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700");
html {
  width: 100%;
  font-size: 18px;
  color: #333;
}
body {
  margin: 0;
  height: 100%;
  height: 100vh;
  width: 100%;
  font-family: "Montserrat", sans-serif;
}
#app {
  height: 100%;
  height: 100vh;
  width: 100%;
  line-height: 1.5;
}
.code-text {
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}
@media (min-width: 992px) {
  .code-text {
    margin-bottom: 0;
  }
}
.btn {
  text-transform: uppercase;
  font-weight: bold;
}

.lang {
  margin-left: auto;
  justify-content: flex-end;
  padding-right: 10px;
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}
@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
#main-navbar {
  background: transparent
}
//
// vue-navigation-bar customization below

.vnb {
  background: transparent;
  font-family: "Montserrat", sans-serif;
  .button-red {
    background: #ff3b30;
    &:hover {
      background: darken(#ff3b30, 10%);
    }
  }
  &__menu-options {
    &__option {
      padding-right: 20px;
      &__link {
        height: 60px;
      }
      &__link:hover {
        border-bottom: 2px solid #409eff;
      }
      &__link.router-link-active {
        border-bottom: 2px solid #409eff;
      }
    }
  }
  &__popup {
    &__bottom {
      &__menu-options {
        &__option {
          &__link {
            &__icon {
              svg {
                margin-top: -4px;
              }
            }
          }
        }
      }
    }
  }
  &__brand-image-wrapper {
    animation: heartAnimate 8s linear infinite;
    &__link__image {
      max-height: 50px !important;
    }
  }
  .custom-section-content {
    width: 100%;
    @media (min-width: 568px) {
      width: 50%;
    }
    @media (min-width: 992px) {
      width: 15%;
    }
    @media (min-width: 1200px) {
      width: 20%;
    }
  }
}

@keyframes heartAnimate {
  0%,50%,100%{transform: scale(1) rotate(0);}
  15%,35%{transform: translatex(15px) scale(0.8) rotate(25deg);}
  25%{transform: translatex(30px) scale(1.1) rotate(45deg);}
  65%,85%{transform: translatex(-15px) scale(0.9) rotate(-25deg);}
  75%{ transform: translatex(-30px) scale(1.1) rotate(-45deg);}
}
</style>
