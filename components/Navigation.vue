<template>
  <section class="navigation">
    <div class="left" @click="prevScene">
      <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.74544e-08 6.49993L11.25 0.00473608L11.25 12.9951L7.74544e-08 6.49993Z" fill="white"/>
      </svg>
    </div>
    <div class="right" @click="nextScene">
      <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.74544e-08 6.49993L11.25 0.00473608L11.25 12.9951L7.74544e-08 6.49993Z" fill="white"/>
      </svg>
    </div>
  </section>
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

function nextScene() {
  let current = store.currentState
  current = current + 1

  if (current > pages.length) {
    store.currentState = 1
  } else {
    store.currentState = current
  }
}

function prevScene() {
  let current = store.currentState
  current = current - 1

  if (current <= 0) {
    store.currentState = pages.length
  } else {
    store.currentState = current
  }
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

    .left, .right {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
      transition: all 0.3s $expo;

      &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.6);
        transform: scale(1.1);
      }
    }

    .right {
      svg {
        transform: rotate(180deg)
      }
    }
  }
</style>