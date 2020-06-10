<template>
    <v-ons-page>
        <div class="container text-center  mx-auto p-1">
            <!-- attach the #readFile method to change event -->
            <input 
                type="file" 
                capture="camera" 
                accept="image/*" 
                id="cameraInput" 
                name="cameraInput"
                @change="readFile"
            >
            <img class="py-2" ref="image">

            <!-- textarea's `ref` is a Vue reference which will be handy -->
            <textarea 
                class="py-2 w-full textarea" 
                rows="3" 
                placeholder="Write your caption"
                ref="caption" 
            ></textarea>

            <!-- we attach #post method to this button, which is for uploading the post -->
            <button 
                class="my-2 button"
                @click="post" 
                :disabled="buttonDisabled"
            >Post</button>
        </div>
        
    </v-ons-page>
</template>

<script lang="ts">
import Vue from "vue"
import Blitz = require('blitz-resize')
import * as superagent from 'superagent'
const blitz = Blitz.create()

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
            image: { type: Blob }, // this is to store our image
            buttonDisabled: true // a flag to turn our button on/off
        }
    },
    methods: {
        readFile(event) {
            let file = event.srcElement.files[0] // this is where HTML file input puts the file
            let self = this
            let output;

            // we will 
            blitz({
                source: file,
                height: 640,
                width: 640,
                outputFormat: 'jpg',
                // we will use data because we want to update the image in the DOM
                output: 'data', 
                quality: 0.8
            }).then(data => {

                // upate the image so that user sees it.
                self.$refs["image"].src = data

                // prepare the Blob. Blitz internally has a #dataURItoBlob method.
                self.image = Blitz._dataURItoBlob(data) 
    
                self.buttonDisabled = false
            }).catch(err => {
                console.log(err)
            })

        },
        post(event) {
            let self = this
            this.buttonDisabled = true
            let caption = this.$refs["caption"].value // using Vue's $ref property to get textarea.

            // Note: To upload image, the request type will be "multipart"
            // Superagent automatically takes care of that and you need to
            // use `field` for text/plain info, and `attach` for files 
            superagent
                .post('http://localhost:3000/posts/add')
                .field('userID', this.userID)
                .field('caption', caption)
                .attach('photo', this.image)
                .then((res: superagent.Response) => {
                    alert('Successful post. Go to your profile to see it.')
                }).catch((err: Error) => {
                    this.buttonDisabled = false
                    alert(err)
                })
        }
    }
}
</script>
