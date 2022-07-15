import * as THREE from 'three'
import { App } from '~/webgl/index'
import { store } from '~/store'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { lerp } from '~/webgl/utils/Math'
export class Camera {
  constructor(_options) {
    this.app = new App()
    this.scene = this.app.scene
    this.targetElement = this.app.targetElement
    this.config = this.app.config
    this.debug = this.app.debug

    this.params = {
      Mode: 'debug',
      Camera: {x: 0, y: 2, z: 2},
      LookAt: {x: -0, y: 1, z: 0}
    }
    
    this.setCamera()
    this.setModes()
    if (this.debug) {
      this.setDebug()
    }
  }

  setCamera() {
    this.instance = new THREE.PerspectiveCamera(25, store.width / store.height, 0.1, 150)
    this.currentCamera = this.instance
    this.instance.position.set(this.params.Camera.x, this.params.Camera.y, this.params.Camera.z)
    // this.instance.lookAt(0,0,0)
    this.scene.add(this.instance)
  }

  setModes() {
    this.modes = {}

    // Default
    this.modes.default = {}
    this.modes.default.instance = this.instance.clone()
    this.modes.default.instance.position.set(this.params.Camera.x, this.params.Camera.y, this.params.Camera.z)
    this.modes.default.instance.lookAt(this.params.LookAt.x, this.params.LookAt.y, this.params.LookAt.z)


    // Orbit
    this.modes.debug = {}
    this.modes.debug.instance = this.instance.clone()
    this.modes.debug.instance.position.set(6, 6, 6)
    this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
    this.modes.debug.orbitControls.enabled = this.modes.debug.active
    this.modes.debug.orbitControls.screenSpacePanning = true
    this.modes.debug.orbitControls.enableKeys = false
    this.modes.debug.orbitControls.zoomSpeed = 0.25
    this.modes.debug.orbitControls.enableDamping = true
    this.modes.debug.orbitControls.update()

  }

  setDebug() {
    const cameraFolder = this.debug.addFolder({
      title: 'Camera'
    })
    cameraFolder.addInput(this.params, 'Mode', {
      options: {
        Default: 'default',
        Debug: 'debug'
      }
    })

    cameraFolder.addInput(store, 'currentState', {
      step: 1
    })
    cameraFolder.addInput(this.params, 'Camera').on('change', (ev) => {
      this.modes.default.instance.lookAt(this.params.LookAt.x, this.params.LookAt.y, this.params.LookAt.z)
      this.modes.default.instance.position.set(this.params.Camera.x, this.params.Camera.y, this.params.Camera.z)
    })
    cameraFolder.addInput(this.params, 'LookAt').on('change', (ev) => {
      this.modes.default.instance.lookAt(this.params.LookAt.x, this.params.LookAt.y, this.params.LookAt.z)
      this.modes.default.instance.position.set(this.params.Camera.x, this.params.Camera.y, this.params.Camera.z)
    })
  }

  resize() {
    this.instance.aspect = store.width / store.height
    this.instance.updateProjectionMatrix()

    this.modes.default.instance.aspect = store.width / store.height
    this.modes.default.instance.updateProjectionMatrix()

    this.modes.debug.instance.aspect = store.width / store.height
    this.modes.debug.instance.updateProjectionMatrix()
  }

  update() {
    this.modes.debug.orbitControls.update()

    this.currentCamera = this.modes[this.params.Mode].instance
    // Apply coordinates
    this.instance.position.copy(this.modes[this.params.Mode].instance.position)
    this.instance.quaternion.copy(this.modes[this.params.Mode].instance.quaternion)
    this.instance.updateMatrixWorld() // To be used in projection
    
    // Lerp Rotation
    let targetX = store.mouseX * .0002;
    let targetY = store.mouseY * .0001;

    // this.currentCamera.rotation.y += 0.05 * ( targetX - this.currentCamera.rotation.y );
    // this.currentCamera.rotation.x += 0.05 * ( targetY - this.currentCamera.rotation.x );

    // this.currentCamera.position.y += 0.05 * ( targetY - this.currentCamera.position.y );
  }

  destroy() {
    this.modes.debug.orbitControls.destroy()
  }
}