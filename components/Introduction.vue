<template>
  <section class="introduction">
    <div class="introduction-title">
      <span class="word" v-splitChars>HERD</span>
      <span class="word" v-splitChars>IMMUNITY</span>
    </div>
  </section>
</template>

<script setup>
  import { App } from '~/webgl/index'
  import { store } from '~/store'
  import { ref, onMounted, onUnmounted } from 'vue'
  import gsap from 'gsap'

  onMounted(() => {
    watch(() => store.assetsLoaded, () => {
      console.log(App.instance)
      gsap.fromTo('.split-letter', {y:'100%', opacity:1}, {y:'0%', opacity:1, duration: 1.2, stagger:0.04, ease:'expo.out'}, 1.5)
      gsap.to('.split-letter', {y:'-100%', opacity:1, duration: 1.2, stagger:0.02, ease:'expo.out'}, 4)
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

  .word {
    overflow: hidden;
  }

  .split-letter {
    opacity: 0;
    display: inline-block;
  }

  span {
    display: block;
  }
}
</style>