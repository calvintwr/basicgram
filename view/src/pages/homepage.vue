<template>
    <v-ons-page>
        <div class="content">
            <div v-if="posts.length > 0">
                <v-ons-card v-for="post in posts" :key="post.id">
                    <img class="w-full" :src="'http://localhost:3000/uploads/' + post.image">
                    <div class="py-1 content">
                        <p class="text-xs font-bold py-2">{{ post.User.name }}<p>
                        <p class="text-xs text-gray-700">{{ post.caption }}</p>

                    </div>
                </v-ons-card>
            </div>
        </div>
    </v-ons-page>
</template>

<script lang="ts">
import Vue from 'vue'
import * as superagent from 'superagent'

export default {
    props: {
        userID: {
            type: Number
        }
    },
    data() {
        return {
            posts: { type: Array }
        }
    },
    created() {
        superagent
            .get('http://localhost:3000/posts/feed')
            .query({ userID: this.userID })
            .then((res: superagent.Response) => {
                this.posts = res.body
            }).catch((err: Error) => {
                alert(err)
            })
    }
}
</script>