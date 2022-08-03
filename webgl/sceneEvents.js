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
    this.camera = this.app.camera
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

    watch(() => store.currentMerch, (value, oldValue) => {
      this.setMerch(value, oldValue)
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

  setMerch(value, oldValue) {
    let merchItems = [
      this.world.Teeshirt,
      this.world.Dad,
      this.world.Sleeve,
      this.world.Pants
    ]
    let newV = value - 1
    let old = oldValue - 1

    let newOrigin = new THREE.Vector3(0)
    let oldOrigin = new THREE.Vector3(0)
    let newRot = new THREE.Euler(0)
    let oldRot = new THREE.Euler(0)

    newOrigin.clone(merchItems[newV].basePosition)
    newRot.clone(merchItems[newV].baseRotation)

    oldOrigin.clone(merchItems[old].basePosition)
    oldRot.clone(merchItems[old].baseRotation)

    let newX = newOrigin.x + 1
    let oldX = oldOrigin.x - 0.5

    let oldEuler = oldOrigin.x + 0.5

    gsap.killTweensOf(merchItems[old].material.uniforms.uAlpha)
    gsap.killTweensOf(merchItems[old].position)
    gsap.killTweensOf(merchItems[old].rotation)

    gsap.killTweensOf(merchItems[newV].material.uniforms.uAlpha)
    gsap.killTweensOf(merchItems[newV].position)
    gsap.killTweensOf(merchItems[newV].rotation)

    gsap.to(merchItems[newV].material.uniforms.uAlpha, {value: 1, duration:4, ease:'power4.out'})
    gsap.fromTo(merchItems[newV].position, {x: newX}, {x: newOrigin.x, duration:4, ease:'power4.out'})
    gsap.fromTo(merchItems[newV].rotation, {x: oldX, y: oldX}, {y: newRot.y, x: newRot.x, duration:4, ease:'power4.out'})

    gsap.to(merchItems[old].material.uniforms.uAlpha, {value: 0, duration:3, ease:'power4.out'})
    gsap.to(merchItems[old].position, {x: oldX, duration:4, ease:'power4.out'})
    gsap.to(merchItems[old].rotation, {y: oldEuler, x: oldEuler, duration:4, ease:'power4.out'})
  }

  moveCamera(nb) {
    this.positions.forEach(element => {
      if(element.userData.position === nb) {
        this.camera.origin.copy(element.position)
        this.camera.lookAt.x = element.userData.lookX
        this.camera.lookAt.y = element.userData.lookY
        this.camera.lookAt.z = -element.userData.lookZ
        // gsap.to(this.camera.position, {x:element.position.x, y:element.position.y, z:element.position.z, duration:3, ease:'power2.inOut'})
        // gsap.to(this.camera.rotation, {x:element.rotation.x, y:element.rotation.y, z:element.rotation.z, duration:3, ease:'power2.inOut'})
      }    
    })
  }

  enterHome() {
    gsap.killTweensOf(this.world.Protagonist.material.uniforms.uAlpha)
    gsap.killTweensOf(this.world.People.material.uniforms.uAlpha)
    gsap.to(this.world.Protagonist.material.uniforms.uAlpha, {value: 1, duration:3, ease:'power2.out'})
    gsap.to(this.world.People.material.uniforms.uAlpha, {value: 1, duration:3, ease:'power2.out'})
  }
  leaveHome() {
    gsap.killTweensOf(this.world.Protagonist.material.uniforms.uAlpha)
    gsap.killTweensOf(this.world.People.material.uniforms.uAlpha)
    gsap.to(this.world.Protagonist.material.uniforms.uAlpha, {value: 0, duration:3, ease:'power2.out'})
    gsap.to(this.world.People.material.uniforms.uAlpha, {value: 0, duration:3, ease:'power2.out'})
  }

  enterBlackSheep() {
    gsap.killTweensOf(this.world.Protagonist.material.uniforms.uAlpha)
    gsap.killTweensOf(this.world.People.material.uniforms.uAlpha)
    gsap.to(this.world.Protagonist.material.uniforms.uAlpha, {value: 1, duration:2, ease:'power2.out'})
    gsap.to(this.world.People.material.uniforms.uAlpha, {value: 1, duration:4, ease:'power2.out'})
  }
  leaveBlackSheep() {
    gsap.killTweensOf(this.world.Protagonist.material.uniforms.uAlpha)
    gsap.killTweensOf(this.world.People.material.uniforms.uAlpha)
    gsap.to(this.world.Protagonist.material.uniforms.uAlpha, {value: 0, duration:4, ease:'power2.out'})
    gsap.to(this.world.People.material.uniforms.uAlpha, {value: 0, duration:2, ease:'power2.out'})
  }

  enterMerch() {
    let merchItems = [
      this.world.Teeshirt,
      this.world.Dad,
      this.world.Sleeve,
      this.world.Pants
    ]
    let current = store.currentMerch - 1

    gsap.killTweensOf(merchItems[current].material.uniforms.uAlpha)
    gsap.to(merchItems[current].material.uniforms.uAlpha, {value: 1, duration:5, ease:'power4.out'})
  }
  leaveMerch(){
    let merchItems = [
      this.world.Teeshirt,
      this.world.Dad,
      this.world.Sleeve,
      this.world.Pants
    ]
    let current = store.currentMerch - 1
    gsap.killTweensOf(merchItems[current].material.uniforms.uAlpha)
    gsap.to(merchItems[current].material.uniforms.uAlpha, {value: 0, duration:5, ease:'power4.out'})
  }

  enterVideo() {
    gsap.killTweensOf(this.world.video3D.material.uniforms.uAlpha)
    this.video.play()
    gsap.to(this.world.video3D.material.uniforms.uAlpha, {value: 1, duration:3, ease:'power2.out'})
  }
  leaveVideo() {
    gsap.killTweensOf(this.world.video3D.material.uniforms.uAlpha)
    gsap.to(this.world.video3D.material.uniforms.uAlpha, {value: 0, duration:3, ease:'power2.out'})
    this.video.pause()
  }

  sceneIntro() {
    let introPos = new THREE.Vector3(0, 1.4, 8)
    this.camera.origin.copy(introPos)
    // x: 0, y: 1.4, z: 5
    // gsap.from(this.camera.position, {x:0, y:1.4, z:18, duration:4, ease:'power3.inOut'}, 1)
    // gsap.to(this.camera.rotation, {x:this.positions[0].rotation.x, y:this.positions[0].rotation.y, z:this.positions[0].rotation.z, duration:4, ease:'power3.inOut'}, 1)
  }
}