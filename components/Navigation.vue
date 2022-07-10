<template>
  <section class="navigation">
    <div class="navigation-logo" @click="store.currentState = 0" :class="{current: store.currentState === 0}">
      <span>HERD IMMUNITY</span>
    </div>
    <div class="navigation-item" @click="store.currentState = 1" :class="{current: store.currentState === 1}">
      <span>YOFC VIDEO</span>
    </div>
    <div class="navigation-item" @click="store.currentState = 2" :class="{current: store.currentState === 2}">
      <span>BLACK SHEEP</span>
    </div>
    <div class="navigation-item" @click="store.currentState = 3" :class="{current: store.currentState === 3}">
      <span>PHASES</span>
    </div>
    <div class="navigation-item" @click="store.currentState = 4" :class="{current: store.currentState === 4}">
      <span>MERCH</span>
    </div>
  </section>
</template>

<script setup>
import { store } from '~/store'
</script>

<style lang="scss" scoped>
  .navigation {
    position: fixed;
    bottom: 30px;
    left: 0;
    z-index: 20;
    width: 40vw;
    margin-left: 30vw;
    height: 60px;
    display: flex;
    border: 1px solid rgba(255, 255, 255, 0.1);

    div {
      transition: color 0.3s $power2;
      &.current {
        color: white;
        &:after {
          transform: scaleY(1);
        }
      }
      &:hover {
        cursor: pointer;
        color: white;
        &:after {
          transform: scaleY(1);
        }
      }

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: rgba(255, 255, 255, 0.1);
        // backdrop-filter: blur(4px);
        transform: scaleY(0);
        transform-origin: bottom center;
        transition: transform 0.3s $power2;
      }
    }

    &-item {
      font-family: 'Pixter Granular';
      position: relative;
      color: white;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 30px;
      padding-right: 30px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);

      @include wide-mobile {
        width: 25%;
        padding: 0;
      }
    }

    &-logo {
      font-family: 'Arges';
      position: relative;
      color: white;
      font-size: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 60px;
      padding-right: 60px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);

      @include wide-mobile {
        display: none;
      }
    }
  }
</style>