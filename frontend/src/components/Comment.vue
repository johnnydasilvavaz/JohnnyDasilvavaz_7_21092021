<template>
    <div class="com">
        <div class="com__avatar">
            <slot name="avatar" />
        </div>
        <div class="com__body">
            <div class="com__author">
                <slot name="header"/>
            </div>
            <div class="com__text">
                <slot name="comText"/>
            </div>
            <div class="com__date">
                <slot name="comDate"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Comment'
    }
</script>

<style lang="scss">
    .com {
        display: flex;
        width: calc(100% - 1rem);
        margin: .5rem;
        &__avatar {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: .2rem;
            margin-right: .5rem;
            overflow: hidden;
            & img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &__body {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            padding: .25rem;
            border-radius: .3rem;
            border: .1rem solid white;
            box-sizing: border-box;
        }
        &__header {
            display: flex;
            align-items: center;
        }
        &__author {
            display: flex;
            justify-content: space-between;
            font-size: .7rem;
            width: 100%;
        }
        &__text {
            font-size: .9rem;
            text-align: left;
            padding: .25rem 0;
        }
        &__date {
            font-family: roboto-light;
            font-size: .6rem;
            align-self: flex-end;
        }
    }
</style>