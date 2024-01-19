<template>
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">Upload</span>
            <font-awesome-icon icon="trash-alt" />

            <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
            <div class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
                border-gray-400 text-gray-400 transition duration-500 hover:text-white
                hover:bg-green-400 hover:border-green-400 hover:border-solid"
                :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }" @drag.prevent.stop=""
                @dragenter.prevent.stop="is_dragover = true" @dragend.prevent.stop="is_dragover = false"
                @dragover.prevent.stop="is_dragover = true" @drop.prevent.stop="upload($event)"
                @dragleave.prevent.stop="is_dragover = false" @dragstart.prevent.stop="">
                <h5>Drop your files here</h5>
                <font-awesome-icon icon="tarp-droplet" />
            </div>
            <hr class="my-6" />
            <div class="mb-4" v-for="upload in   uploads  " :key="upload.name">
                <div class="font-bold text-sm">
                    <div class=" flex items-center justify-start space-x-2 text-blue-400 uppercase text-xs"
                        v-if="upload.progress !== '100%'">

                        <font-awesome-icon icon="spinner" class="0 animate-spin " />
                        <span>{{ upload.status }}<span class=" animate-ping duration-500 ease-in-out">.</span><span
                                class=" animate-ping duration-600 ease-in-out">.</span><span
                                class=" animate-ping duration-700 ease-in-out ">.</span></span>
                    </div>
                    <div class=" flex items-center justify-start space-x-2 text-green-400 uppercase text-xs" v-else>

                        <font-awesome-icon icon="circle-check" class=" animate-pulse" />
                        <span>{{ upload.status }}</span>
                    </div>

                    <div class="  flex items-center justify-start space-x-2"
                        :class="{ 'text-green-400': upload.progress === '100%', 'text-blue-400': upload.progress !== '100%' }">
                        <font-awesome-icon icon="music" />

                        <p class=" overflow-hidden text-ellipsis ">{{ upload.name }}</p>
                    </div>
                </div>
                <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                    <div class="transition-all progress-bar " :style="{ width: upload.progress }"
                        :class="{ 'bg-blue-400': upload.progress !== '100%', 'bg-green-400': upload.progress === '100%' }">
                    </div>
                </div>
            </div>
            <!-- <div class="mb-4">
                <div class="font-bold text-sm">Just another song.mp3</div>
                <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                    <div class="transition-all progress-bar bg-blue-400" style="width: 35%"></div>
                </div>
            </div>
            <div class="mb-4">
                <div class="font-bold text-sm">Just another song.mp3</div>
                <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                    <div class="transition-all progress-bar bg-blue-400" style="width: 55%"></div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "Upload",
    computed: {

        ...mapState(['uploads'])
    },
    data() {

        return ({
            is_dragover: false
        }
        )
    },
    methods: {
        // async upload($event) {
        //     this.is_dragover = false;
        //     const files = [...$event.dataTransfer.files];

        //     // Filter out files that are not of type "audio/mpeg"
        //     const audioFiles = files.filter(file => file.type === "audio/mpeg");

        //     console.log(audioFiles.length);

        //     if (audioFiles.length > 0) {
        //         try {
        //             await this.$store.dispatch("uploadFiles", {
        //                 files: audioFiles,
        //                 bucketName: "musics",
        //             });

        //             // Do something after all files are uploaded, if needed
        //         } catch (error) {
        //             console.error("Error uploading files:", error.message);
        //             // Handle error appropriately
        //         }
        //     }
        // },
        upload($event) {
            this.is_dragover = false
            const files = [...$event.dataTransfer.files]
            console.log(files.length);


            // this.$store.dispatch("uploadFile", { bucketName: "musics", file: files[0] })

            files.forEach(file => {
                if (file.type !== "audio/mpeg") {
                    return;
                }
                // console.log("This is the file dropped : ", file.name);
                this.$store.dispatch("uploadFile", { bucketName: "musics", file: file })
            });

        }
    }
};
</script>

