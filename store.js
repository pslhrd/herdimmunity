import { reactive } from 'vue'

export const store = reactive({
  width: 0,
  height: 0,

  canvasWidth: 0,
  canvasHeight: 0,

  mouseY: 0,
  mouseX: 0,

  menuOpen: false,
  sceneChanged: false,
  sceneTransition: false,

  sound: false,

  assetsLoaded: false,
  toLoad: 0,
  loaded: 0,

  worldSet: false,

  currentState: 1,
  currentMerch: 1
})