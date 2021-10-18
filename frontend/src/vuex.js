import { createStore } from 'vuex'
import axios from 'axios' 

const store = createStore({
    state: {
        status: '',
        user: JSON.parse(localStorage.getItem('user')) || null,
        posts: null,
        token: localStorage.getItem('token') || ''
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
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
        LOGIN({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST');
                axios.post('auth/login', {
                    email: user.email,
                    password: user.password
                })
                .then((res) => {
                    const token = res.data.token;
                    const user  = res.data.user;
                    console.log(user);
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log(localStorage.getItem('user'));
                    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
                    commit('AUTH_SUCCESS', token, user);
                    resolve(res);
                })
                .catch(err => { 
                    commit('AUTH_ERROR');
                    reject(err);
                })
            })
        },
        LOGOUT({ commit }) {
            return new Promise((resolve) => {
                commit('AUTH_LOGOUT');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                delete axios.defaults.headers.common['Authorization'];
                resolve();
            })
        },
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
        AUTH_REQUEST(state) {
            state.status = 'loading';
        },
        AUTH_SUCCESS(state, token, user) {
            state.status = 'success';
            state.token = token;
            state.user = user;
        },
        AUTH_ERROR(state) {
            state.status = 'error';
        },
        AUTH_LOGOUT(state) {
            state.status = '';
            state.token = '';
            state.user = null;
        },
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