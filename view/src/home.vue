<template>
    <div>
        <v-ons-page>
            <v-ons-toolbar>
                <div class="center">{{ title }}</div>
            </v-ons-toolbar>

            <v-ons-tabbar 
                swipeable position="auto" 
                :tabs="tabs" 
                :visible="true" 
                :index.sync="activeIndex"
            >
            </v-ons-tabbar>
        </v-ons-page>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import homePage from './pages/homepage.vue'
import camera from './pages/camera.vue'
import profile from './pages/profile.vue'

export default {
    data() {
        return {
            activeIndex: 0,
            tabs: [
                {
                    icon: 'fa-home',
                    label: 'Home',
                    page: homePage,
                    key: "homePage"
                }, 
                {
                    icon: 'fa-camera',
                    label: 'Home',
                    page: camera,
                    key: "camera"
                }, 
                {
                    icon: 'fa-user',
                    label: 'Home',
                    page: profile,
                    key: "profile"
                }, 
            ]
        }
    },
    computed: {
        title() {
            return this.tabs[this.activeIndex].label === 'Home' ? 'Basicgram' : this.tabs[this.activeIndex].label === 'Home'
        }
    }
}
</script>
