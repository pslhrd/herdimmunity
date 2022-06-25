import * as THREE from 'three'
import { App } from '~/webgl/index'
import { store } from '~/store'

export class Renderer {
  constructor(_options) {
    console.log(_options)
    this.app = new App()
    this.scene = this.app.scene
    this.camera = this.app.camera
    this.config = this.app.config
    this.setInstance()
  }

  setInstance() {
    this.clearColor = '#1D1D1D'

    // Renderer
    this.instance = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true
    })
    this.instance.domElement.style.position = 'absolute'
    this.instance.domElement.style.top = 0
    this.instance.domElement.style.left = 0
    this.instance.domElement.style.width = '100%'
    this.instance.domElement.style.height = '100%'
    this.instance.setClearColor(this.clearColor, 1)
    this.instance.setSize(store.width, store.height)
    this.instance.setPixelRatio(this.config.pixelRatio)

    this.context = this.instance.getContext()
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }

  resize() {
    // Instance
    this.instance.setSize(store.width, store.height)
    this.instance.setPixelRatio(this.config.pixelRatio)
  }

  destroy() {
    this.instance.renderLists.dispose()
    this.instance.dispose()
  }
}