<template>
    <div>
        <div class="post__body">
            <div class="post__header">
                <div class="post__header__left">
                    <div class="post__avatar">
                        <router-link class="nav__name" :to="{name: 'Profile', params: {id: post.puid}}"><img :src="post.pavatar" alt=""></router-link>
                    </div>
                    <div class="post__infos">
                        <span class="post__user">
                            {{ post.pforname }}
                            {{ post.pname }}
                        </span>
                        <span class="post__date">
                            {{ post.pdate }}
                        </span>
                    </div>
                </div>
                <div class="post__header__right">
                    <div>
                        <span>{{ postLikes }}</span>
                        <a :class="postLiked == 1 ? 'liked' : 'disliked'" href="javascript:void(0)" @click="likePost(post.pid)"><fa icon="heart" /></a>
                    </div>
                    <div v-if="post.puid == user?.uid || user?.role == 'admin'" class="trash">
                        <a href="javascript:void(0)" @click="deletePost(post.pid)"><fa icon="trash-alt" /></a>
                    </div>
                </div>
            </div>
            <img class="post__img" v-if="post.pimgUrl" :src="post.pimgUrl" alt="">
            <div class="post__text" v-if="post.ptext" v-html="post.ptext">
            </div>
        </div>
        <div v-if="post.nbrComs > 0 || comments.length > 0" class="comments">
            <a v-if="!comExpand && post.nbrComs > 1" href="javascript:void(0)" @click="getComments(post.pid)"><fa icon="sort-up" /> Charger les commentaires précédents <fa icon="sort-up" /></a>
            <Comment v-for="c in comments" :key="c">
                <template v-slot:avatar>
                    <router-link :to="{name: 'Profile', params: {id: c.user_id}}"><img :src="c.avatar" alt=""></router-link>
                </template>
                <template v-slot:header>
                    <div>{{ c.forname }} {{ c.name }} :</div>
                    <div class="trash trash--com">
                        <a v-if="c.user_id == user?.uid || user?.role == 'admin'" href="javascript:void(0)" @click="deleteCom(c.id, c.post_id)"><fa icon="trash-alt" /></a>
                    </div>
                </template>
                <template v-slot:comText>
                    {{ c.text }}
                </template>
                <template v-slot:comDate>
                    {{ c.date }}
                </template>
            </Comment>
        </div>
        <ComPost @updateComments="updateComments" :pid="post.pid"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import axios from 'axios';
    import Comment from './Comment.vue'
    import ComPost from './ComPost.vue'

    export default {
        name: 'Post',
        props: {
            post: Object,
            com: Object
        },
        data() {
            return {
                comments: [],
                someComs: false,
                comExpand: false,
                postLiked: this.post.pliked,
                postLikes: this.post.plikes
            }
        },
        methods: {
            updateComments(payload) {
                this.comments.push(payload.comment);
            },
            deletePost(id) {
                axios.delete('post/' + id)
                .then(() => {
                    if (this.$route.path == "/") {
                        this.$store.dispatch('getPosts');
                    } else {
                        this.$store.dispatch('getPersonalPosts', this.$route.params.id);
                    }
                })
                .catch((error) => {
                    return error;
                })
            },
            getComments(id) {
                axios.get('post/comments/' + id)
                .then((res) => {
                    this.comExpand = true;
                    this.comments = [];
                    for (const obj in res.data) {
                        this.comments.push(res.data[obj]);// = [ ...res.data ];
                    }
                })
                .catch((error) => {
                    return error;
                });
            },
            deleteCom(comid, postid) {
                axios.delete('post/comments/' + comid)
                .then(() => {
                    if (this.comExpand) {
                        this.getComments(postid);
                    } else {
                        if (this.$route.path == "/") {
                            this.$store.dispatch('getPosts');
                        } else {
                            this.$store.dispatch('getPersonalPosts', this.$route.params.id);
                        }
                    }
                })
                .catch((error) => {
                    return error;
                });
            },
            likePost(id) {
                axios.post('post/' + id + '/like')
                .then(() => {
                    if (this.postLiked === 0) {
                        this.postLiked = 1;
                        this.postLikes++
                    } else {
                        this.postLiked = 0;
                        this.postLikes--
                    }
                })
                .catch((error) => {
                    return error;
                });
            },
            replaceURLs(message) {
                if(!message) return;
                
                var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
                return message.replace(urlRegex, function (url) {
                    var hyperlink = url;
                    if (!hyperlink.match('^https?://')) {
                    hyperlink = 'https://' + hyperlink;
                    //Regex to find image file extension : /\.(gif|jpg|jpeg|tiff|png)$/i
                    }
                    return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
                });
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        components: {
            Comment,
            ComPost
        },
        async created() {
            this.comments = this.com ? [ this.com ] : [];
        }
    }
</script>

<style lang="scss">
    .trash {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .5rem;
        & a {
            color: #091F43;
            &:hover {
                cursor: pointer;
                color: #D1515A;
            }
        }
        &--com {
            padding: 0;
        }
    }

    .post {
        &__body {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: .5rem;
            border-radius: 0 0 .5rem .5rem;
            border-bottom: .1rem solid #091F43;
            box-shadow:
            0px 0px 1.3px rgba(0, 0, 0, 0.1),
            0px 0px 10px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            @media screen and (max-width: 479.9px) {
                border-radius: 0;
            }
        }
        &__header {
            width: calc(100% - 1rem);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .5rem;
            background-color: #fff;
            overflow: hidden;
            &__left {
            display: flex;
            }
            &__right {
                display: flex;
                align-items: center;
                & a {
                    padding: 0 .25rem;
                }
            }
        }
        &__avatar {
            width: 2rem;
            height: 2rem;
            background-color: #efefef;
            border-radius: .3rem;
            box-sizing: border-box;
            border: .1rem solid #091F43;
            overflow: hidden;
            & img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__infos {
            display: flex;
            flex-direction: column;
            padding-left: .5rem;
            align-self: center;
        }
        &__user {
            font-family: roboto-medium;
            font-size: .8rem;
            align-self: flex-start;
        }
        &__date {
            font-display: roboto-light;
            font-size: .6rem;
            align-self: flex-start;
        }
        &__img {
            max-height: 20rem;
            object-fit: contain;
            background-color: black;
        }
        &__text {
            font-family: roboto-medium;
            display: flex;
            width: calc(100% - 2rem);
            padding: 1.5rem 1rem;
            background-color: #fff;
            white-space: pre-line;
        }
        & input {
            width: 75%;
            border: 0;
            background-color: #fff;
            border-radius: .3rem 0 0 .3rem;
            min-height: 2rem;
            box-sizing: border-box;
        }
        & button {
            border-radius: 0 .3rem .3rem 0;
            border: 0;
            width: 25%;
            margin: 0;
            background-color: #091F43;
            color: white;
            font-weight: 600;
            &:hover {
                background-color: #244883;
            }
            &--disabled {
                background-color: #244883;
                &:hover {
                    cursor: default;
                }
            }
        }
    }

    .liked {
        color: red;
        &:hover {
            color: #244883;
        }
    }

    .disliked {
        color: #ddd;
        &:hover {
            color: #244883;
        }
    }

    .comments {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        & a {
            font-family: roboto-light;
            font-size: .8rem;
            text-decoration: none;
        }
    }
</style>