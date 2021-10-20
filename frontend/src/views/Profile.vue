<template>
    <div class="profile">
        <Modal v-if="showModal" @close="showModal = false"/>
        <form class="profile__form" @submit.prevent="handleSubmit" v-if="user.uid == id">
            <h1>Mon profil</h1>
            <div class="form__item">
                <img class="profile__img" :src="user.avatar" alt="">
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
        <div class="profile__card" v-else>
            <img class="profile__img" :src="avatar" alt="">
            <div class="profile__body">
                <span class="profile__name">{{ name }}</span>
                <span class="profile__forname">{{ forname }}</span>
                <span class="profile__email">{{ email }}</span>
            </div>
        </div>
        <div class="posts">
            <Post class="post" v-for="p in posts" :key="p" :pavatar="p.pavatar" :pdate="p.pdate" :pforname="p.pforname" :pname="p.pname" :pid="p.pid" :ptext="p.ptext" :pcom="p" :plikes="p.plikes" :prole="p.prole" :puid="p.puid" :pimg="p.pimgUrl"/>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import axios from 'axios'
    import Modal from '../components/Modal.vue'
    import Post from '../components/Post.vue'

    export default {
        name: 'Profile',
        data() {
            return {
                avatar: '',
                name: '',
                forname: '',
                file: null,
                pageid: this.$route.id,
                showModal: false,
                btnDisabled: true
            }
        },
        components : {
            Modal,
            Post
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
            async handleSubmit() {
                const formData = new FormData();
                if (this.mename != '') {
                    formData.append('name', this.name);
                }
                if (this.meforname != '') {
                    formData.append('forname', this.forname);
                }
                if (this.file != null) {
                    formData.append('image', this.file);
                }
                const config = {
                    header: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }
                await axios.put('me', formData, config)
                .then((res) => {
                    this.$store.dispatch('user', res.data.user);
                    console.log(res);
                })
                .catch((error) => {
                    return error;
                });
            },
            async removeProfile(password) {
                await axios.delete('me', password)
                .then((res) => {
                    return res.status(200).json({message: 'Profil supprimé !'})
                })
                .catch((error) => {
                    return error;
                });
            }
        },
        async created() {
            if (this.$store.getters.user.uid != this.$route.params.id) {
                axios.get('me/' + this.$route.params.id)
                .then((res) => {
                    this.name = res.data[0].name;
                    this.forname = res.data[0].forname;
                    this.email = res.data[0].email;
                    this.avatar = res.data[0].avatar;
                })
                .catch((error) => {
                    return error;
                });
            }
            this.$store.dispatch('getPersonalPosts', this.$route.params.id);
        }
    }
</script>

<style>
    .profile {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 5rem;
    }

    .profile__card {
        display: flex;
        min-width: 30rem;
        max-width: 30rem;
        margin-top: 2rem;
        margin-bottom: 3rem;
        background-color: white;
        border-radius: .5rem;
        border-bottom: .1rem solid #091F43;
        box-shadow:
        0px 2.3px 3.6px rgba(0, 0, 0, 0.024),
        0px 6.3px 10px rgba(0, 0, 0, 0.035),
        0px 15.1px 24.1px rgba(0, 0, 0, 0.046),
        0px 50px 80px rgba(0, 0, 0, 0.07);
    }

    .profile__img {
        width: 8rem;
        height: 8rem;
        margin: .5rem;
        border-radius: .3rem;
        object-fit: cover;
    }

    .profile__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .profile__name {
        font-family: roboto-medium;
        font-size: 1.5rem;
        padding-bottom: .25rem;
    }

    .profile__forname {
        font-family: roboto;
        font-size: 1.5rem;
        padding-bottom: .25rem;
    }

    .profile__email {
        font-family: roboto-light;
    }

    .profile__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: .1rem solid #091F43;
        margin-bottom: 3rem;
        max-width: 30rem;
        min-width: 30rem;
        padding: 0;
        box-shadow:
        0px 2.3px 3.6px rgba(0, 0, 0, 0.024),
        0px 6.3px 10px rgba(0, 0, 0, 0.035),
        0px 15.1px 24.1px rgba(0, 0, 0, 0.046),
        0px 50px 80px rgba(0, 0, 0, 0.07);
    }
</style>