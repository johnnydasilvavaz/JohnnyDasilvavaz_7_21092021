<template>
    <div class="error" role="alert">
        {{ error }}
    </div>
</template>

<script>
    export default {
        name: 'Error',
        props : [
            'error'
        ]
    }
</script>

<style lang="scss" scoped>
    .error {
        display: flex;
        justify-content: center;
        font-family: roboto-medium;
        color: $alert-primary-color;
    }
</style>