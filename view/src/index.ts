import Vue from 'vue'

// Onsen
import * as Onsen from 'vue-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
Vue.use(Onsen)

import HomePage from './home.vue'

// other styles
import './styles.scss'

export class App {
    constructor(selector: string){
        new Vue({
            render: (createElement) => createElement(HomePage)
        }).$mount(selector)
    }
}

const app = new App('#app');
