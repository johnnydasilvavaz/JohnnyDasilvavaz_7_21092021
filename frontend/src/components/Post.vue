<template>
    <div>
        <div class="post__body">
            <div class="post__header">
                <div class="post__header__left">
                    <div class="post__avatar">
                        <img :src="pavatar" alt="">
                    </div>
                    <div class="post__infos">
                        <span class="post__user">
                            {{ pforname }}
                            {{ pname }}
                        </span>
                        <span class="post__date">
                            {{ pdate }}
                        </span>
                    </div>
                </div>
                <div class="post__header__right">
                    <div>
                        <span>{{ plikes }}</span>
                        <a v-if="!liked" class="like" href="javascript:void(0)" @click="likePost(pid)"><fa icon="heart" /></a>
                        <a v-if="liked" class="like--active" href="javascript:void(0)" @click="likePost(pid)"><fa icon="heart" /></a>
                    </div>
                    <div class="post__trash">
                        <a href="javascript:void(0)" @click="deletePost(pid)"><fa icon="trash-alt" /></a>
                    </div>
                </div>
            </div>
            <div class="post__text" v-html="ptext">
            </div>
        </div>
        <div v-if="pcom.com" class="comments">
            <a href="javascript:void(0)" @click="getComments(pid)"><fa icon="sort-up" /> Charger les commentaires précédents <fa icon="sort-up" /></a>
            <Comment :comAvatar="pcom.com.avatar" :comAuthor="pcom.com.forname + ' ' + pcom.com.name" :comDate="pcom.com.date" :comText="pcom.com.text" />
        </div>
        <ComPost :pid="pid"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import axios from 'axios';
    import Comment from './Comment.vue'
    import ComPost from './ComPost.vue'

    export default {
        name: 'Post',
        data() {
            return {
                comments: {},
                liked: false
            }
        },
        props: {
            pid: Number,
            pname: String,
            pforname: String,
            pdate: String,
            ptext: String,
            pavatar: String,
            pcom: Object,
            plikes: Number
        },
        methods: {
            async deletePost(id) {
                axios.delete('post/' + id)
                .then((res) => {
                    this.$store.dispatch('getPosts');
                    console.log(res);
                })
                .catch((error) => {
                    return error;
                })
            },
            async getComments(id) {
                await axios.get('post/comments/' + id)
                .then((res) => {
                    console.log(res.data);
                    this.comments = res.data;
                })
                .catch((error) => {
                    return error;
                });
            },
            async likePost(id) {
                await axios.post('post/' + id + '/like')
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    return error;
                });
            }
        },
        computed: {
            ...mapGetters(['posts']),
            ...mapGetters(['user'])
        },
        components: {
            Comment,
            ComPost
        }
    }
</script>

<style>
    .post__body {
        display: flex;
        flex-direction: column;
        width: 100%;
        border-radius: .5rem;
        margin-bottom: .5rem;
        border-bottom: .1rem solid #091F43;
        box-shadow:
        0px 0px 1.3px rgba(0, 0, 0, 0.1),
        0px 0px 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }

    .post input {
        width: 75%;
        border: 0;
        background-color: #fff;
        border-radius: .3rem 0 0 .3rem;
        min-height: 2rem;
        box-sizing: border-box;
    }

    .post button {
        border-radius: 0 .3rem .3rem 0;
        border: 0;
        width: 25%;
        margin: 0;
        background-color: #091F43;
        color: white;
        font-weight: 600;
    }

    .post button:hover {
        background-color: #244883;
    }

    .btn--disabled {
        background-color: #244883;
    }

    .btn--disabled:hover {
        cursor: default;
    }

    .post__header {
        width: calc(100% - 1rem);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem;
        border-radius: .5rem .5rem 0 0;
        background-color: #fff;
        overflow: hidden;
    }

    .post__header__left {
        display: flex;
    }

    .post__header__right {
        display: flex;
        align-items: center;
    }

    .post__header__right a {
        padding: 0 .25rem;
    }

    .like {
        color: #ddd;
    }

    .like--active {
        color: #091F43;
    }

    .like:hover {
        color: #244883;
    }

    .post__avatar {
        width: 2rem;
        height: 2rem;
        background-color: #efefef;
        border-radius: .3rem;
        box-sizing: border-box;
        border: .1rem solid #091F43;
        overflow: hidden;
    }

    .post__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .post__infos {
        display: flex;
        flex-direction: column;
        padding-left: .5rem;
        align-self: center;
    }

    .post__user {
        font-family: roboto-medium;
        font-size: .8rem;
        align-self: flex-start;
    }

    .post__date {
        font-display: roboto-light;
        font-size: .6rem;
        align-self: flex-start;
    }

    .post__trash {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .5rem;
    }

    .post__trash a {
        color: #091F43;
    }

    .post__trash a:hover {
        cursor: pointer;
        color: #D1515A;
    }

    .post__text {
        font-family: roboto-medium;
        display: flex;
        width: calc(100% - 2rem);
        padding: 1.5rem 1rem;
        border-radius: 0 0 .5rem .5rem;
        background-color: #fff;
    }

    .comments {
        width: 100%;
    }

    .comments a {
        font-family: roboto-light;
        font-size: .8rem;
        text-decoration: none;
    }
</style>