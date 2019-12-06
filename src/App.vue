<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import $ from 'jquery'
export default {
  name: 'App',
  data(){
    return{}
  },
  mounted(){
    // 实现APP的高度占满全屏
    $('#app').height($(window).height())
  }
}
</script>

<style>
  *{
    margin:0;
    padding:0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 500px;
  width: 100%;
}
</style>
