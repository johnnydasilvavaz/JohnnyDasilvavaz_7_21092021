<template>
    <form class="upost" @submit.prevent="handlePost">
        <div class="upost__avatar">
            <img :src="user.avatar" alt="">
        </div>
        <div class="upost__body">
            <textarea name="post" placeholder="Ecrivez un message ici" id="post" cols="30" rows="4" v-model="text"></textarea>
            <div class="upost__actions">
                <label class="btn btn--img" for="fileInput"><fa icon="images"/></label>
                <input id="fileInput" type="file"  @click="handleImage">
                <button v-if="text != ''" class="btn btn--submit">Envoyer</button>
                <button v-if="text == ''" class="btn btn--submit btn--disabled" disabled>Envoyer</button>
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
                text: ''
            }
        },
        methods: {
            async handlePost() {
                await axios.post('post', {text: this.text})
                .then((res) => {
                    console.log(res);
                    this.text = '';
                    this.$store.dispatch('getPosts');
                })
                .catch();
            }
        },
        computed: {
            ...mapGetters(['user'])
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
        border-bottom: .1rem solid #091F43;
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

    .btn--disabled {
        background-color: #244883;
    }

    .btn--disabled:hover {
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