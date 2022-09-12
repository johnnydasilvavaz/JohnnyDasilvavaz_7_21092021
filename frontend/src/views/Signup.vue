<template>
  <main class="signup">
    <form class="signup__form" @submit.prevent="handleSubmit">
      <h1>Création de compte</h1>
      <div class="form__item">
        <label for="forname">Prénom</label>
        <input type="text" name="forname" id="forname" v-model="forname">
      </div>
      <div class="form__item">
        <label for="name">Nom</label>
        <input type="text" name="name" id="name" v-model="name">
      </div>
      <div class="form__item">
        <label for="email">Adresse email</label>
        <input type="text" name="email" id="email" v-model="email">
      </div>
      <div class="form__item">
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" v-model="password">
      </div>
      <div class="form__item">
        <label for="passwordConfirm">Confirmation</label>
        <input type="password" name="passwordConfirm" id="passwordConfirm" v-model="passwordConfirm">
      </div>
      <button class="btn">Créer mon compte</button>
      <Error v-if="error" :error="error" />
    </form>
  </main>
</template>

<script>
import axios from 'axios';
import Error from '../components/Error.vue';
import validator from 'validator';

export default {
  name: 'Signup',
  data() {
      return {
          forname: '',
          name: '',
          email: '',
          password: '',
          passwordConfirm: '',
          error: ''
      }
  },
  methods: {
    handleSubmit() {
      if (!this.forname || !this.name || !this.email || !this.password || !this.passwordConfirm) {
        return this.error = 'Tous les champs doivent être renseignés';
      }
      if (!validator.isAlpha(validator.blacklist(this.name.toString(), "' -")) || !validator.isAlpha(validator.blacklist(this.forname.toString(), "' -"))) {
        return this.error = 'Le format du nom ou du prénom est incorrect';
      }
      if (!validator.isEmail(this.email)) {
        return this.error = "Le format de l'adresse email est invalide";
      }
      if (!validator.isStrongPassword(this.password)) {
        return this.error = "Le mot de passe n'est pas assez complexe";
      }
      if (this.passwordConfirm != this.password) {
        return this.error = 'Le mot de passe et la confirmation ne sont pas identiques';
      }
      axios.post('auth/signup', {
      forname: this.forname,
      name: this.name,
      email: this.email,
      password: this.password
      })
      .then(() => {
        this.$router.push({name: 'Login'});
      })
      .catch(() => {
        this.error = 'Les informations fournies sont incomplètes/incorrectes'
      })
    }
  },
  components: {
    Error
  },
  mounted() {
    document.title = 'Groupomania - Créer un compte';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .signup {
    display: flex;
    justify-content: center;
    align-items: center;
    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: fit-content;
      border-bottom: 2px solid $primary-color;
      box-shadow:
        0px 2.3px 3.6px rgba(0, 0, 0, 0.024),
        0px 6.3px 10px rgba(0, 0, 0, 0.035),
        0px 15.1px 24.1px rgba(0, 0, 0, 0.046),
        0px 50px 80px rgba(0, 0, 0, 0.07);
    }
  }
</style>
