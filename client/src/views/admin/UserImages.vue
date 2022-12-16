<script setup lang="ts">
    import { isLoading } from "@/stores/session";
    import { ref } from "vue";
    import { useRoute } from "vue-router";

    import { getUser, type User } from "@/stores/users";

    const route = useRoute();
    
    const user = ref({} as User);

    getUser(route.params.id as string).then(x => {
        if(x){
            user.value = x            
        }

    });


</script>

<template>
    <h3 class="title is-3">Images for {{ user.name }}</h3>
    <div v-for="image in user.images" :key="image" class="image">
        <img :src="image" />
    </div>
    
</template>

<style scoped>

</style>    