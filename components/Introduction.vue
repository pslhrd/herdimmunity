<template>
  <section class="introduction">
    <div class="introduction-title">
      <span>HERD</span>
      <span>IMMUNITY</span>
    </div>
  </section>
</template>

<script setup>
  import { store } from '~/store'
  import { ref, onMounted, onUnmounted } from 'vue'
  import gsap from 'gsap'

  onMounted(() => {
    watch(() => store.assetsLoaded, () => {
      console.log('loaded')
    })
  })
</script>

<style lang="scss">
.introduction {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Arges';
  font-size: 20vw;
  line-height: 16vw;
  text-align: center;

  span {
    display: block;
  }
}
</style>