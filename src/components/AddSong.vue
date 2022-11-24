<template>
    <div class="add-song">
        <button v-show="!showForm" @click="showForm = true">Add songs</button>
        <form v-show="showForm" @submit.prevent="handleSubmit">
            <h4>Add a New Song</h4>
            <input type="text" required placeholder="Song title" v-model="title">
            <input type="text" required placeholder="Artist" v-model="artist">
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const title = ref('');
        const artist = ref('');
        const showForm = ref(false);

        const handleSubmit = async () => {
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 1000000)
            };
            console.log(newSong);
        };
        return {
            title,
            artist,
            showForm,
            handleSubmit
        };
    }
};
</script>
<style scoped>
form {
    max-width: 100%;
    text-align: left;
}

.add-song {
    text-align: center;
    margin-top: 40px;
}
</style>