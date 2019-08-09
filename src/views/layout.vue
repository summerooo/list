<template>
  <div class="container">
    <div class="menu">
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
      <!-- :collapse="isCollapse" -->
      <div class="title">排名查询后台</div>
      <el-menu
        router
        :default-active="activeMenu"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose">
        <template v-for="(item, index) in allMenus">
          <el-submenu :index="item.path" :key="index" v-if="item.children" :show-timeout="100">
            <template slot="title">
               <i :class="item.meta.title"></i>
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <el-menu-item v-for="(x, i) in item.children" :index="x.path" :key="i">
               <i :class="x.meta.title"></i>
              <span slot="title">{{x.meta.title}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :key="index" :index="item.path" v-else>
            <i :class="item.meta.title"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="content">
      <div class="title">
        {{$route.meta.title}}
      </div>
      <div class="innerContent">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: '',
      allMenus: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      console.log(this.$route.meta)
      this.activeMenu = this.$route.path
      let layoutChildren = this.$router.options.routes[1].children
      // 左侧导航过滤出需要的路由
      let arr = []
      let format = _ => {
        for (let i in _) {
          if (!_[i].meta['navDoNot']) arr.push(_[i])
        }
        return arr
      }
      for (let i in format(layoutChildren)) {
        this.$set(this.allMenus, i, format(layoutChildren)[i])
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  min-height: 720px;
  min-width: 1080px;
  overflow: hidden;
  display: flex;
  .menu {
    width: 200px;
    .title {
      font-size: 20px;
      padding: 30px;
      text-align: center;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px;
    background: #eef0f3;
    overflow: auto;
    .title {
      background: white;
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      padding: 30px;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .innerContent {
      min-height: 720px;
      flex: 1;
      width: 100%;
    }
  }
}
</style>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>

