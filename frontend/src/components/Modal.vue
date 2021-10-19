<template>
    <div class="modal__back">
        <div class="modal" @submit.prevent="handleSubmit">
            <h2>Etes-vous sûrs de vouloir supprimer votre compte ?</h2>
            <p>Veuillez entrer votre mot de passe pour confirmer la suppression de votre compte :</p>
            <form class="modal__form" action="">
                <input type="password" placeholder="Votre mot de passe" v-model="password">
                <button class="btn" @click.prevent="$emit('close')">Annuler</button>
                <button class="btn btn--remove" @click.prevent="$emit(removeProfile(password))">Supprimer mon compte</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        data() {
            return {
                password: ''
            }
        },
        methods: {
            handleSubmit() {

            },
            cancel() {

            }
        }
    }
</script>

<style>
    .modal__back {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 5;
    }

    .modal {
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: .5rem;
        padding: .5rem;
        max-width: 30rem;
    }

    .btn--modal {
        position: relative;
        align-self: flex-end;
        top: 0;
        right: 0;
        width: 2rem;
        height: 2rem;
    }

    .modal__form {
        margin: 0;
        max-width: 30rem;
        min-width: 20rem;
    }
</style>