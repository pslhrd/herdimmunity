import { ref, onMounted, onUnmounted } from 'vue'
import { store } from '~/store'

export function useResize(canvas) {

  function update() {
    store.width = window.innerWidth
    store.height = window.innerHeight

    store.canvasHeight = canvas.innerHeight
    store.canvasWidth = canvas.innerWidth
  }

  update()
  window.addEventListener('resize', update)
  onUnmounted(() => window.removeEventListener('resize', update))
}