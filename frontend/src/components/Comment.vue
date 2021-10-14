<template>
    <div class="com">
        <div class="com__header">
            <div class="com__avatar">
                <img :src="comAvatar" alt="">
            </div>
            <div class="com__author">
                {{ comAuthor }}
            </div>
        </div>
        <div class="com__text">
            {{ comText }}
        </div>
        <div class="com__date">
            {{ comDate }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Comment',
        data() {
            return {
                
            }
        },
        props: {
            comText: String,
            comAuthor: String,
            comDate: String,
            comAvatar: String
        }
    }
</script>

<style>
    .com {
        display: flex;
        flex-direction: column;
        width: calc(100% - 1rem);
        margin: .5rem;
        padding: .5rem;
        border-radius: .3rem;
        border: .1rem solid white;
        box-sizing: border-box;
    }

    .com__avatar {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: .3rem;
        margin-right: .5rem;
        overflow: hidden;
    }

    .com__avatar img {
        width: 100%;
        object-fit: cover;
    }

    .com__body {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: .5rem;
    }

    .com__header {
        display: flex;
        align-items: center;
    }

    .com__author {
        font-size: .8rem;
    }

    .com__text {
        font-size: .9rem;
        text-align: left;
        padding: .25rem;
    }

    .com__date {
        font-size: .6rem;
        align-self: flex-start;
    }
</style>