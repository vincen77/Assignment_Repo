<script setup lang="ts">
import { ref } from 'vue';
import session from '../stores/session';
import Modal from '../components/Modal.vue';

const showModal = ref(false)

const activity = ref({ title: '', date: '', duration: '', location: '', type: ''})

</script>

<template>
    <main> 
        <h1 class="title">Welcome {{session.user?.email}}!</h1>
        <h2 class="subtitle">Please add your workout(s) below!</h2>
    <div class="buttons">
        <button class="button button-custom" id="show-modal" @click="showModal = true">Add Activity</button>
        <Teleport to="body">
            <form id="workout" action="/myactivity" method="post">
                <modal :show="showModal" @close="showModal = false">
                <template #header>
                <h1 class="modal-card-title">Add Activity</h1>
                </template>

                <template #body>
                    <div class="form-group">
                    <label for="name"><b>Name of Activity</b></label>
                    <input type="text" id="activityname" class="form-control" v-model="activity.title"> -->
                    </div>
                    <div class="form-group">
                    <label for="date"><b>Date</b></label>
                    <!-- <input type="text" id="activityname" class="form-control" v-model="userData.activityname"> -->
                    </div>
                    <div class="form-group">
                    <label for="duration"><b>Duration</b></label>
                    <!-- <input type="text" id="activityname" class="form-control" v-model="userData.activityname"> -->
                    </div>
                    <div class="form-group">
                    <label for="location"><b>Locations</b></label>
                    <!-- <input type="text" id="activityname" class="form-control" v-model="userData.activityname"> -->
                    </div>
                    <div class="form-group">
                    <label for="type"><b>Type</b></label>
                    <!-- <input type="text" id="activityname" class="form-control" v-model="userData.activityname"> -->
                    </div>
                </template>

                <template #footer>
                </template>

            </modal>
            </form> 
        </Teleport>
    </div>
    </main>
</template>

<style scoped>

</style>