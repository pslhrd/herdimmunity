<template>
  <section class="content">

    <transition name="slide" :duration="910">
      <div class="content-page homepage" v-if="store.currentState === 1">
        <div class="homepage-cta first">
          <a href="https://bfan.link/herd-immunity" target="_blank"><button>Listen to the mixtape</button></a>
        </div>
      </div>
    </transition>

    <transition name="slide" :duration="910">
      <div class="content-page blacksheep" v-if="store.currentState === 2">
        <div class="blacksheep-content">
          <!-- <div class="index">
            <span class="index-text">ABOUT</span>
            <div class="index-background"></div>
          </div> -->
          <span class="title first">Black sheep oath</span>
          <span class="paragraph second">I won't let the feeling of not wanting to be alone stop me from being great. I will continue to make things, even when my heart is heavy, even when I can feel sadness putting pressure on the back of my eyes.</span>
        </div>
      </div>
    </transition>

    <transition name="slide" :duration="910">
      <div class="content-page merch" v-if="store.currentState === 3">
        <div class="merch-content">
          <!-- <div class="index">
            <span class="index-text">MERCH</span>
            <div class="index-background"></div>
          </div> -->
          <span class="title first">Coming Soon</span>
          <div class="merch-btn second">
            <div class="button" @click="store.currentMerch = 1" :class="{active: store.currentMerch === 1}">1</div>
            <div class="button" @click="store.currentMerch = 2" :class="{active: store.currentMerch === 2}">2</div>
            <div class="button" @click="store.currentMerch = 3" :class="{active: store.currentMerch === 3}">3</div>
            <div class="button" @click="store.currentMerch = 4" :class="{active: store.currentMerch === 4}">4</div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide" :duration="910">
      <div class="content-page video" v-if="store.currentState === 4">
        <div class="video-content">
          <!-- <div class="index">
            <span class="index-text">VIDEO</span>
            <div class="index-background"></div>
          </div> -->
          <span class="title first">YOFC OFFICIAL VIDEO</span>
          <div class="video-cta second">
            <button>COMING SOON</button>
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
  
  span {
    display: block;
  }

  .first, .second {
    display: block;
  }

  .index {
    position: relative;
    display: flex;

    .wrapper {
      position: relative;
      display: inline-block;
      overflow: hidden;
    }
    &-text {
      overflow: hidden;
      display: inline-block;
      width: auto;
      position: relative;
      z-index: 2;
      color: rgb(255, 255, 255);
      padding: 2px 4px 2px 4px;
      font-family: 'Pixter Granular';
      line-height: 14px;
      font-size: 14px;
      margin-bottom: -2px;
    }
    &-background {
      display:inline-block;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.201);

      transform-origin: left center;
    }
  }

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

        &:hover {
          button {
            border: 2px solid rgba(255, 255, 255, 0.197);
          }
        }
      }
      position: absolute;
      bottom: 60px;
      

      @include desktop {
        bottom: 125px;
      }
      button {
        text-align: center;
        width: 230px;
        height: 50px;
        border: 2px solid white;
        font-size: 13px;
        text-transform: uppercase;
        transition: all 0.3s $hover;
      }
    }
  }

  .blacksheep {
    text-align: center;
    &-content {
      position: absolute;
      bottom: 60px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;

      @include desktop {
        bottom: 125px;
      }
    }


    .title {
      display: block;
      font-family: 'BT Brik';
      font-size: 28px;

      @include desktop {
        text-align: center;
        font-size: 80px;
        width: 500px;
      }
    }

    .paragraph {
      display: block;
      font-family: Helvetica;
      font-size: 13px;
      line-height: 1.25em;
      width: 325px;
      color: rgb(115, 115, 115);

      @include desktop {
        text-align: center;
        width: 350px;
      }
    }
  }

  .merch {

    &-btn {
      display: flex;
      gap: 20px;
      .button {
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Pixter Granular';
        width: 50px;
        height: 50px;
        background-color: rgba(255, 255, 255, 0.15);
        transition: all 0.3s $hover;
        border: 2px solid rgba(255, 255, 255, 0);

        &:hover {
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.253);
        }

        &.active {
          color: black;
          background-color: white;
        }
      }
    }

    &-content {
      position: absolute;
      bottom: 60px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;

      @include desktop {
        bottom: 125px;
      }
    }
    .sub {
      display: block;
      font-family: Helvetica;
      font-size: 13px;
      line-height: 1.25em;
      color: rgb(115, 115, 115);
      text-transform: uppercase;
    }

    .title {
      display: block;
      font-family: 'BT Brik';
      font-size: 28px;
      width: 325px;

      @include desktop {
        font-size: 46px;
        width: 500px;
      }
    }
  }

  .video {
    &-content {
      position: absolute;
      bottom: 60px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      @include desktop {
        bottom: 125px;
      }
    }

    .title {
      display: block;
      font-family: 'BT Brik';
      font-size: 24px;
      width: 200px;
      text-align: center;

      @include desktop {
        font-size: 46px;
        width: 400px;
      }
    }
    
    &-cta {
      button {
        display: block;
        font-family: 'Pixter Granular';
        text-align: center;
        width: 230px;
        height: 50px;
        border: 2px solid white;
        font-size: 13px;
        text-transform: uppercase;
      }
    }
  }


  .slide-enter-active .first, {
    transition: all 0.7s $expo 0.14s;
  }
  .slide-enter-active .second, {
    transition: all 0.7s $expo 0.21s;
  }

  .slide-enter-active .index-background {
    transition: all 0.7s $expo 0.07s;
  }
  .slide-enter-active .index-text {
    transition: all 0.7s $expo 0.14s;
  }

  .slide-leave-active {
    transition: opacity 0.3s ease-out;
  } 

  .slide-enter-from .first,
  .slide-enter-from .second {
    opacity: 0;
    transform: translateY(100%);
    filter: blur(5px);

    @include desktop {
      transform: translateY(75px);
      filter: blur(5px);
    }
  }

  .slide-enter-from .index-background {
    transform: scaleX(0);
    filter: blur(5px);
  }

  .slide-enter-from .index-text {
    transform: translateY(100%);
    filter: blur(5px);
  }
  .slide-leave-to {
    opacity: 0;
  }
</style>