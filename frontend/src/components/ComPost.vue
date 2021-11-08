<template>
    <form :name="pid" class="post__comments" title="Nouveau commentaire" @submit.prevent="postComment(pid)">
        <input :aria-label="pid" type="text" placeholder="Commentez la publication" v-model="text" @input="toggleBtn">
        <button :aria-label="pid" class="btn" :disabled="btnDisabled">Envoyer</button>
    </form>
</template>

<script>
    import axios from 'axios';
    import {mapGetters} from 'vuex';

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
            async postComment(value) {
                axios.post('post/comments/' + value, { text: this.text })
                .then((res) => {
                    const comment = { ...res.data.comment, avatar: this.user.avatar, name: this.user.name, forname: this.user.forname };
                    this.$emit('updateComments', { comment: comment });
                    this.text = '';
                    this.toggleBtn();
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
        },
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style lang="scss" scoped>
    .post__comments {
        display: flex;
        width: calc(100% - 1rem);
        min-width: 10rem;
        margin: .5rem .5rem;
        padding: 0;
        box-shadow: 0;
        border-radius: $border-secondary;
        & input {
            padding: 0 .5rem;
            &:focus {
                outline-offset: -1.5px;
                outline-color: #244883;
            }
        }
    }
</style>