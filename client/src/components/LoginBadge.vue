<script setup lang="ts">
    import session, { login, logout } from '../stores/session'
    import Modal from './Modal.vue'
    import { ref } from 'vue'

    const showModal = ref(false)
    const showModal2 = ref(false)

    const isLoginMenuOpen = ref(false);

    const name = ref('');
    const email = ref('');
    const password = ref('');

    async function google_login() {
        const auth_client = google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: 'profile email ',           
          callback: async function(token:any) {               
            console.log({ token });
            const data = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${token.access_token}` },
            });
            const user = await data.json();
            console.log({ user });
            session.user = user;
          },
        });
        auth_client.requestAccessToken();
    }
</script>

<script lang="ts">
    declare const google: any;
</script>

<template>
    <div class="buttons" v-if="session.user == null">
        <button class="button button-custom" id="show-modal" @click="showModal = true" @click.prevent="google_login">Sign Up</button>

        <Teleport to="body">
        <form @submit.prevent="login(name, email, password)">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="showModal = false">
            <template #header>
                <h1 class="modal-card-title">Sign Up</h1>
            </template>
            <template #body>
                <p>Please fill in this form to create an account.</p>
            <br>
            <label for="name"><b>Name</b></label>
            <div class="control">
            <input class="input" type="name" placeholder="Enter Name" name="name" required v-model="name">
            </div>

            <label for="email"><b>Email</b></label>
            <div class="control">
            <input class="input" type="email" placeholder="Enter Email" name="email" required v-model="email">
            </div>

            <label for="psw"><b>Password</b></label>
            <div class="control">
            <input class="input" type="password" placeholder="Enter Password" name="psw" required v-model="password">
            </div>

            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input class="input" type="password" placeholder="Repeat Password" name="psw-repeat" required>
            
            <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>
            </template>
            
            <template #footer>
                <button class="button is-danger" @click="showModal = false">Cancel</button>
                <button type="submit" class="button is-primary">Submit</button>
            </template>

        </modal>
        </form>
        </Teleport>
        <button class="button button-custom" id="show-modal" @click="showModal2 = true" @click.prevent="google_login">Log In</button>

        <Teleport to="body">
        <form @submit.prevent="login(name, email, password)">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal2" @close="showModal2 = false">
            <template #header>
                <h1 class="modal-card-title">Login</h1>
            </template>
            <template #body>
                <p>Please enter Login information.</p>
            <br>
            <label for="name"><b>Name</b></label>
            <div class="control">
            <input class="input" type="name" placeholder="Enter Name" name="name" required v-model="name">
            </div>

            <label for="email"><b>Email</b></label>
            <div class="control">
            <input class="input" type="email" placeholder="Enter Email" name="email" required v-model="email">
            </div>

            <label for="psw"><b>Password</b></label>
            <div class="control">
            <input class="input" type="password" placeholder="Enter Password" name="psw" required v-model="password">
            </div>
            
            </template>

            <template #footer>
                <button class="button is-danger" @click="showModal = false">Cancel</button>
                <button type="submit" class="button is-primary">Submit</button>
            </template>

        </modal>
        </form>
        </Teleport>
    </div>
    <div v-else class="profile">
        <img :src="session.user.picture" />
        <span>
            Welcome {{session.user.name}}!
        </span>

        <a class="button button-logout" @click="logout()">
            <strong>Log Out</strong>
        </a>
    </div>
    <!-- <div v-else>
        <div class="avatar">
        Welcome {{session.user.firstName}} {{session.user.lastName}}
        </div>
        <a class="button button-logout" @click="logout()">
            <strong>Log Out</strong>
        </a>
    </div> -->

</template>

<!-- <div class="clearfix">
    <button class="button is-danger" @click="$emit('close')">Close</button>
    <button type="submit" class="button is-primary">Submit</button>
</div> -->
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
    .profile {
        display: flex;
        align-items: center
    }
    .profile img {
        border-radius: 50%;
        margin-right: 10px;
        margin-left: 10px;
    }
</style>