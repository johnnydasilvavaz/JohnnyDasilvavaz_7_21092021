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
      <Error v-if="error" :error="error" />
    </form>
  </div>
</template>

<script>
import Error from '../components/Error.vue';
import validator from 'validator';

export default {
  components: { Error },
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleSubmit() {
      if (!validator.isEmail(this.email) || !validator.isStrongPassword(this.password)) {
        return this.error = 'Les informations fournies sont incorrectes'
      }
      if (!this.email || !this.password) {
        return this.error = 'Tous les champs doivent être renseignés'
      }
      this.$store.dispatch("LOGIN", {
        email: this.email,
        password: this.password
      })
      .then((res) => {
        this.$store.dispatch('user', res.data.user);
        this.$router.push('/');
      })
      .catch(() => {
        this.error = 'Adresse email ou mot de passe incorrect';
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: fit-content;
      border-bottom: .1rem solid #091F43;
      box-shadow:
        0px 2.3px 3.6px rgba(0, 0, 0, 0.024),
        0px 6.3px 10px rgba(0, 0, 0, 0.035),
        0px 15.1px 24.1px rgba(0, 0, 0, 0.046),
        0px 50px 80px rgba(0, 0, 0, 0.07);
    }
  }
</style>