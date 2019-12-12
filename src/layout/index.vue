
<template>
  <el-container>
    <el-aside :width="isCollapse ? '70px' : '200px'" style="background-color: rgb(238, 241, 246)">
      <!-- 侧边栏顶部的logo -->
      <el-header class="logo">
        <img src="../assets/logo.png" />
        <span :style="{'display':(isCollapse?'none':'block')}">易捷家政</span>
      </el-header>
      <el-menu
        :collapse-transition="false"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff"
        unique-opened
        :collapse="isCollapse"
        router
      >
        <el-menu-item index="/dishboard">
          <i class="el-icon-s-grid"></i><span>Dishboard</span>
        </el-menu-item>
        <el-submenu index="/expamle" to="/expamle">
          <template slot="title">
            <i style="marginLeft:-20px marginLeft:20px" class="el-icon-message"></i>
            <span>Example</span>
          </template>
          <el-menu-item index="/example/table">
            <i class="el-icon-s-grid"></i><span>Table</span>
          </el-menu-item>
          <el-menu-item index="/example/form">
            <i class="el-icon-copy-document"></i>
            <span>Form</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="/execl" to="/execl">
          <template slot="title">
            <i style="marginLeft:-20px marginLeft:20px" class="el-icon-menu"></i>
            <span>Excel</span>
          </template>
          <el-menu-item index="/execl/export-excel">
            <span>Export Excel</span>
          </el-menu-item>
          <el-menu-item index="/execl/export-select-excel">
            <span>Export Selected</span>
          </el-menu-item>
          <el-menu-item index="/execl/export-merge-header">
            <span>Export Header</span>
          </el-menu-item>
          <el-menu-item index="/execl/upload-excel">
            <span>Upload Export</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i style="marginLeft:-20px marginLeft:20px" class="el-icon-setting"></i>
            <span>导航三</span>
          </template>
          <el-menu-item index="3-1">
            <span>选项1</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!-- 用于控制侧边栏是否折叠的图标:style="{'line-height': (index == 1 ? '25px':'50px')}" -->
        <i
          style="color:#fff; fontSize:18px"
          class="el-icon-s-fold"
          :style="{'display':(isCollapse?'none':'block')}"
          @click="toggleCollapse"
        ></i>
        <i
          style="color:#fff;fontSize:18px"
          class="el-icon-s-unfold"
          :style="{'display':(isCollapse?'block':'none')}"
          @click="toggleCollapse"
        ></i>
        <el-dropdown>
          <img
            src="@/assets/image/gif1.gif"
            style="width: 40px; height: 40px;border-radius: 20%; margin-top:10px"
          />
          <i class="el-icon-caret-bottom" style="font-size: 18px;margin-left: 8px;"></i>
          <el-dropdown-menu slot="dropdown" class="menu">
            <el-dropdown-item class="el-dropdown-item">
              <a href>我的</a>
            </el-dropdown-item>
            <el-dropdown-item class="el-dropdown-item">
              <a href>github</a>
            </el-dropdown-item>
            <el-dropdown-item class="el-dropdown-item">
              <router-link to="/">注销</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <router-view />
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 是否折叠
      isCollapse: false
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-dropdown-item {
  a {
    text-decoration: none;
    color: #000000;
  }
}
</style>
<style lang="scss" >
.el-aside {
  background-color: #333744;
  color: #333;
  overflow-x: hidden;
  height: 100%;
  font-size: 20px;
  .el-menu {
    border-right: none;
    height: calc(100% - 60px);
  }
}
.logo {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  img {
    height: 40px;
    width: 40px;
  }
  span {
    color: #fff;
    font-size: 18px;
    margin-right: 30px;
  }
}

.el-header {
  background-color: #373d41;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-footer {
  background-color: azure;
  border: 1px solid #ccc;
}
</style>
