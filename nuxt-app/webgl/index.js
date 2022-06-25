import { Pane } from 'tweakpane'
import { store } from '~/store'
import { Camera } from '~/webgl/Camera'
import { Renderer } from '~/webgl/Renderer'
import { World } from '~/webgl/World'
import { watch } from 'vue'
import * as THREE from 'three'

export class App {
  static instance

  constructor(_options = {}) {

    if (App.instance) {
      return App.instance
    }
    App.instance = this

    this.targetElement = _options.targetElement

    if(!this.targetElement) {
      console.warn('Missing \'targetElement\' property')
      return
    }

    this.setConfig()
    this.setDebug()
    this.setScene()
    this.setCamera()
    this.setRenderer()
    this.setWorld()

    watch(() => store.height + store.width, () => {
      this.resize()
    })

    this.update()
  }

  setConfig() {
    this.config = {}
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)
    this.config.debug = window.location.hash === '#debug'
  }

  setDebug() {
    if (this.config.debug) {
      this.debug = new Pane()
    }
  }
  
  setScene() {
    this.scene = new THREE.Scene()
  }

  setCamera() {
    this.camera = new Camera()
  }

  setRenderer() {
    this.renderer = new Renderer({rendererInstance: this.rendererInstance})
    this.targetElement.appendChild(this.renderer.instance.domElement)
  }

  setWorld() {
    this.world = new World()
    console.log(this.world)
  }

  update() {
    this.camera.update()
    this.renderer.update()

    window.requestAnimationFrame(() => {
      this.update()
    })
  }

  resize() {
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

    if(this.camera) this.camera.resize()
    if(this.world) this.world.resize()
    if(this.renderer) this.renderer.resize()
  }

}