import { Pane } from 'tweakpane'
import { watch } from 'vue'
import * as THREE from 'three'
import Stats from '~/webgl/utils/Stats.js'
import { store } from '~/store'

import { Camera } from '~/webgl/Camera'
import { Renderer } from '~/webgl/Renderer'
import { World } from '~/webgl/World'
import { Resources } from '~/webgl/Resources'
import { sceneEvents } from '~/webgl/sceneEvents'
import { Device } from '~/webgl/utils/Device'
import { Time } from '~/webgl/utils/Time'
import { Mouse } from '~/webgl/utils/Mouse'

import { uniforms } from '~/webgl/shaders/uniforms'
export class App {
  static instance

  constructor(_options = {}) {

    if (App.instance) {
      return App.instance
    }
    App.instance = this

    this.targetElement = _options.targetElement
    this.video = _options.videoElement

    if(!this.targetElement) {
      console.warn('Missing \'targetElement\' property')
      return
    }

    this.setResources()
    this.setConfig()
    this.setDebug()
    this.setDevice()
    this.setTime()
    this.setMouse()
    this.setScene()
    this.setStats()
    this.setCamera()
    this.setRenderer()
    this.setWorld()
    this.setSceneEvents()
    
    watch(() => store.height + store.width, () => {
      this.resize()
    })

    this.update()
  }

  setConfig() {
    this.config = {}
    this.config.pixelRatio = 1
    this.config.debug = window.location.hash === '#debug'
  }

  setDebug() {
    if (this.config.debug) {
      this.debug = new Pane()
    }
  }

  setDevice() {
    this.device = new Device()
  }

  setStats() {
    if(this.config.debug){
      this.stats = new Stats(true)
    }
  }
  
  setScene() {
    this.scene = new THREE.Scene()
  }

  setCamera() {
    this.camera = new Camera()
  }

  setRenderer() {
    uniforms.res.value.set(store.width, store.height, 1 / store.width, 1 / store.height)
    uniforms.pixelratio.value = this.config.pixelRatio
    this.renderer = new Renderer({rendererInstance: this.rendererInstance})
    this.targetElement.appendChild(this.renderer.instance.domElement)
  }

  setResources() {
    this.resources = new Resources()
  }

  setWorld() {
    this.world = new World()
  }

  setSceneEvents() {
    this.sceneEvents = new sceneEvents()
  }

  setTime() {
    this.time = new Time()
  }

  setMouse() {
    this.mouse = new Mouse()
  }

  update() {
    if(this.stats) this.stats.update()
    this.camera.update()
    this.renderer.update()

    window.requestAnimationFrame(() => {
      this.update()
    })
  }

  resize() {
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

    uniforms.res.value.x = store.width
    uniforms.res.value.y = store.height
    uniforms.res.value.z = 1 / store.width
    uniforms.res.value.w = 1 / store.height
    
    if(this.camera) this.camera.resize()
    if(this.world) this.world.resize()
    if(this.renderer) this.renderer.resize()
  }

}