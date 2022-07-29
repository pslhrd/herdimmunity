<template>
  <transition name="slide-fade">
    <div class="loader" v-if="!store.assetsLoaded">
      <svg width="248" height="248" viewBox="0 0 248 248" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="124" cy="124" r="8" fill="white"/>
        <circle cx="124" cy="124" r="122.5" stroke="white" stroke-width="3"/>
      </svg>
    </div>
  </transition>
</template>

<script setup>
  import { store } from '~/store'
  import { watch, onMounted, onUnmounted } from 'vue'
  import gsap from 'gsap'

</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #20201D;
  z-index: 25;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-size: 50px;

  svg {
    animation: blurred 2s infinite $inOut;
  }

  @keyframes blurred {
    0% { filter: blur(0px);}
    50% { filter: blur(5px);}
    100% { filter: blur(0px);}
  }
}
  .slide-fade-enter-active {
    transition: all 1s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 1s ease-out;
  }

  .slide-fade-enter-from {
    opacity: 0;
  }

  .slide-fade-leave-to {
    opacity: 0;
  }
</style>