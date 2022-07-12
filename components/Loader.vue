<template>
  <div class="loader" v-if="!store.assetsLoaded">
    <span>{{ store.loaded }} / {{ store.toLoad }}</span>
  </div>
</template>

<script setup>
  import { store } from '~/store'
  import { watch, onMounted, onUnmounted } from 'vue'
  import gsap from 'gsap'

</script>

<style lang="scss" scoped>
.loader {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: black;
  z-index: 25;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-size: 50px;
}
</style>