<template>
    <form class="upost" @submit.prevent="handlePost">
        <div class="upost__avatar">
            <router-link class="nav__name" :to="{name: 'Profile', params: {id: user.uid}}"><img :src="user.avatar" alt=""></router-link>
        </div>
        <div class="upost__body">
            <textarea name="post" placeholder="Ecrivez un message ici" id="post" cols="20" rows="3" v-model="text" @input="toggleBtn"></textarea>
            <div class="upost__actions">
                <label class="btn btn--img" for="fileInput"><fa icon="images"/></label>
                <input id="fileInput" type="file"  @change="setFile">
                <button class="btn btn--submit" :disabled='btnDisabled'>Envoyer</button>
            </div>
        </div>
    </form>
</template>

<script>
    import axios from 'axios';
    import {mapGetters} from 'vuex';

    export default {
        name: 'NewPost',
        data() {
            return {
                text: '',
                file: null,
                btnDisabled: true
            }
        },
        methods: {
            setFile(event) {
                this.file = event.target.files[0];
                this.toggleBtn();
            },
            toggleBtn() {
                if (this.file || (this.text != '')) {
                    this.btnDisabled = false;
                } else {
                    this.btnDisabled = true;
                }
            },
            async handlePost() {
                const formData = new FormData();
                if (this.text != '') {
                    formData.append('text', this.text);
                }
                if (this.file != null) {
                    formData.append('image', this.file);
                }
                const config = {
                    header: {
                        'Content-Type' : 'multipart/form-data'
                    }
                }
                await axios.post('post', formData, config)
                .then((res) => {
                    this.text = '';
                    this.file = null;
                    this.btnDisabled = true
                    this.$store.dispatch('getPosts');
                    console.log(res);
                })
                .catch((error) => {
                    return error;
                });
            }
        },
        components: {
        },
        computed: {
            ...mapGetters(['user']),
        }
    }
</script>

<style>
    .upost {
        display: flex;
        max-width: 50rem;
        min-width: 30rem;
        max-height: 8rem;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: .5rem;
        margin-bottom: 3rem;
        margin-top: 2rem;
        padding: 0;
        box-shadow:
        0px 0px 1.3px rgba(0, 0, 0, 0.1),
        0px 0px 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }

    .upost__avatar {
        max-width: 8rem;
        max-height: 8rem;
        box-sizing: border-box;
        border-radius: .5rem 0 0 .5rem;
        background-color: darkgray;
        overflow: hidden;
    }

    .upost__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .upost textarea {
        font-family: roboto-medium;
        min-width: 100%;
        height: 6rem;
        resize: none;
        box-sizing: border-box;
        border: 0;
        border-radius: 0 .5rem 0 0;
        background-color: #efefef;
        padding: .5rem;
        margin: 0;
    }

    .upost textarea:focus {
        background-color: transparent;
        outline-offset: -.08rem;
    }

    .upost__body {
        width: 100%;
        height: 8rem;
    }

    .upost__actions {
        display: flex;
    }

    .btn--submit {
        box-sizing: border-box;
        width: 100%;
        border-radius: 0 .0 .5rem 0;
        border: 0;
        min-height: 2rem;
        background-color: #091F43;
        color: white;
        font-weight: 600;
        padding: 0;
        margin: 0;
    }

    .btn--submit:hover, .btn--img:hover {
        background-color: #244883;
    }

    .btn:disabled {
        background-color: #244883;
    }

    .btn:disabled:hover {
        cursor: default;
    }


    .btn--img {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0 .5rem;
        border: 0;
        border-right: .05rem solid white;
        border-radius: 0;
        box-sizing: border-box;
        background-color: #091F43;
        color: white;
    }

    #fileInput {
        display: none;
    }
</style>