<template>
        <nav id="nav">
            <div class="nav__item nav__item--left">
                <router-link to="/"><img class="logo" alt="Vue logo" src="../assets/img/icon.png">Groupomania</router-link>
            </div>
            <div v-if="user" class="nav__item nav__item--home">
                <router-link to="/"><fa icon="home" /></router-link>
            </div>
            <div class="nav__item nav__item--right" v-if="!user">
                <router-link to="/login">Se connecter</router-link> |
                <router-link to="/signup">Créer un compte</router-link>
            </div>
            <div class="nav__item connected" v-else>
                <div class="nav__profile">
                    <router-link class="nav__name" :to="{name: 'Profile', params: {id: user.uid}}" v-if="user">{{ user.forname }} {{ user.name }}</router-link>
                    <a class="logoff" href="javascript:void(0)" @click="handleClick"><fa icon="times-circle"/> Se déconnecter</a>
                </div>
                <div class="avatar">
                    <router-link class="nav__name" :to="{name: 'Profile', params: {id: user.uid}}" v-if="user"><img :src="user.avatar" alt=""></router-link>
                </div>
            </div>
        </nav>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Nav',
        methods: {
            handleClick() {
                localStorage.removeItem('token');
                this.$store.dispatch('user', null);
                this.$router.push('/');
            }
        },
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style>
    #nav {
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100% - 2rem);
        height: 3rem;
        background-color: white;
        border-bottom: .1rem solid #091F43;
        box-shadow:
        0px 0px 1.4px rgba(0, 0, 0, 0.097),
        0px 0px 3.8px rgba(0, 0, 0, 0.126),
        0px 0px 9px rgba(0, 0, 0, 0.137),
        0px 0px 30px rgba(0, 0, 0, 0.14);
        overflow: hidden;
    }

    .nav__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .nav__item--home {
        justify-content: center;
        font-size: 2rem;
    }

    .nav__item--left {
        justify-content: flex-start;
    }

    .nav__item--left a {
        display: flex;
        align-items: center;
    }

    .nav__item--right {
        justify-content: flex-end;
    }

    .nav__item--right a {
        padding: 0 .5rem;
    }

    .nav__item a {
        text-decoration: none;
    }

    .nav__item a:hover {
        color: #D1515A;
    }

    .logo {
        height: 3rem;
        object-fit: cover;
    }

    .connected {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .logoff {
        font-family: roboto-light;
        text-decoration: none;
        font-size: 0.9rem;
    }

    .logoff:hover {
        color: #D1515A;
    }

    .avatar {
        height: 3rem;
        width: 3rem;
        background-color: #efefef;
        border-radius: .5rem;
        border: .1rem solid #091F43;
        box-sizing: border-box;
        overflow: hidden;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .nav__profile {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-right: .5rem;
    }

    .nav__name {
        text-decoration: none;
        padding-bottom: .5rem;
    }
</style>