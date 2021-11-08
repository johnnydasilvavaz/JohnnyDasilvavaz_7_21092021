<template>
  <main class="home">
    <div class="feed-container" v-if="user">
      <NewPost />
      <Post class="post" v-for="p in posts" :key="p" :post="p" :com="p.com"/>
      <div v-if="!posts">Il n'y a pas encore de publications</div>
    </div>
  </main>
</template>

<script>
  import {mapGetters} from 'vuex'
  import NewPost from '../components/NewPost.vue'
  import Post from '../components/Post.vue'

  export default {
    name: 'Home',
    computed: {
      ...mapGetters(['user']),
      ...mapGetters(['posts'])
    },
    components: {
      Post,
      NewPost
    },
    async created() {
      this.$store.dispatch('getPosts');
    },
    mounted() {
      document.title = 'Groupomania - Accueil';
    }
  }
</script>

<style lang="scss">
  .home {
    width: 100%;
    padding-top: 3.5rem;
  }

  .feed-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

  .post {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 30rem;
    min-width: 30rem;
    background-color: $bg-secondary-color;
    border-radius: $border-primary;
    border-bottom: 1px solid white;
    margin-bottom: 2rem;
    box-sizing: border-box;
    box-shadow:
    0px 0px 0.5px rgba(0, 0, 0, 0.049),
    0px 0px 1.3px rgba(0, 0, 0, 0.07),
    0px 0px 3px rgba(0, 0, 0, 0.091),
    0px 0px 10px rgba(0, 0, 0, 0.14);
    overflow: hidden;
    @media screen and (max-width: 479.9px) {
      max-width: 100%;
      min-width: 100%;
      border-radius: 0;
    }
  }
</style>