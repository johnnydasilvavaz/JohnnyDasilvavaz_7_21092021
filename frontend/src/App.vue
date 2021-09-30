<template>
  <img class="login__logo" alt="Vue logo" src="./assets/icon-above-font.png">
  <Login msg="Bienvenue"/>
</template>

<script>
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.login__logo {
  max-width: 15rem;
}

</style>
