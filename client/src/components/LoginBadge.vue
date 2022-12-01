<script setup lang="ts">
    import session, { login, logout } from '../stores/session'
    import Modal from './Modal.vue'
    import { ref } from 'vue'

    const showModal = ref(false)

    const isLoginMenuOpen = ref(false);
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
        <div class="dropdown" :class="{ 'is-hoverable' : isLoginMenuOpen}">
            <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4" @click="isLoginMenuOpen = !isLoginMenuOpen">
                <span>Login</span>
                <span class="icon is-small">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                <div class="dropdown-content">
                <a href="#" class="dropdown-item" @click="login('Vincent', 'Miranda')">
                    Vincent Miranda
                </a>
                <a href="#" class="dropdown-item" @click="login('Billy', 'Smith')">
                    Billy Smith
                </a>
                <a href="#" class="dropdown-item" @click="login('Moshe', 'Plotkin')">
                    Moshe Plotkin
                </a>
                </div>
            </div>
            </div>
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

<!-- <div class="button" aria-haspopup="true" aria-controls="dropdown-menu">
    <div class="dropdown is-active">
        <div class="dropdown-trigger">
            <span>Log In</span>
            <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
            <div v-if="session.user == null" class="dropdown-menu" id="dropdown-menu" role="menu" dropdown="isActive">
                <div class="dropdown-content">
                    <a href="#" class="dropdown-item" @click="login('Vincent', 'Miranda')">
                        Vincent Miranda
                    </a>
                    <a href="#" class="dropdown-item" @click="login('Billy', 'Smith')">
                    Billy Smith
                    </a>
                    <a href="#" class="dropdown-item" @click="login('Moshe', 'Plotkin')">
                        Moshe Plotkin
                    </a>
                </div>
            </div>
        </div>
    </div>
</div> -->

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