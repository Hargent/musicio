<template>
    <!-- Header -->
    <header id="header" class="bg-gray-700">
        <nav class="container mx-auto flex justify-start items-center py-5 px-4">
            <!-- App Name -->
            <router-link exact-active-class="no-active " class="text-white font-bold uppercase text-2xl mr-4"
                :to="{ name: 'home' }">Music</router-link>

            <div class="flex flex-grow items-center">
                <!-- Primary Navigation -->
                <ul class="flex flex-row mt-1">
                    <!-- Navigation Links -->
                    <template v-if="userLoggedIn">

                        <li>
                            <router-link class="px-2 text-white" :to="{ name: 'about' }">About</router-link>
                        </li>
                        <li>
                            <a class="px-2 text-white" href="#" @click.prevent="toggleLogoutModal">Logout</a>
                        </li>
                        <li>
                            <router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
                        </li>
                    </template>
                    <li v-else>
                        <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Login / Register</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script >
import { mapMutations, mapState } from "vuex"
export default {
    name: "AppHeader",
    computed: {
        ...mapState(['userLoggedIn', 'userData'])
    },
    methods: {

        ...mapMutations(['toggleAuthModal', 'toggleLogoutModal'])
        // toggleAuthModal() {
        //     this.$store.commit('toggleAuthModal')
        //     console.log(this.$store.state.showAuthModal)
        // }

    }
}

</script>
