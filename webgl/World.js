import * as THREE from 'three'
import { store } from '~/store'
import { App } from '~/webgl/index'
import { watch } from 'vue'
import { uniforms } from '~/webgl/shaders/uniforms'
import fs from '~/webgl/shaders/materials/characterMaterial/characterMaterial.frag'
import vs from '~/webgl/shaders/materials/characterMaterial/characterMaterial.vert'

export class World {
  constructor(_options) {
    this.app = new App()
    this.scene = this.app.scene
    this.config = this.app.config
    this.resources = this.app.resources
    this.uniforms = uniforms
    watch(() => store.assetsLoaded, () => {
      this.setGround()
      this.setDummy()
    })
  
  }

  setGround() {
    const geometry = new THREE.PlaneGeometry(30, 30)
    const material = new THREE.MeshStandardMaterial({color: 0x111111, side: THREE.DoubleSide, roughnessMap: this.resources.items.roughness, roughness: 0.5})
    const plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = Math.PI / 2
    this.scene.add( plane )

    this.scene.fog = new THREE.Fog(0x1D1D1D, 12, 16)
  }

  setDummy() {
    this.resources.items.draco.scene.traverse((element) => {
      if (element.name === 'MAIN') {
        this.scene.add(element)
        element.children[0].material = new THREE.ShaderMaterial({
          uniforms: {
            ...THREE.UniformsUtils.merge([
              THREE.UniformsLib['fog'],
            ]),
            ...this.uniforms
          },
          vertexShader: vs,
          fragmentShader: fs,
          fog: true
        })
      }
    })
    const directional = new THREE.DirectionalLight(0xffffff, 0.8)
    directional.position.set(0,5,0)
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.8)
    // this.scene.add(ambientlight, directional) 
  }

  resize() {}
}