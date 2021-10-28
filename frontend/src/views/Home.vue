<template>
  <div class="home">
    <div class="feed-container" v-if="user">
      <NewPost />
      <Post class="post" v-for="p in posts" :key="p" :post="p" :com="p.com"/>
    </div>
  </div>
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
    }
  }
</script>

<style lang="scss">
  .home {
    width: 100%;
    padding-top: 5rem;
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
    background-color: #efefef;
    border-radius: .5rem;
    margin-bottom: 2rem;
    box-shadow:
    0px 0px 0.5px rgba(0, 0, 0, 0.049),
    0px 0px 1.3px rgba(0, 0, 0, 0.07),
    0px 0px 3px rgba(0, 0, 0, 0.091),
    0px 0px 10px rgba(0, 0, 0, 0.14);
    overflow: hidden;
  }
</style>