<template>
  <header>
    <span @click="store.currentState = 1">HERD IMMUNITY</span>
  </header>
</template>

<script setup>
import { store } from '~/store'
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.fromTo('header span', {yPercent:-100, opacity:0}, {yPercent:0, opacity:1, duration:1, ease:'expo.out'}, 0.93)
})
</script>

<style lang="scss" scoped>
  header {
    display: block;
    // pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-family: 'BT Brik';
    padding-top: 40px;
    font-size: 26px;
    z-index: 1;
    color: $lightgrey;
    user-select: none;

    span {
      display: block;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>