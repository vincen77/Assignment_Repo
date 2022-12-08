<script setup lang="ts">
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import LoginBadge from './LoginBadge.vue';

    let isActive = ref(false);

</script>

<template>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">

        <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="data:," alt>
          </a>
      
          <a :class="{ 'is-active': isActive }" @click="isActive = !isActive" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" class="navbar-menu"  :class="{ 'is-active': isActive }">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">
              Home
            </router-link>
      
            <router-link class="navbar-item" to="/myactivity">
              My Activity
            </router-link>

            <router-link class="navbar-item" to="/friendsactivity">
              Friends Activity
            </router-link>

            <router-link class="navbar-item" to="/peoplesearch">
              People Search
            </router-link>

            <router-link class="navbar-item" to="/stats">
              Statistics
            </router-link>
      
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>
      
              <div class="navbar-dropdown">
                <router-link class="navbar-item" to="/about">
                  About
                </router-link>
                <router-link class="navbar-item" to="/admin">
                  Admin
                </router-link>
              </div>
            </div>
          </div>
      
          <div class="navbar-end">
            <div class="navbar-item">

              <login-badge>
              </login-badge>
            </div>
          </div>
        </div>
        </div>
      </nav>

</template>

<style>
    .router-link-exact-active,
    .router-link-active {
        
        border-bottom: #cf0101 5px solid;
    }
</style>