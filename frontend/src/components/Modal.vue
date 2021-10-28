<template>
    <div class="modal__back">
        <div class="modal">
            <slot/>
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal {
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: .5rem;
        border-bottom: .1rem solid #091F43;
        padding: 1rem;
        max-width: 30rem;
        &__back {
            position: fixed;
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
    }
</style>