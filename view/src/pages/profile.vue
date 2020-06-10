<template>
    <v-ons-page>
        <div class="content">
            <div class="w-full p-10" style="text-align: center">
                {{ userName }}'s Profile
            </div>

            <!-- Three columns Tailwind class-->
            <div v-if="posts.length > 0" class="flex flex-wrap -mb-4">
                <div 
                    class="w-1/3"
                    v-for="post in posts" 
                    :key="post.id"
                ><img :src="'http://localhost:3000/uploads/' + post.image"></div>
            </div>    
        </div>
    </v-ons-page>
</template>

<script lang="ts">
import Vue from 'vue'
import * as superagent from 'superagent'

export default {
    props: {
        userName: {
            type: String
        },
        userID: {
            type: Number
        }
    },
    data() {
        return {
            posts: { type: Array }
        }
    },
    mounted() {
        superagent
            .get('http://localhost:3000/posts/own')
            .query({ userID: this.userID })
            .then((res: superagent.Response) => {
                // attach the results to the posts in our data
                // and that's it! Vue will update the DOM because it's binded
                this.posts = res.body
            }).catch((err: Error) => {
                alert(err)
            })
    }
}
</script>
