<template>
  <section class="navigation">
    <div class="wrapper">
      <div class="navigation-pages" @click="store.menuOpen = !store.menuOpen" :class="{opened: store.menuOpen}">
        <div class="navigation-pages-active">
          <span>{{ currentPage }}</span>
        </div>
        <div class="navigation-pages-list" :class="{visible: store.menuOpen}">
          <span v-for="(page, i) in pages" :key="page.i" @click="currentPage = page.value, store.currentState = page.STATE">
            {{ page.value }}
          </span>
        </div>
      </div>
      <div class="navigation-mode" @click="store.sceneChanged = !store.sceneChanged"> 
        <span v-if="store.sceneChanged">H</span>
        <span v-if="!store.sceneChanged">S</span>
      </div>
      <div class="navigation-sound" @click="store.sound = !store.sound">
        <span v-if="store.sound">M</span>
        <span v-if="!store.sound">P</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { store } from '~/store'
import { gsap } from 'gsap'

const pages = [
  {value: 'HOMEPAGE', STATE: 1},
  {value: 'BLACK SHEEP', changed: 'HERD IMMUNITY', STATE: 4},
  {value: 'YOFC VIDEO', STATE: 3},
  {value: 'MERCH', STATE: 2},
]

const currentPage = ref(pages[0].value)

onMounted(() => {
  gsap.fromTo('.navigation-pages, .navigation-mode, .navigation-sound', {yPercent:100, opacity:0}, {yPercent:0, opacity:1, duration:1, ease:'expo.out', stagger:0.07}, 1)
})

</script>

<style lang="scss" scoped>
  .navigation {
    width: 100%;
    position: fixed;
    bottom: 40px;
    font-family: 'Pixter Granular';
    display: flex;
    justify-content: center;
    user-select: none;
    font-size: 14px;
    z-index: 4;

    color: $lightgrey;

    @include small-mobile {
      bottom: 20px;
    }

    .wrapper {
      width: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      @include small-mobile {
        width: calc(100% - 40px);
      }
    }

    &-mode, &-sound, &-pages {
      // opacity: 0;
      &:hover {
        cursor: pointer;
        &:after {
          transform: scaleY(100%);
        }
      }

      span {
        position: relative;
        z-index: 2;
      }

      &:before {
        z-index: 2;
      }

      &:after {
        transform: scaleY(0%);
        transform-origin: bottom center;
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: $lightgrey;
        z-index: 1;
        transition: all 0.3s $hover;

        opacity: 0.1;
      }
    }

    &-mode, &-sound {
      position: relative;
      width: 50px;
      height: 50px;
      border: 1px solid $lightgrey;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      
    }

    &-pages {
      position: relative;
      flex-grow: 1;
      height: 50px;
      display: flex;
      align-items: center;
      border: 1px solid $lightgrey;
      padding-left: 20px;

      &.opened {
        &:before {
          transform: rotate(180deg);
        }
        &:after {
          transform: scaleY(100%);
        }
      }
      

      &:before {
        position: absolute;
        transform: rotate(0deg);
        content: '';
        width: 0; 
        height: 0;
        right: 25px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 8px solid $lightgrey;
      }

      &-list {
        visibility: hidden;
        pointer-events: none;
        width: 100%;
        position: absolute;
        height: 150px;
        border: 1px solid $lightgrey;
        left: 0;
        bottom: 60px;
        padding: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;

        opacity: 0;
        transform: translateY(15px);
        transition: all 0.3s $expo;

        &:hover {
          cursor: default;
        }

        span {
          display: block;
          
          &:hover {
            cursor: pointer;
            opacity: 0.5;
          }
        }

        &.visible {
          pointer-events: all;
          visibility: visible;
          opacity: 1;
          transform: translateY(0px);
        }
      }
    }
  }
</style>