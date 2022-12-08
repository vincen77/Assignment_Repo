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
            <slot name="header"></slot>
            <button class="delete" aria-label="close" type="reset" @click="$emit('close')"></button>
          </header>

          <section class="modal-card-body">
            <slot name="body"></slot>
          </section>

          <footer class="modal-card-foot">
            <slot name="footer">
            </slot>
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