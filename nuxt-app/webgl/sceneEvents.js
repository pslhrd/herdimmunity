import * as THREE from 'three'
import { store } from '~/store'
import { App } from '~/webgl/index'
import { watch } from 'vue'
import gsap from 'gsap'

export class sceneEvents {
  constructor(_options) {
    this.app = new App()
    this.scene = this.app.scene
    this.config = this.app.config
    this.debug = this.app.debug
    this.resources = this.app.resources
    this.camera = this.app.camera.modes.default.instance
    this.currentCamera = this.app.camera.currentCamera
    this.world = this.app.world
    
    watch(() => store.currentState, () => {
      if(store.currentState === 0) {
        this.sceneIntro()
      }
      if(store.currentState === 1) {
        this.sceneVideo()
      }
      if(store.currentState === 2) {
        this.sceneBlackSheep()
      }
      if(store.currentState === 3) {
        this.scenePhases()
      }
      if(store.currentState === 4) {
        this.sceneMerch()
      }
    })

    if (this.debug) {this.setDebug()}
  }

  setDebug() {
    const btn = this.debug.addButton({
      title: 'Copy Coords',
    });
    btn.on('click', () => {
      console.table(this.currentCamera.position)
      console.table(this.currentCamera.quaternion)
    });
  }

  sceneIntro() {
    console.log('Intro')
    gsap.to(this.camera.quaternion, {x:-0.13630286779281925, y:0.017372058285982938, z:0.002390542830620354,w:0.990512001505957, duration:3, ease:'power2.inOut'})
    gsap.to(this.camera.position, {x:0.1, y:3.6, z:5.7, duration:3, ease:'power2.inOut'})
  }

  sceneVideo() {
    console.log('YOFC Video')
    gsap.to(this.camera.position, {x:0.1, y:15.5, z:0.8, duration:3, ease:'power2.inOut'})
  }

  sceneBlackSheep() {
    console.log('BlackSheep')
    gsap.to(this.camera.quaternion, {x:-0.6893309359946934, y:-0.010562445396997244, z:-0.010052494943426197,w:0.7242998293340458, duration:3, ease:'power2.inOut'})
    gsap.to(this.camera.position, {x:-0.16, y:12.7, z:0.8, duration:3, ease:'power2.inOut'})
  }

  scenePhases() {
    console.log('Phases')
    gsap.to(this.camera.quaternion, {x:-0.16401777924653838, y:0.19845811357810872, z:0.03370680407213799,w:0.9656999516440367, duration:3, ease:'power2.inOut'})
    gsap.to(this.camera.position, {x:1.2, y:5, z:7.6, duration:3, ease:'power2.inOut'})
  }

  sceneMerch() {
    console.log('Merch')
  }
}