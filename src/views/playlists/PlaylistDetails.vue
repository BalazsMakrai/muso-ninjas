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
            <div v-if="!document.songs.length">No songs have neen added to this playlist yet</div>
            <div class="single-song" v-for="song in document.songs" :key="song.id">
                <div class="details">
                    <h3>{{ song.title }}</h3>
                    <p>{{ song.artist }}</p>
                </div>
                <button v-if="ownerShip" @click="handleClick(song.id)">Delete</button>
            </div>
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
        const { deleteDoc, updateDoc } = useDocument('playlists', props.id);
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

        const handleClick = async (id) => {
            const songs = document.value.songs.filter(song => song.id != id);
            await updateDoc({ songs: songs });
        };

        return {
            error,
            document,
            ownerShip,
            handleDelete,
            handleClick

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

.single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
}
</style>

