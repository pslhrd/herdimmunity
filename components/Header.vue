<template>
  <Head>
    <Title> HERD IMMUNITY </Title>
    <Meta name="description" content=" HERD IMMUNITY " />
    <Meta name="theme-color" content="#4285f4" />

    <Meta property="og:url" content="https://herdimmunity.info" />
    <Meta property="og:type" content="website" />
    <Meta property="og:title" content="Herd Immunity" />
    <Meta property="og:site_name" content="Herd Immunity" />
    <Meta property="og:description" content="Sean Leon - Herd Immunity Mixtape out now." />
    <Meta property="og:image" content="https://herdimmunity.info/share.png" />

    <Meta name="twitter:card" content="summary" />
    <Meta name="twitter:site" content="@seanleon" />
    <Meta name="twitter:url" content="https://herdimmunity.info" />
    <Meta name="twitter:title" content="HERD IMMUNITY" />
    <Meta name="twitter:description" content="Sean Leon - Herd Immunity Mixtape out now." />
    <Meta name="twitter:image" content="https://herdimmunity.info/share.jpg" />

    <Link rel="icon" sizes="192x192" href="/favicon.ico" />
    <Link rel="apple-touch-icon" href="/icon_192.png" />
  </Head>

  <transition name="header">
    <header v-if="store.assetsLoaded">
      <span @click="store.currentState = 1">HERD IMMUNITY</span>
      <span>CANVAS_WIDTH: {{ store.canvasWidth }}</span>
      <span>CANVAS_HEIGHT: {{ store.canvasHeight }}</span>
      <span>STORE: {{ store.height }}</span>
    </header>
  </transition>
</template>

<script setup>
import { store } from '~/store'
import { onMounted } from 'vue'
import gsap from 'gsap'
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
    padding-top: 25px;
    font-size: 20px;
    z-index: 1;
    color: $lightgrey;
    user-select: none;

    @include desktop {
      padding-top: 40px;
      font-size: 26px;
    }

    span {
      display: block;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .header-enter-active {
    transition: all 1s $hover 1s;
  }

  .header-enter-from {
    opacity: 0;
    transform: translateY(-100%);
    filter: blur(5px);
  }
</style>