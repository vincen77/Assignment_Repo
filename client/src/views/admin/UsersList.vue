<script setup lang="ts">
    import { computed, reactive, ref, watch } from "vue";
    import { RouterLink } from "vue-router";
    import { deleteUser, getUsers, type User } from "@/stores/users";
    import session, { setError } from "@/stores/session";

    const users = ref([] as User[]);
    getUsers().then( x=> users.value = x.users);

    async function deleteUser2(user: User, index: number){
        if(confirm(`Are you sure that you want to delete '${user.name}'?`)){
            const result = await deleteUser(user._email)
            if(result.deletedCount){
                users.value.splice(index, 1);
                session.messages.push({ type: "success", text: `Successfully deleted  '${user.name}'`})
            }else{
                setError(`Couldn't delete '${user.name}'`);
            }
        }
    }

</script>

<template>
    <section>
        <RouterLink class="button is-success"  :to="`./user/new`" style="float: right">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <b>Add a User</b>    
        </RouterLink>
        <h1 class="title">Admin User List</h1>


        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Name</th>    
                    <th>Gender / Description</th>    
                    <th>Email</th>
                    <th>Actions</th>    
                </tr>
                
            </thead>
            <tbody>
                <tr v-for="u, i in users" :key="u._email">
                    <td>
                        <img :src="u.thumbnail" class="user-thumbnail" />
                        <b>{{ u.name }}</b> <br />
                        <RouterLink :to="{ name:'admin_user_images', params:{ email: u._email}}">
                            ({{ u.images?.length }}) more images
                        </RouterLink>
                        
                    </td>
                    <td>
                        <small class="light">
                            {{ u.gender }}
                        </small>
                        {{ u.description }}
                    </td>
                    <td>
                        {{ u.email }} 
                    </td>
                    <td>
                        <div class="buttons has-addons is-small">
                            <RouterLink class="button"  :to="`../user/${u._email}`" target="_blank" title="View as a user would see it" >
                                <span class="icon is-small">
                                    <i class="fas fa-eye"></i>
                                </span>
                            </RouterLink>
                            <RouterLink class="button"  :to="`./user/${u._email}`">
                                <span class="icon is-small">
                                    <i class="fas fa-edit"></i>
                                </span>
                            </RouterLink>
                            <a class="button" @click.prevent="deleteUser2(u, i)">
                                <span class="icon is-small">
                                    <i class="fas fa-trash-alt"></i>
                                </span>
                            </a>
                        </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>


<style scoped>
    section {
        margin-top: 10px;;
    }
    .user-thumbnail {
        max-width: 75px;
        max-height: 75px;
        float: left;
        padding: 5px;
        border: 1px solid cornflowerblue;
        border-radius: 5px;
        margin: 5px 10px;
    }
    small.light {
        display: block;
        opacity: .8;
    }
    .buttons {
        flex-wrap: nowrap;
    }
</style>