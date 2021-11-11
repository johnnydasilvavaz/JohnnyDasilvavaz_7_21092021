<template>
    <div>
        <div class="post__body">
            <div class="post__header">
                <div class="post__header__left">
                    <div class="post__avatar">
                        <router-link aria-label="Profil" class="nav__name" :to="{name: 'Profile', params: {id: post.puid}}"><img :src="post.pavatar" alt="Photo de profil"></router-link>
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
                        <a :class="postLiked == 1 ? 'liked' : 'disliked'" href="javascript:void(0)" aria-label="Liker le post" @click="likePost(post.pid)"><fa icon="heart" /></a>
                    </div>
                    <div v-if="post.puid == user?.uid || user?.role == 'admin'" class="trash">
                        <a href="javascript:void(0)" aria-label="Supprimer le post" @click="deletePost(post.pid)"><fa icon="trash-alt" /></a>
                    </div>
                </div>
            </div>
            <img class="post__img" v-if="post.pimgUrl" :src="post.pimgUrl" alt="Image du post">
            <div class="post__text" v-if="post.ptext" v-html="post.ptext">
            </div>
        </div>
        <div v-if="post.nbrComs > 0 || comments.length > 0" class="comments">
            <a v-if="!comExpand && post.nbrComs == 2" href="javascript:void(0)" @click="getComments(post.pid)"><fa icon="sort-up" /> Charger le commentaire précédent <fa icon="sort-up" /></a>
            <a v-if="!comExpand && post.nbrComs > 2" href="javascript:void(0)" @click="getComments(post.pid)"><fa icon="sort-up" /> Charger les {{ post.nbrComs - 1 }} commentaires précédents <fa icon="sort-up" /></a>
            <Comment v-for="c in comments" :key="c">
                <template v-slot:avatar>
                    <router-link aria-label="Profil" :to="{name: 'Profile', params: {id: c.user_id}}"><img :src="c.avatar" alt=""></router-link>
                </template>
                <template v-slot:header>
                    <div>{{ c.forname }} {{ c.name }} :</div>
                    <div class="trash trash--com">
                        <a v-if="c.user_id == user?.uid || user?.role == 'admin'" href="javascript:void(0)" aria-label="Supprimer le commentaire" @click="deleteCom(c.id, c.post_id)"><fa icon="trash-alt" /></a>
                    </div>
                </template>
                <template v-slot:comText>
                    <div  v-html="c.text"></div>
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
            color: $font-primary-color;
            &:hover {
                cursor: pointer;
                color: $alert-secondary-color;
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
            border-radius: 0 0 $border-primary $border-primary;
            border-bottom: 2px solid $primary-color;
            box-shadow:
            0px 0px 1.3px rgba(0, 0, 0, 0.1),
            0px 0px 10px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            padding: -2px;
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
            background-color: $bg-primary-color;
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
            background-color: $bg-secondary-color;
            border-radius: $border-secondary;
            box-sizing: border-box;
            border: 2px solid $primary-color;
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
            background-color: $bg-primary-color;
            white-space: pre-line;
        }
        & input {
            width: 75%;
            border: 0;
            background-color: $bg-primary-color;
            border-radius: $border-secondary 0 0 $border-secondary;
            min-height: 2rem;
            box-sizing: border-box;
        }
        & button {
            border-radius: 0 $border-secondary $border-secondary 0;
            border: 0;
            width: 25%;
            margin: 0;
            background-color: $primary-color;
            color: $font-secondary-color;
            font-weight: 600;
            &:hover {
                background-color: $secondary-color;
            }
            &--disabled {
                background-color: $secondary-color;
                &:hover {
                    cursor: default;
                }
            }
        }
    }

    .liked {
        color: red;
        &:hover {
            color: $secondary-color;
        }
    }

    .disliked {
        color: #ddd;
        &:hover {
            color: $secondary-color;
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