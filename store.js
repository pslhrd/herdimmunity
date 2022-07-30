import { reactive } from 'vue'

export const store = reactive({
  width: 0,
  height: 0,

  mouseY: 0,
  mouseX: 0,

  menuOpen: false,
  sceneChanged: false,
  sceneTransition: false,

  sound: false,

  assetsLoaded: false,
  toLoad: 0,
  loaded: 0,

  currentState: 1
})