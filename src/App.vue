<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="main">
      <router-view></router-view>
    </div>
    <m-footer></m-footer>
  </div>
</template>
<style scoped>
  .mu-appbar{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  #app{
    position: relative;
  }
  div[class='main']{
    margin-top: 64px;
    margin-bottom: 0px;
  }

</style>
<script>
  import NavBar from './components/navbar.vue';
  import MFooter from './components/footer.vue'
  export default {
    name: 'app',
    data(){
      return {

      }
    },

    components:{
      NavBar,
      MFooter
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
