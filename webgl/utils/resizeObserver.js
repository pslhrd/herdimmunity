import { ref, onMounted, onUnmounted } from 'vue'
import { store } from '~/store'

export function useResize(canvas) {

  function update() {
    store.width = window.innerWidth
    store.height = window.innerHeight

    store.canvasHeight = canvas.offsetHeight
    store.canvasWidth = canvas.offsetWidth

  }

  update()
  window.addEventListener('resize', update)
  onUnmounted(() => window.removeEventListener('resize', update))
}