<template>
    <div class="profile">
        <form class="profile__form" @submit.prevent="handleSubmit">
            <h1>Votre profil</h1>
            <div class="form__item">
                <img class="profile__img" :src="user.avatar" alt="">
                <input type="file" @change="setFile">
            </div>
            <div class="form__item">
                <label for="forname">Prénom </label>
                <input type="text" id="forname" :placeholder="user.forname" v-model="forname">
            </div>
            <div class="form__item">
                <label for="name">Nom </label>
                <input type="text" id="name" :placeholder="user.name" v-model="name">
            </div>
            <div class="form__item">
                <label for="email">Email </label>
                <input type="text" id="email" :placeholder="user.email" disabled>
            </div>
            <div class="form__item">
                <label for="password">Nouveau mot de passe </label>
                <input type="password" id="password" placeholder="Votre nouveau mot de passse" v-model="password">
            </div>
            <div class="form__item">
                <label for="passwordConfirm">Confirmez le mot de passe </label>
                <input type="password" id="password" placeholder="Confirmation du mot de passse" v-model="passwordConfirm">
            </div>
            <button class="btn">Enregistrer</button>
        </form>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import axios from 'axios'

    export default {
        name: 'Profile',
        data() {
            return {
                name: '',
                forname: '',
                password: '',
                passwordConfirm: '',
                file: null,
                header: {}
            }
        },
        props: ['id'],
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            setFile(event) {
                this.file = event.target.files[0];
            },
            handleSubmit() {
                const data = new FormData();
                if (this.name != '') {
                    data.append('name', this.name);
                }
                if (this.forname != '') {
                    data.append('forname', this.forname);
                }
                if (this.password != '' && this.passwordConfirm != '' && this.password == this.passwordConfirm) {
                    data.append('password', this.password);
                }
                if (this.file != null) {
                    data.append('file', this.file);
                }
                const config = {
                    header: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }
                axios.put('me', data, config);
            }
        }
    }
</script>

<style>
    .profile {
        display: flex;
        justify-content: center;
    }

    .profile__img {
        width: 8rem;
        height: 8rem;
        border-radius: .5rem;
    }

    .profile__form {
        border-bottom: .1rem solid #091F43;
        box-shadow:
        0px 2.3px 3.6px rgba(0, 0, 0, 0.024),
        0px 6.3px 10px rgba(0, 0, 0, 0.035),
        0px 15.1px 24.1px rgba(0, 0, 0, 0.046),
        0px 50px 80px rgba(0, 0, 0, 0.07);
    }
</style>