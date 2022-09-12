<template>
    <main class="profile">
        <Modal v-if="showModal">
            <h2>Etes-vous sûrs de vouloir supprimer votre compte ?</h2>
            <p>Veuillez entrer votre mot de passe pour confirmer la suppression de votre compte :</p>
            <form class="modal__form" action="">
                <input type="password" placeholder="Votre mot de passe" v-model="password">
                <div>
                    <button class="btn" @click.prevent="showModal = false">Annuler</button>
                    <button class="btn btn--remove" @click.prevent="removeProfile()">Supprimer mon compte</button>
                </div>
                <Error v-if="invalidPass" :error="invalidPass"/>
            </form>
        </Modal>
        <div class="profile__container">
            <form class="profile__form" @submit.prevent="handleSubmit" v-if="user && user?.uid == id">
                <h2>Mon profil</h2>
                <div class="form__item">
                    <img class="profile__img" :src="user.avatar" alt="Ma photo de profil">
                    <input type="file" @change="setFile">
                </div>
                <div class="form__item">
                    <label for="forname">Prénom </label>
                    <input type="text" id="forname" :placeholder="user.forname" v-model="forname" @input="toggleBtn">
                </div>
                <div class="form__item">
                    <label for="name">Nom </label>
                    <input type="text" id="name" :placeholder="user.name" v-model="name" @input="toggleBtn">
                </div>
                <div class="form__item">
                    <label for="email">Email </label>
                    <input type="text" id="email" :placeholder="user.email" disabled>
                </div>
                <div class="form__item">
                    <button class="btn btn--remove" @click.prevent="showModal = true"><fa icon="trash-alt" /> Supprimer mon compte</button>
                    <button class="btn" :disabled="btnDisabled"><fa icon="save" /> Enregistrer</button>
                </div>
            </form>
            <Error v-if="error" :error="error" />
        </div>
        <div class="profile__card" v-if="user && user?.uid != id">
            <img class="profile__img" :src="avatar" alt="Photo de profil">
            <div class="profile__body">
                <span class="profile__name">{{ namePh }}</span>
                <span class="profile__forname">{{ fornamePh }}</span>
                <span class="profile__email">{{ email }}</span>
            </div>
        </div>
        <div class="posts">
            <Post class="post" v-for="p in posts" :key="p" :post="p" :com="p.com"/>
        </div>
    </main>
</template>

