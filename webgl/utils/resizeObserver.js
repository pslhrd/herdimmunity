import { ref, onMounted, onUnmounted } from 'vue'
import { store } from '~/store'

export function useResize(canvas) {

  function update() {
    store.width = canvas.offsetWidth
    store.height = canvas.offsetHeight

  }

  update()
  window.addEventListener('resize', update)
  onUnmounted(() => window.removeEventListener('resize', update))
}