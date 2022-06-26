<template>
  <div class="loader" v-if="!store.assetsLoaded"></div>
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
}
</style>