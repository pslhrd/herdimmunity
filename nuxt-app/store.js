import { reactive } from 'vue'

export const store = reactive({
  width: 0,
  height: 0,

  mouseY: 0,
  mouseX: 0,

  assetsLoaded: false,

  currentState: 0
})