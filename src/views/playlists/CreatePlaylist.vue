<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Playlist title" v-model="title">
        <textarea required plceholder="Playlist description..." v-model="description"></textarea>
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>
        <button>Create</button>
    </form>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const title = ref('');
        const description = ref('');
        const file = ref(null);
        const types = ['image/png', 'image/jpeg'];
        const fileError = ref(null);
        const handleSubmit = () => {
            if (file.value) {
                console.log(title.value, description.value, file.value);
            }
        };

        const handleChange = (e) => {
            const selected = e.target.files[0];
            console.log(selected);
            if (selected && types.includes(selected.type)) {
                file.value = selected;
                fileError.value = null;
            } else {
                file.value = null;
                fileError.value = 'Please select an image  file(png or jpeg)';
            }
        };
        return {
            title,
            description,
            handleSubmit,
            handleChange,
            fileError
        };
    }
};
</script>

<style scoped>
input[type="file"] {
    border: 0;
    padding: 0;
}

label {
    display: block;
    font-size: 12px;
    margin-top: 30px
}

button {
    margin-top: 20px;
}
</style>