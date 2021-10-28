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
        font-family: roboto-medium;
        color: darkred;
    }
</style>