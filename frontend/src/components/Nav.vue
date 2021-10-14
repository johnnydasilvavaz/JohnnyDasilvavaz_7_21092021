<template>
        <nav id="nav">
            <div class="nav-item">
                <img class="logo" alt="Vue logo" src="../assets/img/icon.png">
                <router-link to="/">Accueil</router-link>
            </div>
            <div class="nav-item" v-if="!user">
                <router-link to="/login">Se connecter</router-link> |
                <router-link to="/signup">Créer un compte</router-link>
            </div>
            <div class="nav-item connected" v-else>
                <div class="nav__profile">
                    <router-link class="nav__name" :to="{name: 'Profile', params: {id: user.uid}}" v-if="user">{{ user.forname }} {{ user.name }}</router-link>
                    <a class="logoff" href="javascript:void(0)" @click="handleClick"><fa icon="times-circle"/> Se déconnecter</a>
                </div>
                <div class="avatar">
                    <img :src="user.avatar" alt="">
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
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        height: 2rem;
    }

    .connected {
        display: flex;
        align-items: center;
    }

    .logoff {
        text-decoration: none;
        font-size: 0.9rem;
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