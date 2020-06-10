<template>
    <v-ons-page>
        <p style="text-align: center">
            {{ userName }}'s Profile
        </p>
    </v-ons-page>
</template>

<script lang="ts">
import Vue from "vue"

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
        return {}
    }
}
</script>
