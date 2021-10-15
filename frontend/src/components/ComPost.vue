<template>
    <form class="post__comments" @submit.prevent="postComment(pid)">
        <div>
            <input type="text" placeholder="Commenter le post" v-model="text">
            <button class="btn">Envoyer</button>
        </div>
    </form>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ComPost',
        data() {
            return {
                text: ''
            }
        },
        props: {
            pid: Number
        },
        methods: {
            async postComment(id) {
                console.log(id);
                axios.post('post/comments/' + id, {text: this.text})
                .then(() => {
                    this.$store.dispatch('getPosts');
                    this.text = '';
                })
                .catch((error) => {
                    return error;
                });
            }
        }
    }
</script>

<style>
    .post__comments {
        width: calc(100% - 1rem);
        min-width: 20rem;
        margin: .5rem .5rem;
        padding: 0;
        box-shadow: 0;
    }

    .post__comments input {
        padding: 0 .5rem;
    }
</style>