<template>
    <form @submit.prevent="handleSubmit">
        <h3>Signup</h3>
        <input type="text" placeholder="Display name" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div class="error" v-if="error">{{ error }}</div>
        <button v-show="!isPending">Sign up</button>
        <button v-show="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/composables/useSignup';

export default {
    setup() {

        const { error, signup, isPeding } = useSignup();
        const email = ref('');
        const password = ref('');
        const displayName = ref('');

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value);
            if (!error.value) {
                console.log('user signed up');
            }
        };

        return {
            email,
            password,
            displayName,
            isPeding,
            handleSubmit,
            error
        };
    }
};
</script>
