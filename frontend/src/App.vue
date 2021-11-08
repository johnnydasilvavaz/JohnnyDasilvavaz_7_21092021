<template>
  <div>
    <Nav />
    <router-view class="content" :key="$route.fullPath" />
  </div>
</template>

<script>
  import Nav from './components/Nav.vue'
  import axios from 'axios'
  export default {
    name: 'App',
    components: {
      Nav
    },
    created() {
      axios.interceptors.response.use(undefined, (error) => {
        if (error.response.error.name === "TokenExpiredError" && error.response.config && !error.response.config.__isRetryRequest) {
          this.$store.dispatch("LOGOUT")
          .then(this.$router.push('/login'));
        }
        throw error;
      });
    }
  }
</script>

<style lang="scss">
@font-face {
  font-family: "roboto";
  src: url('./assets/fonts/Roboto-Regular.ttf');
}

@font-face {
  font-family: "roboto-light";
  src: url('./assets/fonts/Roboto-Light.ttf');
}

@font-face {
  font-family: "roboto-medium";
  src: url('./assets/fonts/Roboto-Medium.ttf');
}

@font-face {
  font-family: "roboto-thin";
  src: url('./assets/fonts/Roboto-Thin.ttf');
}

html {
  font-family: "roboto", Arial, Helvetica, sans-serif;
  font-size: 16px;
  scroll-behavior: smooth;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  &:before {
    content: '';
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-image: url('./assets/img/feedbg.jpg');
    background-size: cover;
    opacity: .1;
    z-index: -1;
  }
}

#app {
  font-family: roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-primary-color;
  height: 100%;
  & > div {
    height: 100%;
  }
}

.content {
  height: 100%;
}

.btn {
  font-family: roboto-medium;
  border: 0;
  box-sizing: border-box;
  min-height: 2rem;
  border-radius: $border-secondary;
  padding: .5rem;
  margin: 1rem;
  color: $font-secondary-color;
  background-color: $primary-color;
  font-weight: 700;
  &:hover {
    background-color: $secondary-color;
    color: $font-secondary-color;
    cursor: pointer;
  }
  &--remove {
    background-color: $alert-primary-color;
    &:hover {
      background-color: $alert-secondary-color;
    }
  }
  &:disabled {
    background-color: $secondary-color;
    &:hover {
        cursor: default;
    }
  }
}

input {
  border-radius: $border-secondary;
  background-color: $bg-secondary-color;
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
  border-radius: $border-primary;
  background-color: $bg-primary-color;
  @media screen and (max-width: 497.9px) {
      max-width: 100%;
      min-width: 100%;
      border-radius: 0;
      padding: 1rem 0;
  }
}

.form {
  &__item {
    padding: .5rem;
    display: grid;
    grid-template-columns: 50% 50%;
    width: calc(100% - 1rem);
    & label, input {
      padding: .25rem;
      width: 100%;
    }
  }
}
</style>