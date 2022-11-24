<template>
    <div class="error" v-if="error">{{ error }}</div>
    <div class="playlist-details" v-if="document">
        <div class="playlist-info">
            <div class="cover">
                <img :src="document.coverUrl">
            </div>
            <h2>{{ document.title }}</h2>
            <p class="username">Created by {{ document.userName }}</p>
            <p class="description">{{ document.description }}</p>
            <button v-if="ownerShip" @click="handleDelete">Delete playlist</button>
        </div>
        <div class="song-list">
            <p>song list here</p>
            <AddSong v-if="ownerShip" :playlist="document" />
        </div>
    </div>

</template>
<script>
import AddSong from '@/components/AddSong.vue';
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocuments';
import useStorage from '@/composables/useStorage';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: ['id'],
    components: { AddSong },
    setup(props) {
        const { user } = getUser();
        const { deleteDoc } = useDocument('playlists', props.id);
        const { error, document } = getDocument('playlists', props.id);
        const { deleteImage } = useStorage();
        const router = useRouter();
        const ownerShip = computed(() => {
            return document.value && user.value && user.value.uid == document.value.userId;
        });

        const handleDelete = async () => {
            await deleteImage(document.value.filePath);
            await deleteDoc();
            router.push({ name: 'Home' });
        };

        return {
            error,
            document,
            ownerShip,
            handleDelete
        };
    }
};
</script>

<style>
.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px
}

.cover {
    border-radius: 20px;
    position: relative;
    padding: 160px;
    overflow: hidden;
}

.cover img {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
}

.playlist-info {
    text-align: center;
}

.playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
}

.playlist-info p {
    margin-bottom: 20px;
}

.username {
    color: #999;
}

.description {
    text-align: left;
}
</style>

