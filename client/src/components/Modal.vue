<script setup lang="ts">
const props = defineProps({
  show: Boolean
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <header class="modal-card-head">
            <h1 class="modal-card-title">Sign Up</h1>
            <button class="delete" aria-label="close" @click="$emit('close')"></button>
          </header>
          <section class="modal-card-body">
            <p>Please fill in this form to create an account.</p>
            <br>
            <label for="email"><b>Email</b></label>
            <input class="input" type="text" placeholder="Enter Email" name="email" required>

            <label for="psw"><b>Password</b></label>
            <input class="input" type="password" placeholder="Enter Password" name="psw" required>

            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input class="input" type="password" placeholder="Repeat Password" name="psw-repeat" required>
            
            <label>
                <input type="checkbox" checked name="remember" style="margin-bottom:15px"> Remember me
            </label>

            <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>
          </section>
            <footer class="modal-card-foot">
            <div class="clearfix">
                <button class="button is-danger" @click="$emit('close')">Close</button>
                <button type="submit" class="button is-primary">Coming soon</button>
            </div>
          </footer>
          </div>
        </div>
      </div>
  </Transition>
</template>

<style>
.modal-card-head {
  background-color: #ffffff;
  border-bottom: 1px solid #ffffff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
}

.modal-card-title {
  color: #000000;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 0;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 30%;
  height: 70%; /* Full height */
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}


.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>