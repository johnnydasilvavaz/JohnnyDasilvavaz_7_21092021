<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <form action="">
        <div>
          <label for="forname">Prénom</label>
          <input type="text" name="forname" id="forname">
        </div>
        <div>
          <label for="name">Nom</label>
          <input type="text" name="name" id="name">
        </div>
        <div>
          <label for="email">Adresse email</label>
          <input type="text" name="email" id="email">
        </div>
        <div>
          <label for="password">Mot de passse</label>
          <input type="text" name="password" id="password">
        </div>
        <button class="btn">Créer un compte</button>
      </form>
    </div>
    <div>
      <form action="">
        <div>
          <label for="email">Adresse email</label>
          <input type="text" name="email" id="email">
        </div>
        <div>
          <label for="password">Mot de passse</label>
          <input type="text" name="password" id="password">
        </div>
        <button class="btn">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
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

.btn {
  border: .2rem solid #091F43;
  border-radius: .5rem;
  padding: .5rem;
  margin: 1rem;
  color: #091F43;
  background-color: white;
  font-weight: 700;
}

.btn:hover {
  background-color: #091F43;
  color: white;
}


</style>
