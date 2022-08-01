<template>
  <transition name="intro" :duration="2000">
    <section class="navigation" v-if="store.assetsLoaded">
      <button class="left" @click="prevScene">
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.74544e-08 6.49993L11.25 0.00473608L11.25 12.9951L7.74544e-08 6.49993Z" fill="white"/>
        </svg>
      </button>
      <button class="right" @click="nextScene">
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.74544e-08 6.49993L11.25 0.00473608L11.25 12.9951L7.74544e-08 6.49993Z" fill="white"/>
        </svg>
      </button>
    </section>
  </transition>

  <transition name="intro" :duration="2000">
    <div class="corners">
      <div class="corner"></div>
      <div class="corner"></div>
      <div class="corner"></div>
      <div class="corner"></div>
    </div>
  </transition>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { store } from '~/store'
import { gsap } from 'gsap'

const pages = [
  {value: 'HOMEPAGE', STATE: 1},
  {value: 'BLACK SHEEP', changed: 'HERD IMMUNITY', STATE: 2},
  {value: 'YOFC VIDEO', STATE: 3},
  {value: 'MERCH', STATE: 4},
]

let moved = false

function nextScene() {
  function next() {
    let current = store.currentState
    current = current + 1
    moved = true
    if (current > pages.length) {
      store.currentState = 1
    } else {
      store.currentState = current
    }

    setTimeout(() => {moved = false}, 300)
  }
  moved ? null : next();
}

function prevScene() {
  function prev() {
    let current = store.currentState
    current = current - 1
    moved = true
    if (current <= 0) {
      store.currentState = pages.length
    } else {
      store.currentState = current
    }

    setTimeout(() => {moved = false}, 300)
  }
  moved ? null : prev();
}

onMounted(() => {
})

</script>

<style lang="scss" scoped>
 
  .navigation {
    padding: 20px;
    position: fixed;
    transform: translateY(-50%);
    width: 100%;
    top: 50%;
    display: flex;
    justify-content: space-between;
    z-index: 10;

    @include desktop {
      padding: calc(7vw);
    }

    .left, .right {
      position: relative;
      width: 55px;
      height: 55px;

      border: 2px solid rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(2px);
      transition: all 0.3s $expo;

      @include desktop {
        width: 65px;
        height: 65px;
      }

      &:hover {
        @include desktop {
          cursor: pointer;
          // background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.6);
        }
      }

      &:active {
        transform: scale(0.9);
        border: 2px solid rgba(255, 255, 255, 0.6);
      }
    }

    .right {
      svg {
        transform: rotate(180deg)
      }
    }
  }
  .corners {
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 100%;
    z-index: 9;
    pointer-events: none;
    $padding: 20px;

    .corner {
      position: absolute;
      width: 20px;
      height: 20px;
      // border-left: 1px solid white;
      // border-bottom: 1px solid white;
      opacity: 0.2;

      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 70%;
        height: 2px;
        background-color: white;
      }

      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 70%;
        width: 2px;
        background-color: white;
      }

      @include desktop {
        width: 40px;
        height: 40px;
      }

      &:nth-child(1) {
        top: $padding;
        left: $padding;
        transform: rotate(-90deg);

        @include desktop {
          top: 60px;
          left: 60px;
        }
      }
      &:nth-child(2) {
        bottom: $padding;
        left: $padding;
        transform: rotate(180deg);
        @include desktop {
          bottom: 60px;
          left: 60px;
        }
      }
      &:nth-child(3) {
        bottom: $padding;
        right: $padding;
        transform: rotate(90deg);
        @include desktop {
          bottom: 60px;
          right: 60px;
        }
      }
      &:nth-child(4) {
        top: $padding;
        right: $padding;
        transform: rotate(0deg);

        @include desktop {
          top: 60px;
          right: 60px;
        }
      }
    }
  }

  .intro-enter-active .left {
    transition: all 1s $expo 0.8s;
  }
  .intro-enter-active .right {
    transition: all 1s $expo 0.9s;
  }
  .intro-enter-active .corners {
    transition: all 1s $expo 1s;
  }

  .intro-enter-from .corners {
    opacity: 0;
    transform: scale(1.3);
    filter: blur(5px);

    @include desktop {
      transform: scale(1.3);
      filter: blur(5px);
    }
  }

  .intro-enter-from .left {
    opacity: 0;
    transform: translatex(100%);
    filter: blur(5px);

    @include desktop {
      transform: translateX(75px);
      filter: blur(5px);
    }
  }

  .intro-enter-from .right {
    opacity: 0;
    transform: translatex(-100%);
    filter: blur(5px);

    @include desktop {
      transform: translateX(-75px);
      filter: blur(5px);
    }
  }

</style>