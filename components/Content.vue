<template>
  <section class="content">

    <transition name="slide-fade">
      <div class="content-page homepage" v-if="store.currentState === 1">
        <div class="homepage-cta">
          <a href="https://bfan.link/herd-immunity" target="_blank"><button>Listen to the mixtape</button></a>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="content-page blacksheep" v-if="store.currentState === 2">
        <div class="blacksheep-content">
          <span class="title">Black sheep oath</span>
          <span class="paragraph">I won't let the feeling of not wanting to be alone stop me from being great. I will continue to make things, even when my heart is heavy, even when I can feel sadness putting pressure on the back of my eyes.</span>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="content-page merch" v-if="store.currentState === 3">
        <div class="merch-content">
          <span class="sub">Coming Soon</span>
          <span class="title">Black Sheep Teeshirt</span>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="content-page video" v-if="store.currentState === 4">
        <div class="video-content">
          <span class="title">YOFC OFFICIAL VIDEO OUT NOW</span>
          <div class="video-cta">
            <button>watch on youtube</button>
          </div>
        </div>
      </div>
    </transition>

  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { store } from '~/store'

</script>


<style lang="scss" scoped>
  .content {
    position: fixed;
    color: white;
    width: 100%;
    min-height: 100%;
    z-index: 9;

    &-page {
      position: absolute;
      width: 100%;
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
    }
  }

  .homepage {
    font-family: 'Pixter Granular';
    &-cta {
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      position: absolute;
      bottom: 40px;
      button {
        text-align: center;
        width: 230px;
        height: 50px;
        border: 1px solid white;
        border-radius: 4px;
        font-size: 13px;
        text-transform: uppercase;
      }
    }
  }

  .video {
    &-content {
      position: absolute;
      bottom: 40px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .title {
      display: block;
      font-family: 'BT Brik';
      font-size: 24px;
      margin-bottom: 20px;
      width: 200px;
      text-align: center;
    }
    
    &-cta {
      button {
        display: block;
        font-family: 'Pixter Granular';
        text-align: center;
        width: 230px;
        height: 50px;
        border: 1px solid white;
        border-radius: 4px;
        font-size: 13px;
        text-transform: uppercase;
      }
    }
  }

  .blacksheep {
    text-align: center;
    &-content {
      position: absolute;
      bottom: 40px;
    }
    .title {
      display: block;
      font-family: 'BT Brik';
      font-size: 28px;
      margin-bottom: 20px;
    }

    .paragraph {
      display: block;
      font-family: Helvetica;
      font-size: 13px;
      line-height: 1.25em;
      width: 325px;
      color: rgb(115, 115, 115);
    }
  }

  .merch {

    &-content {
      position: absolute;
      bottom: 40px;
      text-align: center;
    }
    .sub {
      display: block;
      font-family: Helvetica;
      font-size: 13px;
      line-height: 1.25em;
      color: rgb(115, 115, 115);
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .title {
      display: block;
      font-family: 'BT Brik';
      font-size: 28px;
      width: 325px;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-enter-from {
    opacity: 0;
    transform: translateY(20px)
  }

  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px)
  }
</style>