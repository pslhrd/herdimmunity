<template>
  <div class="webgl" ref="container"></div>
</template>
  
<script setup>
import { App } from '~/webgl/index'
import { ref, onMounted, onUnmounted } from 'vue'
import { useResize } from '~/webgl/utils/resizeObserver'
import { store } from '~/store'

const container = ref(null)
useResize()

onMounted(() => {
  const app = new App({targetElement: container.value})
})
</script>

<style lang="scss">

.webgl {
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>