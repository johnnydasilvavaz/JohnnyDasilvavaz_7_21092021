<template>
    <div class="navcontainer">
        <nav class="nav">
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
                    <router-link class="nav__name" :to="{name: 'Profile', params: {id: user?.uid}}">{{ user.forname }} {{ user.name }}</router-link>
                    <a class="logoff" href="javascript:void(0)" @click="handleClick"><fa icon="times-circle"/> Se déconnecter</a>
                </div>
                <div class="avatar">
                    <router-link class="nav__name" :to="{name: 'Profile', params: {id: user?.uid}}"><img :src="user.avatar" alt=""></router-link>
                </div>
            </div>
        </nav>
    </div>
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
        border-bottom: .1rem solid #091F43;
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
            width: 100%;
            &--home {
                justify-content: center;
                font-size: 2rem;
            }
            &--left {
                justify-content: flex-start;
                & a {
                    display: flex;
                    align-items: center;
                }
            }
            &--right {
                justify-content: flex-end;
                & a {
                    padding: 0 .5rem;
                }
            }
            & a {
                text-decoration: none;
                &:hover {
                    color: #D1515A;
                }
            }
        }
        & a {
            font-weight: bold;
            color: #2c3e50;
            &:hover {
            color: #244883;
            }
            &.router-link-exact-active {
            color: #42b983;
            }
        }
        &__profile {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding-right: .5rem;
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

    .connected {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .logoff {
        font-family: roboto-light;
        text-decoration: none;
        font-size: 0.9rem;
        &:hover {
            color: #D1515A;
        }
    }

    .avatar {
        height: 3rem;
        width: 3rem;
        background-color: #efefef;
        border-radius: .5rem;
        border: .1rem solid #091F43;
        box-sizing: border-box;
        overflow: hidden;
        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>