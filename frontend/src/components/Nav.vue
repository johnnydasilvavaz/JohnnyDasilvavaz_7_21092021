<template>
    <header class="navcontainer">
        <nav class="nav">
            <div class="nav__item nav__item--left">
                <router-link to="/"><img class="logo" alt="Accueil" src="../assets/img/icon.png"><h1 class="groupomania">Groupomania</h1></router-link>
            </div>
            <div v-if="user" class="nav__item nav__item--home">
                <router-link aria-label="Accueil" to="/"><fa icon="home" /></router-link>
            </div>
            <div class="nav__item nav__item--right" v-if="!user">
                <router-link to="/login">Se connecter</router-link> |
                <router-link to="/signup">Créer un compte</router-link>
            </div>
            <div class="nav__item connected" v-else>
                <div class="nav__profile">
                    <router-link class="nav__name" :to="{name: 'Profile', params: {id: user?.uid}}">{{ user.forname }} {{ user.name }}</router-link>
                    <a class="logoff" href="javascript:void(0)" @click="handleClick"><fa icon="times-circle"/> Se déconnecter</a>
                </div>
                <div class="avatar">
                    <router-link class="nav__name" :to="{name: 'Profile', params: {id: user?.uid}}"><img :src="user.avatar" alt="Ma photo de profil"></router-link>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Nav',
        methods: {
            handleClick() {
                this.$store.dispatch("LOGOUT")
                .then(this.$router.push('/login'));
            }
        },
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style lang="scss" scoped>
    .navcontainer {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3.5rem;
        width: 100%;
        background-color: white;
        border-bottom: 2px solid $primary-color;
        box-shadow:
        0px 0px 1.4px rgba(0, 0, 0, 0.097),
        0px 0px 3.8px rgba(0, 0, 0, 0.126),
        0px 0px 9px rgba(0, 0, 0, 0.137),
        0px 0px 30px rgba(0, 0, 0, 0.14);
        overflow: hidden;
    }

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 73rem;
        padding: .5rem 1rem;
        &__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &--home {
                justify-content: center;
                font-size: 2rem;
                width: 20%;
                @media screen and (max-width: 639.9px) {
                    display: none;
                }
            }
            &--left {
                justify-content: flex-start;
                width: 40%;
                @media screen and (max-width: 639.9px) {
                    width: 20%;
                }
                & a {
                    display: flex;
                    align-items: center;
                }
            }
            &--right {
                justify-content: flex-end;
                width: 40%;
                & a {
                    padding: 0 .25rem;
                    text-align: center;
                }
                @media screen and (max-width: 639.9px) {
                    width: 80%;
                }
            }
        }
        & a {
            text-decoration: none;
            font-weight: bold;
            color: $primary-color;
            &:hover {
                color: $secondary-color;
            }
            &.router-link-exact-active {
                color: teal;
            }
        }
        &__profile {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding-right: .5rem;
            & .logoff:hover {
                color: $alert-secondary-color;
            }
        }
        &__name {
            text-decoration: none;
            padding-bottom: .5rem;
        }
    }

    .logo {
        height: 3rem;
        object-fit: cover;
    }

    .groupomania {
        font-size: 1rem;
        margin: 0;
        @media screen and (max-width: 639.9px) {
            display: none;
        }
    }

    .connected {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 40%;
        @media screen and (max-width: 639.9px) {
            width: 80%;
        }
    }

    .logoff {
        font-family: roboto-light;
        text-decoration: none;
        font-size: 0.9rem;
        &:hover {
            color: $alert-secondary-color;
        }
    }

    .avatar {
        height: 3rem;
        width: 3rem;
        background-color: $bg-secondary-color;
        border-radius: $border-primary;
        border: 2px solid $primary-color;
        box-sizing: border-box;
        overflow: hidden;
        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>