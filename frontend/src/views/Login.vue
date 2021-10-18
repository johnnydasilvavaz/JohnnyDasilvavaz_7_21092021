<template>
  <div class="login">
    <form class="login__form" @submit.prevent="handleSubmit">
      <h1>Connexion</h1>
      <div class="form__item">
        <label for="email">Adresse email</label>
        <input type="text" name="email" id="email" v-model="email">
      </div>
      <div class="form__item">
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" v-model="password">
      </div>
      <button class="btn">Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      this.$store.dispatch("LOGIN", {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push('/');
      })
      .catch((err) => {
        return err;
      });
      await axios.post('auth/login', {
        email: this.email,
        password: this.password
      }).then((res) => {
        localStorage.setItem('token', res.data.token);
        this.$store.dispatch('user', res.data.user);
        console.log(res.data.user);
      })
      .catch((err) => {
        return err;
      });
      this.$router.push('/');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  input {
    border-radius: .3rem;
    background-color: #efefef;
    border: 0;
    min-height: 2rem;
  }

  .login {
    display: flex;
    justify-content: center;
    padding-top: 5rem;
    height: 100%;
  }

  .login__form {
    padding: 1rem;
    margin-top: 2rem;
    border-radius: .5rem;
    border-bottom: .1rem solid #091F43;
    box-shadow:
      0px 2.3px 3.6px rgba(0, 0, 0, 0.024),
      0px 6.3px 10px rgba(0, 0, 0, 0.035),
      0px 15.1px 24.1px rgba(0, 0, 0, 0.046),
      0px 50px 80px rgba(0, 0, 0, 0.07);
  }
</style>
