import { createStore } from 'vuex'
import axios from 'axios'

const state = {
    user: null,
    posts: null,
    token: localStorage.getItem('token') || ''
}

const store = createStore({
    state,
    getters: {
        user: (state) => {
            return state.user;
        },
        posts: (state) => {
            return state.posts;
        },
        token: (state) => {
            return state.token;
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user);
        },
        async getPosts(context) {
            await axios.get('post')
            .then((res) => {
                context.commit('posts', res.data);
                
            })
            .catch((error) => {
                return error;
            })
        },
        async getProfile(context) {
            await axios.get('me')
            .then((res) => {
                context.commit('user', res.data.user);
            })
            .catch((error) => {
                return error;
            });
        },
        token(context, token) {
            context.commit('token', token);
            console.log(token);
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        posts(state, posts) {
            state.posts = posts;
        },
        token(state, token) {
            state.token = token;
        }
    }
})

export default store