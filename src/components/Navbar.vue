<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/ninja.jpg">
            <h1>
                <router-link :to="{ name: 'Home' }">Muso Ninjas</router-link>
            </h1>
            <div class="links">
                <div v-if="user">
                    <router-link :to="{ name: 'CreatePlaylist' }">Create playlist</router-link>
                    <router-link :to="{ name: 'UserPlaylist' }">My playlist</router-link>
                    <span>Hi here, {{ user.displayName }}</span>
                    <button @click="handleClick">Logout</button>
                </div>
                <div v-if="!user">
                    <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
                    <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '@/composables/useLogout';
import getUser from '@/composables/getUser';

import { useRouter } from 'vue-router';
export default {
    setup() {
        const { logout } = useLogout();
        const { user } = getUser();
        const router = useRouter();
        const handleClick = async () => {
            await logout();
            router.push({ name: 'Login' });
            console.log('user logged out');
        };
        return {
            handleClick,
            user
        };
    }
};
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}

nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

nav h1 {
    margin-left: 20px;
}

nav .links {
    margin-left: auto;
}

nav .links a,
button {
    margin-left: 16px;
    font-size: 14px
}

nav img {
    max-height: 60px;
}

span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
}
</style>