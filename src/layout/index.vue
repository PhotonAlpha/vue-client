<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- <el-scrollbar ref="mainScrollbar" class="page-component__scrollbar"> -->
    <el-container ref="mainScrollbar">
      <el-header :style="styleTrianglify">
        <sidebar />
      </el-header>
      <el-main id="mainContent">
        <!-- 面包屑
          <el-row type="flex" :class="{'fixed-header':fixedHeader}">
            <navbar style="width: 100%;" />
          </el-row> -->
        <el-row type="flex">
          <el-col id="side-cnt" class="hidden-sm-only side-cnt" :class="{'side-cnt-scrolled': isLeftSideScrolled}" :md="5" :xs="0" :push="1">
            <el-scrollbar class="page-component__scrollbar">
              <profile />
            </el-scrollbar>
          </el-col>
          <el-col :md="{span: 12, offset: 6}" :sm="{span: 24, offset: 0}" :xs="{span: 24, offset: 0}">
            <app-main />
          </el-col>
          <el-col :md="{span: 5, offset: 18}" :xs="0" class="hidden-sm-only right-side-cnt" :class="{'side-cnt-scrolled': isLeftSideScrolled}">
            <el-scrollbar class="page-component__scrollbar">
              <archive-right @getCategoryList="handleLazyLoadCategory" @handlerCategory="handlerCategory" />
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import { Sidebar, AppMain, Profile, ArchiveRight } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import getTrianglify from '@/utils/generator'
import { getDestinationTrees } from '@/api/githubApi'
import { reconstructorTitle } from '@/utils'
import { CURRENT_TITLE } from '@/utils/index'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    Profile,
    ArchiveRight
  },
  mixins: [ResizeMixin],
  data() {
    return {
      isfixTab: false,
      isLeftSideScrolled: false
    }
  },
  computed: {
    category() {
      return this.$store.getters.category
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    styleTrianglify() {
      return {
        backgroundImage: 'url(' + getTrianglify(document.body.offsetWidth, 200, 60).toDataURL() + ')',
        height: 'auto'
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleTabFix, true)
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    handleTabFix() {
      const mainOffsetTop = document.querySelector('#mainContent').offsetTop
      // console.log('handleTabFix:', mainOffsetTop, document.documentElement.scrollTop)
      const scrollTop = document.documentElement.scrollTop
      // const scrollTop = this.$refs.mainScrollbar.wrap.scrollTop
      if (scrollTop > mainOffsetTop) {
        this.isfixTab = true
        this.isLeftSideScrolled = true
      } else {
        this.isfixTab = false
        this.isLeftSideScrolled = false
      }
    },
    handleLazyLoadCategory(node, resolve) {
      console.log('loadNode', node)
      if (node.level === 0) {
        return resolve(this.category)
      }
      if (node.level > 1) return resolve([])

      const { sha } = node.data

      getDestinationTrees(sha).then(response => {
        const result = response
        const blogItems = reconstructorTitle(result.tree)
        console.log('blogItems', blogItems)
        if (blogItems && blogItems.length > 0) {
          const data = blogItems.map(item => {
            return { label: item.name, subItem: true, sha: item.sha }
          })
          resolve(data)
        }
      })
        .catch(error => {
          console.log('error occur', error)
        })
    },
    handlerCategory(data) {
      if (data && data.subItem) {
        // console.log('handlerCategory', data, CURRENT_TITLE)
        localStorage.setItem(CURRENT_TITLE, data.name)
        this.$router.push({ name: 'spring-details', params: { sha: data.sha }})
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.handleTabFix, true)
    next()
  }
}
</script>

<style lang="scss">
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .customer-jumbotron {
    height: 200px;
    margin-bottom: 30px;
    background-color: aquamarine;
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    // height: 100%;
    // width: 100%;
    // &.mobile.openSidebar{
    //   position: fixed;
    //   top: 0;
    // }
    background-image: url('~@/assets/images/site-background.png');
    overflow-y: hidden;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
  }
  .fixedNavbar{
    top: 2.25rem;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  // scrollbar style
  .page-component__scrollbar {
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
  }

  // 左侧边栏
  .side-cnt {
    top: 90px;
    overflow: hidden;
    position: fixed;
    transition: all 1s;
    transition-timing-function: ease-out;
    box-shadow: 11px 11px 12px 0 #90939994;
  }
  .side-cnt-scrolled {
    top: 20px !important;
  }
  .right-side-cnt {
    top: 90px;
    height: 90%;
    overflow: hidden;
    position: fixed;
    transition: all 1.2s;
    transition-timing-function: ease-in-out;
  }
  #mainContent {
    padding-top: 0px;
  }
  .live2d{
    position: fixed;
    bottom: -30px;
    right: 0px;
    z-index: 999;
    width: 150px;
    height: 300px;
    pointer-events: none;
  }
</style>
