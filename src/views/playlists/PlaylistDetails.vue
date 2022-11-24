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
            <button v-if="ownerShip">Delete playlist</button>
        </div>
        <div class="song-list">
            <p>song list here</p>
        </div>
    </div>

</template>
<script>

import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import { computed } from 'vue';
import CreatePlaylist from './CreatePlaylist.vue';
export default {
    props: ['id'],
    setup(props) {
        const { user } = getUser();
        const { error, document } = getDocument('playlists', props.id);
        const ownerShip = computed(() => {
            return document.value && user.value && user.value.uid == document.value.userId;
        });

        return {
            error,
            document,
            ownerShip
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