<script>
    import { mapGetters } from 'vuex'
    import axios from 'axios'
    import Modal from '../components/Modal.vue'
    import Post from '../components/Post.vue'
    import Error from '../components/Error.vue'
    import validator from 'validator'

    export default {
        name: 'Profile',
        data() {
            return {
                avatar: '',
                name: '',
                namePh: '',
                forname: '',
                fornamePh: '',
                file: null,
                showModal: false,
                btnDisabled: true,
                password: '',
                error: '',
                invalidPass: ''
            }
        },
        components : {
            Modal,
            Post,
            Error
        },
        props: ['id'],
        computed: {
            ...mapGetters(['user']),
            ...mapGetters(['posts'])
        },
        methods: {
            setFile(event) {
                this.file = event.target.files[0];
                this.toggleBtn()
            },
            toggleBtn() {
                if (this.file || (this.name != '' && this.name != this.user.name) || (this.forname != '' && this.forname != this.user.forname)) {
                    this.btnDisabled = false;
                } else {
                    this.btnDisabled = true;
                }
            },
            handleSubmit() {
                const formData = new FormData();
                if (this.name != '') {
                    if (!validator.isAlpha(validator.blacklist(this.name.toString(), "' -"))) {
                        return this.error = 'Le format du nom est incorrect';
                    }
                    formData.append('name', this.name);
                }
                if (this.forname != '') {
                    if (!validator.isAlpha(validator.blacklist(this.forname.toString(), "' -"))) {
                        return this.error = 'Le format du prénom est incorrect';
                    }
                    formData.append('forname', this.forname);
                }
                if (this.file != null) {
                    const MIME_TYPES = {
                        'image/jpg': 'jpg',
                        'image/jpeg': 'jpg',
                        'image/png': 'png',
                        'image/gif': 'gif'
                    };
                    if (!MIME_TYPES[this.file.type]) {
                        this.file = null;
                        this.toggleBtn();
                        return this.error = 'Seuls les fichiers jpeg, png et gif sont autorisés';
                    }
                    formData.append('image', this.file);
                    this.error = '';
                }
                const config = {
                    header: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }
                axios.put('me', formData, config)
                .then((res) => {
                    this.$store.dispatch('user', res.data.user);
                    this.$store.dispatch('getPersonalPosts', this.$route.params.id);
                    this.file = null;
                    this.name = '';
                    this.forname = '';
                    this.error = '';
                })
                .catch((error) => {
                    return error;
                });
            },
            removeProfile() {
                axios.delete('me', { data: { password: this.password }})
                .then(() => {
                    this.showModal = false;
                    this.invalidPass = '';
                    this.$store.dispatch("LOGOUT");
                    this.$router.push({name: 'Login'});
                })
                .catch(() => {
                    this.password = '';
                    return this.invalidPass = "Mot de passe incorrect";
                })
            },
            getPersonalProfile() {
                axios.get('me/' + this.$route.params.id)
                .then((res) => {
                    this.namePh = res.data[0].name;
                    this.fornamePh = res.data[0].forname;
                    this.email = res.data[0].email;
                    this.avatar = res.data[0].avatar;
                })
                .catch((error) => {
                    return error;
                });
            }
        },
        async created() {
            if (this.$store.getters.user.uid != this.$route.params.id) {
                this.getPersonalProfile();
            }
            this.$store.dispatch('getPersonalPosts', this.$route.params.id);                
        },
        mounted() {
            document.title = 'Groupomania - Profil';
        }
    }
</script>

<style lang="scss" scoped>
    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 3.5rem;
        &__container {
            margin-bottom: 3rem;
        }
        &__card {
            display: flex;
            min-width: 30rem;
            max-width: 30rem;
            margin-bottom: 3rem;
            background-color: $bg-primary-color;
            border-radius: $border-primary;
            border-bottom: 2px solid $primary-color;
            box-shadow:
            0px 2.3px 3.6px rgba(0, 0, 0, 0.024),
            0px 6.3px 10px rgba(0, 0, 0, 0.035),
            0px 15.1px 24.1px rgba(0, 0, 0, 0.046),
            0px 50px 80px rgba(0, 0, 0, 0.07);
            @media screen and (max-width: 497.9px) {
                max-width: 100%;
                min-width: 100%;
                border-radius: 0;
            }
        }
        &__img {
            width: 8rem;
            height: 8rem;
            margin: .5rem;
            border-radius: $border-secondary;
            object-fit: cover;
        }
        &__body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
        &__name {
            font-family: roboto-medium;
            font-size: 1.5rem;
            padding-bottom: .25rem;
        }
        &__forname {
            font-family: roboto;
            font-size: 1.5rem;
            padding-bottom: .25rem;
        }
        &__email {
            font-family: roboto-light;
        }
        &__form {
            display: flex;
            flex-direction: column;
            align-items: center;
            border-bottom: 2px solid $primary-color;
            max-width: 30rem;
            min-width: 30rem;
            padding: 0;
            box-shadow:
            0px 2.3px 3.6px rgba(0, 0, 0, 0.024),
            0px 6.3px 10px rgba(0, 0, 0, 0.035),
            0px 15.1px 24.1px rgba(0, 0, 0, 0.046),
            0px 50px 80px rgba(0, 0, 0, 0.07);
            @media screen and (max-width: 497.9px) {
                max-width: 100%;
                min-width: 100%;
                border-radius: 0;
            }
        }
    }

    .modal__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        max-width: 30rem;
        min-width: 20rem;
        & input {
            width: 100%;
        }
        @media screen and (max-width: 497.9px) {
            max-width: 100%;
            min-width: 100%;
        }
    }

    .posts {
        @media screen and (max-width: 497.9px) {
                max-width: 100%;
                min-width: 100%;
            }
    }
</style>