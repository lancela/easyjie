
<template>
   <el-container style="height: 500px; border: 1px solid #eee">
     <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
       <el-menu
       router
       class="el-menu-vertical-demo"
       >
         <el-submenu index="/home">
           <template slot="title"><i class="el-icon-message"></i>导航一</template>
           <el-menu-item index="/home/table"><i class="el-icon-s-grid"></i>Table</el-menu-item>
           <el-menu-item  index="/home/form"><i class="el-icon-copy-document"></i>Form</el-menu-item>
         </el-submenu>
         <el-submenu index="2">
           <template slot="title"><i class="el-icon-menu"></i>导航二</template>
           <el-menu-item-group>
             <template slot="title">分组一</template>
             <el-menu-item index="2-1">选项1</el-menu-item>
             <el-menu-item index="2-2">选项2</el-menu-item>
           </el-menu-item-group>
           <el-menu-item-group title="分组2">
             <el-menu-item index="2-3">选项3</el-menu-item>
           </el-menu-item-group>
           <el-submenu index="2-4">
             <template slot="title">选项4</template>
             <el-menu-item index="2-4-1">选项4-1</el-menu-item>
           </el-submenu>
         </el-submenu>
         <el-submenu index="3">
           <template slot="title"><i class="el-icon-setting"></i>导航三</template>
           <el-menu-item-group>
             <template slot="title">分组一</template>
             <el-menu-item index="3-1">选项1</el-menu-item>
             <el-menu-item index="3-2">选项2</el-menu-item>
           </el-menu-item-group>
           <el-menu-item-group title="分组2">
             <el-menu-item index="3-3">选项3</el-menu-item>
           </el-menu-item-group>
           <el-submenu index="3-4">
             <template slot="title">选项4</template>
             <el-menu-item index="3-4-1">选项4-1</el-menu-item>
           </el-submenu>
         </el-submenu>
       </el-menu>
     </el-aside>

     <el-container>
       <el-header style="text-align: right; font-size: 12px">
         <el-dropdown>
           <img src="@/assets/image/gif1.gif"  style="width: 40px; height: 40px;border-radius: 20%; margin-top:10px"/>
            <icon class="el-icon-caret-bottom" style="font-size: 18px;margin-left: 8px;"></icon>
           <el-dropdown-menu slot="dropdown" class="menu">
             <el-dropdown-item class="el-dropdown-item">
               <a  href="">我的</a>
             </el-dropdown-item >
             <el-dropdown-item  class="el-dropdown-item">
              <a href=""> github</a>
             </el-dropdown-item>
             <el-dropdown-item  class="el-dropdown-item">
              <router-link to="/login">注销</router-link>
             </el-dropdown-item>
           </el-dropdown-menu>

         </el-dropdown>

       </el-header>


       <router-view/>
     </el-container>
   </el-container>

</template>

<script>
 export default {
     name: 'Home',
     data () {
         return {
             msg: 'Home Page!'
         }
     }
 }
</script>

<style lang="scss" scoped>

.el-dropdown-item {
    a{
     text-decoration: none;
     color:#000000;

    }
  }

</style>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }


</style>
