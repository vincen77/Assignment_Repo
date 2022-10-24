<script setup lang="ts">
    import session, { login, logout } from '../stores/session'
    import Modal from './Modal.vue'
    import { ref } from 'vue'

    const showModal = ref(false)
</script>

<template>
    <div class="buttons" v-if="session.user == null">
        <a class="button button-custom" id="show-modal" @click="showModal = true">Sign Up</a>

        <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false">
            <template #header>
            <h3>Sign Up!</h3>
            </template>
        </modal>
        </Teleport>
        <a class="button is-light" @click="login('Moshe', 'Plotkin')">
            Log in
        </a>
    </div>
    <div v-else>
        <div class="avatar">
        Welcome {{session.user.firstName}} {{session.user.lastName}}
        </div>
        <a class="button button-logout" @click="logout()">
            <strong>Log Out</strong>
        </a>
    </div>

</template>


<style scoped>
    .button-custom {
        background-color: rgb(138, 135, 135);
    }
    .button-logout {
        background-color:rgb(151, 47, 68);
        border-color: transparent;
        color: #fff;
    }
    .avatar {
        font-size: 16px;
    }
</style>