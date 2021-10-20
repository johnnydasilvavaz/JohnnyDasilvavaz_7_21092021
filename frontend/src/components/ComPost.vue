<template>
    <form class="post__comments" @submit.prevent="postComment(pid)">
        <input type="text" placeholder="Commentez la publication" v-model="text" @input="toggleBtn">
        <button class="btn" :disabled="btnDisabled">Envoyer</button>
    </form>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ComPost',
        data() {
            return {
                text: '',
                btnDisabled: true
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
            },
            toggleBtn() {
                if (this.text != '') {
                    this.btnDisabled = false;
                } else {
                    this.btnDisabled = true;
                }
            }
        }
    }
</script>

<style>
    .post__comments {
        display: flex;
        width: calc(100% - 1rem);
        min-width: 20rem;
        margin: .5rem .5rem;
        padding: 0;
        box-shadow: 0;
    }

    .post__comments input {
        padding: 0 .5rem;
    }

    .post__comments input:focus {
        outline-offset: -.08rem;
        outline-color: #244883;
    }
</style>