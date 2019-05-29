<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <div>
      <el-button @click="startHacking">Start</el-button>
    </div> -->
    <UserInfo></UserInfo>
  </div>
</template>

<script>
import UserInfo from './components/UserInfo'
export default {
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  },
  components:{
    UserInfo
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
