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
  }

  .feed-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>