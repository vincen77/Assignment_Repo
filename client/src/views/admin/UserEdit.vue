<script setup lang="ts">
    import session, { api, isLoading, setError } from "@/stores/session";
    import { ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import ModalVue from "@/components/Modal.vue";

    import { addUser, getUser, updateUser, type User } from "@/stores/users";

    const route = useRoute();
    const router = useRouter();
    
    const user = ref({} as User);
    const isNew = ref(route.params.id == 'new')

    if(!isNew.value){
        getUser(route.params.id as string).then(x => {
            if(x){
                user.value = x            
            }else{
                isNew.value = true;
            }

        });        
    }

    const gender = ref(['Male', 'Female']);
    api<string[]>('users/gender').then(x=> gender.value = x);

    async function save(){
        try {
            if(isNew.value){
                const data = await addUser(user.value);
                session.messages.push({ type: "success", text: `Successfully inserted ${data.name}`})
            }else{
                const data = await updateUser(user.value._id, user.value);
                session.messages.push({ type: "success", text: `Successfully updated ${data.name}`})
            }
            await router.push({ name: 'admin_users' });
        } catch (error) {
            //setError(error as string); being set in the api function
        }
    }

   async function cancel() {
    await router.push({ name: 'admin_users' });    
   } 
</script>

<template>
    <div class="columns">

        <div class="column is-three-quarters">
            <form class="modal-card" @submit.prevent="save">
                <header class="modal-card-head">
                    <p class="modal-card-title">
                        {{ isNew ? 'New' : 'Edit' }} User 
                    </p>
                    
                </header>
                <section class="modal-card-body">
                
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Name</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-expanded has-icons-left">
                                    <input class="input" type="text" placeholder="Ex: John Smith" v-model="user.name">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Email</label>
                        </div>
                        <div class="field-body">
                                <div class="field has-addons">
                                    <p class="control">
                                    </p>
                                    <p class="control is-expanded">
                                        <input class="input" type="tel" placeholder="email"  v-model="user.email">
                                    </p>
                                </div>
                        </div>
                    </div>
                    

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Gender</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select  v-model="user.gender">
                                            <option :value="undefined">-- Please Select a Gender --</option>
                                            <option v-for="b in gender" :key="b">{{b}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Thumbnail</label>
                        </div>
                        <div class="field-body">
                            <div class="field  has-addons">
                                <div class="control is-expanded">
                                    <input class="input" type="text" placeholder="Complete URL" v-model="user.thumbnail">
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Description</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <textarea class="textarea" placeholder="Full description of User" v-model="user.description"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success">Save changes</button>
                        <button class="button" @click.prevent="cancel">Cancel</button>
                    </footer>
                </form>
            </div>
        <div class="column card">
            <div class="card-content">
                <h3 class="title">{{ user.name }}</h3>
                <div class="User-image">
                    <img :src="user.thumbnail" :alt="user.name" />
                </div>
                <div class="user-info">

                    <p class="id subtitle">
                        <span class="text">{{ user.email }}</span>
                    </p>
                    <p>{{ user.description }}</p>
                
                </div>

            </div>
        </div>
    </div>
    
</template>

<style scoped>
    .modal-card {
        width: 100%;
    }
</style>