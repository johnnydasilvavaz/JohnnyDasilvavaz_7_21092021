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
        background-color: $bg-primary-color;
        border-radius: $border-primary;
        border-bottom: 2px solid $primary-color;
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
        @media screen and (max-width: 497.9px) {
            max-width: 100%;
            border-radius: 0;
        }
    }
</style>