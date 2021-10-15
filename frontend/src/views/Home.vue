<template>
  <div class="home">
    <h3 v-if="!user">Vous n'êtes pas connecté !</h3>
    <div class="feed-container" v-if="user">
      <NewPost />
      <Feed />
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import NewPost from '../components/NewPost.vue'
  import Feed from '../components/Feed.vue'

  export default {
    name: 'Home',
    computed: {
      ...mapGetters(['user'])
    },
    components: {
      Feed,
      NewPost
    }
  }
</script>

<style>
  .home {
    width: 100%;
    padding-top: 5rem;
  }

  .feed-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

  body:before {
    content: '';
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-image: url('../assets/img/feedbg.jpg');
    background-size: cover;
    opacity: .2;
    z-index: -1;
  }
</style>