<template>
    <div class="feed">
        <Post class="post" v-for="p in posts" :key="p" :pavatar="p.pavatar" :pdate="p.pdate" :pforname="p.pforname" :pname="p.pname" :pid="p.pid" :ptext="p.ptext" :pcom="p" :plikes="p.plikes"/>
    </div>
</template>

<script>
    import Post from './Post.vue'
    import {mapGetters} from 'vuex';

    export default {
        methods: {
            
        },
        components: {
            Post
        },
        computed: {
            ...mapGetters(['posts'])
        },
        async created() {
            this.$store.dispatch('getPosts');
        }
    }
</script>

<style>
    .feed {
        display: flex;
        flex-direction: column;
        max-width: 30rem;
        min-width: 30rem;
    }

    .post {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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