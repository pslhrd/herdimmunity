import * as THREE from 'three'
import { App } from '~/webgl/index'
import { store } from '~/store'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { lerp, dampPrecise, damp, clampedMap } from '~/webgl/utils/Math'
export class Camera {
  constructor(_options) {
    this.app = new App()
    this.scene = this.app.scene
    this.targetElement = this.app.targetElement
    this.config = this.app.config
    this.debug = this.app.debug
    this.time = this.app.time
    this.mouse = this.app.mouse.scene

    this.params = {
      Mode: 'default',
      Camera: {x: 0, y: 1.4, z: 18},
      Rotation: {x:-0, y:0, z:0},
      LookAt: {x: -0, y: 1, z: 0}
    }

    console.log(this.mouse)

    this.useMouse = true;

    this.lookAt = new THREE.Vector3(0, 1.2, 0);
    this.origin = new THREE.Vector3(0, 1.4, 5);
    this.target = new THREE.Vector3();
    this.targetXY = new THREE.Vector2(2.5, 1.2);

    this.VecA = new THREE.Vector3(0);
    this.VecB = new THREE.Vector2(0);
    this.lerpSpeed = 0.01;
    
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
    this.instance.rotation.set(this.params.Rotation.x, this.params.Rotation.y, this.params.Rotation.z)
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
    const dt = this.time.delta
    // IF DEBUG
    this.modes.debug.orbitControls.update()
    this.currentCamera = this.modes[this.params.Mode].instance
    this.instance.position.copy(this.modes[this.params.Mode].instance.position)
    this.instance.quaternion.copy(this.modes[this.params.Mode].instance.quaternion)
    this.instance.updateMatrixWorld()

    this.VecA.lerp(this.lookAt, this.lerpSpeed)

    this.currentCamera.position.lerp(this.origin, this.lerpSpeed);

    this.target.x = this.origin.x + this.targetXY.x * this.mouse.x;
    this.target.y = this.origin.y + this.targetXY.y * this.mouse.y;
    this.target.z = this.origin.z;

    // console.log(this.target)
    this.currentCamera.position.lerp(this.target, this.lerpSpeed);
    this.currentCamera.lookAt(this.VecA)
    // let x = clampedMap(this.currentCamera.position.x, 0, 10, -1, 1);

    // console.log(x)
		// const txEase = this.useMouse ? 0.07 : 0.14;
		// this.offsetX = damp(this.offsetX, x * 0.6, txEase, dt);
		// this.currentCamera.translateX(this.offsetX);

    // // MOUSEMOVE
		// const mx = this.useMouse ? this.mouse.scene.x * this.mouseInfluence : 0;
		// const my = this.useMouse ? this.mouse.scene.y * this.mouseInfluence : 0;


    // let pmx = this.mx;
    // this.mx = dampPrecise(this.mx, mx * 0.4, 0.08, dt, 0.01);
    // this.my = dampPrecise(this.my, my * 0.2, 0.08, dt, 0.01);

		// if (this.mx !== 0 && this.my !== 0) {
		// 	this.currentCamera.translateX(this.mx);
		// 	this.currentCamera.rotateY(this.mx * 0.1);
		// 	this.currentCamera.rotateX(this.my * -0.1);
		// 	this.currentCamera.translateY(this.my);
		// 	this.dx = damp(this.dx, (this.mx - pmx) * 0.8, 0.1, dt);
		// 	this.currentCamera.rotateZ(this.dx);
		// }
  }

  destroy() {
    this.modes.debug.orbitControls.destroy()
  }
}