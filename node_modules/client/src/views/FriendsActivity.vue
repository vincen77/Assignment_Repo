<script setup lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { api } from "@/stores/session";
import { getUser, type User } from "@/stores/users";
import { useStore } from "vuex";
</script>

<template>
    <div>
        <h1 class="title">Friends Activity</h1>
        <p>What your friends are doing!</p>
        </div>
        <section>
    <o-field grouped group-multiline>
      <o-switch v-model="openOnFocus">Open dropdown on focus</o-switch>
      <o-switch v-model="keepFirst">Keep-first</o-switch>
    </o-field>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <o-field label="Find a name">
      <o-autocomplete
        v-model="name"
        placeholder="e.g. Anne"
        :keep-first="keepFirst"
        :open-on-focus="openOnFocus"
        :data="filteredDataObj"
        field="user.first_name"
        @select="(option) => (selected = option)"
      />
    </o-field>
  </section>
</template>

<style lang="ts">

</style>