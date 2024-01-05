<template>
    <div class=" absolute w-full backdrop-blur-sm top-0 left-0 h-screen flex items-center justify-center shadow-gray-700 shadow-xl"
        :class="{ hidden: !showLogoutModal }">
        <div class=" w-full sm:w-3/5  p-4 mx-auto flex flex-col items-center justify-center space-y-4 bg-white rounded-lg">

            <p>Do you want to logout ?</p>
            <div class=" flex items-center justify-center space-x-4">

                <button
                    class=" p-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:text-white text-blue-500 "
                    @click.prevent="toggleLogoutModal">cancel</button>
                <button
                    class=" p-2 rounded-lg transition-colors border border-blue-500 duration-300 ease-in-out hover:bg-blue-500 hover:text-white text-blue-500 "
                    @click.prevent="logout">confirm</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    computed: {
        ...mapState(['showLogoutModal'])
    },

    methods: {
        ...mapMutations(['toggleLogoutModal']),

        ...mapActions(['logout'])
    }

};
</script>
