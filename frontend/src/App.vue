<template>
  <div>
    <Nav />
    <router-view />
  </div>
</template>

<script>
  import Nav from './components/Nav.vue'
  export default {
    name: 'App',
    components: {
      Nav
    }
  }
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: .5rem 1rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btn {
  border: 0;
  box-sizing: border-box;
  min-height: 2rem;
  border-radius: .5rem;
  padding: .5rem;
  margin: 1rem;
  color: white;
  background-color: #091F43;
  font-weight: 700;
}

.btn:hover {
  background-color: #244883;
  color: white;
  cursor: pointer;
}

input {
  border-radius: .3rem;
  background-color: #efefef;
  border: 0;
  min-height: 2rem;
  padding: 0 .5rem;
  box-sizing: border-box;
}

form {
  max-width: 50rem;
  min-width: 30rem;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: .5rem;
}

.form__item {
  padding: .5rem;
  display: grid;
  grid-template-columns: 50% 50%;
}

.form__item label,input {
  padding: .25rem;
  width: 100%;
}
</style>
