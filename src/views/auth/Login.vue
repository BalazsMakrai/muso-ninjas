<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div class="error" v-if="error">{{ error }}</div>
        <button v-show="!isPending">Log in</button>
        <button v-show="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import useLogin from '@/composables/useLogin';
import { ref } from 'vue';
export default {
    setup() {
        const { error, login, isPending } = useLogin();
        const email = ref('');
        const password = ref('');

        const handleSubmit = async () => {
            const res = await login(email.value, password.value);
            if (!error.value) {
                console.log('user logged in');
            }
        };
        return {
            error,
            login,
            email,
            password,
            handleSubmit,
            isPending
        };
    }
};
</script>

<style>

</style>