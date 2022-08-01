<template>
  <div class="webgl" ref="container">
    <!-- <canvas class="webgl-canvas" ref="canvas"></canvas> -->
  </div>

  <video class="video" ref="video" muted loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="/textures/video.mp4">
  </video>
</template>
  
<script setup>
import { App } from '~/webgl/index'
import { ref, onMounted, onUnmounted } from 'vue'
import { useResize } from '~/webgl/utils/resizeObserver'
import { store } from '~/store'

const container = ref(null)
const video = ref(null)

onMounted(() => {
  useResize(container.value)
  const app = new App({targetElement: container.value, videoElement: video.value})
})
</script>

<style lang="scss">

.webgl {
  position: fixed;
  width: 100vw;
  height: 100vh;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>