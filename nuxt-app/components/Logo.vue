<template>
  <header>
    <span @click="store.currentState = 0">HERD IMMUNITY</span>
  </header>
</template>

<script setup>
import { store } from '~/store'
</script>

<style lang="scss" scoped>
  header {
    display: none;
    // pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-family: 'Arges';
    padding-top: 30px;
    font-size: 50px;
    z-index: 1;
    color: white;

    span {
      display: block;
    }

    @include wide-mobile {
      display: block;
    }
  }
</style>