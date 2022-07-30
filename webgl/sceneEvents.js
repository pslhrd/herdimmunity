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

    this.video = this.app.video
  

    this.positions = []
    
    watch(() => store.currentState, (value, oldValue) => {
      this.moveCamera(store.currentState)

      if(value === 1 && oldValue != 2) {
       this.enterHome()
      }
      if(value === 2 && oldValue != 1) {
       this.enterBlackSheep()
      }

      if(value === 3) {
        this.enterMerch()
      }
      if(value === 4) {
        this.enterVideo()
      }
      if(oldValue === 1 && value !=2) {
        this.leaveHome()
      }
      if(oldValue === 2 && value != 1) {
        this.leaveBlackSheep()
      }
      if(oldValue === 3) {
        this.leaveMerch()
      }
      if(oldValue === 4) {
        this.leaveVideo()
      }
    })

    watch(() => store.assetsLoaded, () => {
      this.getElements()
      this.sceneIntro()
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
  
  getElements() {
    this.scene.traverse((element) => {
      if (element.userData.position) {
        this.positions.push(element)
      }
    })
  }

  moveCamera(nb) {
    this.positions.forEach(element => {
      if(element.userData.position === nb) {
        gsap.to(this.camera.position, {x:element.position.x, y:element.position.y, z:element.position.z, duration:3, ease:'power2.inOut'})
        gsap.to(this.camera.rotation, {x:element.rotation.x, y:element.rotation.y, z:element.rotation.z, duration:3, ease:'power2.inOut'})
      }    
    })
  }

  enterHome() {
    gsap.to(this.world.Protagonist.material.uniforms.uAlpha, {value: 1, duration:1, ease:'power2.out'})
    gsap.to(this.world.People.material.uniforms.uAlpha, {value: 1, duration:1, ease:'power2.out'})
  }
  leaveHome() {
    gsap.to(this.world.Protagonist.material.uniforms.uAlpha, {value: 0, duration:1, ease:'power2.out'})
    gsap.to(this.world.People.material.uniforms.uAlpha, {value: 0, duration:1, ease:'power2.out'})
  }

  enterBlackSheep() {
    gsap.to(this.world.Protagonist.material.uniforms.uAlpha, {value: 1, duration:1, ease:'power2.out'})
    gsap.to(this.world.People.material.uniforms.uAlpha, {value: 1, duration:1, ease:'power2.out'})
  }
  leaveBlackSheep() {
    gsap.to(this.world.Protagonist.material.uniforms.uAlpha, {value: 0, duration:1, ease:'power2.out'})
    gsap.to(this.world.People.material.uniforms.uAlpha, {value: 0, duration:1, ease:'power2.out'})
  }

  enterMerch() {
    gsap.from(this.world.Teeshirt.scale, {x:0.7, y:0.7, z:0.7, duration:2, ease:'power3.out'}, 1)
    gsap.from(this.world.Teeshirt.rotation, {y:2, duration:2, ease:'power3.out'}, 1)
    gsap.to(this.world.Teeshirt.material.uniforms.uAlpha, {value: 1, duration:1, ease:'power3.out'}, 1)
  }
  leaveMerch(){
    gsap.to(this.world.Teeshirt.material.uniforms.uAlpha, {value: 0, duration:1, ease:'power2.out'})
  }

  enterVideo() {
    this.video.play()
    gsap.to(this.world.video3D.material, {opacity: 1, duration:1, ease:'power2.out'})
  }
  leaveVideo() {
    gsap.to(this.world.video3D.material, {opacity: 0, duration:0.5, ease:'power2.out'})
    this.video.pause()
  }

  sceneIntro() {
    console.log(this.positions)
    gsap.from(this.camera.position, {x:0, y:1.4, z:18, duration:4, ease:'power3.inOut'}, 1)
    gsap.to(this.camera.rotation, {x:this.positions[0].rotation.x, y:this.positions[0].rotation.y, z:this.positions[0].rotation.z, duration:4, ease:'power3.inOut'}, 1)
  }
}