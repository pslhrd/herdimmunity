<template>
  <Head>
    <Title> HERD IMMUNITY </Title>
    <Meta name="description" content=" HERD IMMUNITY " />
    <Meta name="theme-color" content="#4285f4" />

    <Meta property="og:url" content="https://nuxt" />
    <Meta property="og:type" content="website" />
    <Meta property="og:title" content="Content Title" />
    <Meta property="og:site_name" content="Site Name" />
    <Meta property="og:description" content="Description Here" />
    <Meta property="og:image" content="https://example.com/share.png" />

    <Meta name="twitter:card" content="summary" />
    <Meta name="twitter:site" content="@site_account" />
    <Meta name="twitter:url" content="https://example.com/page.html" />
    <Meta name="twitter:title" content="Content Title" />
    <Meta name="twitter:description" content="Content description less than 200 characters" />
    <Meta name="twitter:image" content="https://example.com/share.jpg" />

    <Link rel="icon" sizes="192x192" href="/favicon.ico" />
    <Link rel="apple-touch-icon" href="/icon_192.png" />
  </Head>

  <header>
    <span @click="store.currentState = 1">HERD IMMUNITY</span>
  </header>
</template>

<script setup>
import { store } from '~/store'
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  // gsap.fromTo('header span', {yPercent:-100, opacity:0}, {yPercent:0, opacity:1, duration:1, ease:'expo.out'}, 0.93)
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
    font-size: 24px;
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