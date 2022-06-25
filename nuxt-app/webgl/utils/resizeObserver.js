import { ref, onMounted, onUnmounted } from 'vue'
import { store } from '~/store'

export function useResize() {

  function update() {
    store.width = window.innerWidth
    store.height = window.innerHeight
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })
  onUnmounted(() => window.removeEventListener('resize', update))
}