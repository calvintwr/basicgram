<template>
    <div class="flex justify-center content-center items-center h-full w-full">
        <div class="max-w-xs">
            <h1 class="text-center text-xl p-3">Welcome to Basicgram</h1>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Username"
                        v-model="userName"
                    >
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="******************">
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div class="flex items-center justify-center">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        :disabled="loginButtonDisabled"
                        @click="login"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as superagent from 'superagent'
import Not = require('you-are-not')

Not.defineType({
    primitive: 'string',
    type: 'valid-string',
    pass(string) {
        return string.length > 1
    }
})
const not = Not.create()

export default {
    data() {
        return {
            loginButtonDisabled: false,
            userName: ''
        }
    },
    methods: {
        login(event) {
            console.log(this.userName)

             // this will throw error and stop the operation
            not('valid-string', this.userName)

            // disable the button first and start
            this.loginButtonDisabled = true

            superagent
                .post('http://localhost:3000/users/add')
                .send({ name: this.userName })
                .end((err: Error, res: superagent.Response) => {

                    if (err) {
                        this.loginButtonDisabled = false
                        alert(err)
                        return
                    }

                    console.log(res)
                    this.$emit('login-success', res.body.name)

                })

        }
    }
}
</script>