import * as THREE from 'three'
import { store } from '~/store'
import { App } from '~/webgl/index'
import { watch } from 'vue'
import { uniforms } from '~/webgl/shaders/uniforms'
import fs from '~/webgl/shaders/materials/characterMaterial/characterMaterial.frag'
import vs from '~/webgl/shaders/materials/characterMaterial/characterMaterial.vert'

import fs2 from '~/webgl/shaders/materials/protagonistMaterial/protagonistMaterial.frag'
import vs2 from '~/webgl/shaders/materials/protagonistMaterial/protagonistMaterial.vert'

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

export class World {
  constructor(_options) {
    this.app = new App()
    this.scene = this.app.scene
    this.config = this.app.config
    this.resources = this.app.resources
    this.video = this.app.video
    this.uniforms = uniforms

    watch(() => store.assetsLoaded, () => {
      this.setGround()
      this.setDummy()
      this.setVideoPlayer()
    })
  
  }

  setGround() {
    const rectLight = new THREE.RectAreaLight( 0xffffff, 20,  2, 2 )
    rectLight.position.set( 0, 3, 0 )
    rectLight.lookAt( 0, 0, 0 )
    const helper = new RectAreaLightHelper( rectLight );
    this.scene.add(rectLight, helper)
    // this.scene.fog = new THREE.Fog(0x000000, 12, 16)
  }

  setDummy() {
    this.scene.add(this.resources.items.draco.scene)
    this.resources.items.draco.scene.traverse((element) => {
      // if (element.name === 'SCREEN') {
      // }

      // if (element.name === "GROUND") {
      // }

      // if (element.name === 'CHARACTERS') {
      //   element.children[0].material = new THREE.ShaderMaterial({
      //     uniforms: {
      //       ...THREE.UniformsUtils.merge([
      //         THREE.UniformsLib['fog'],
      //       ]),
      //       ...this.uniforms
      //     },
      //     vertexShader: vs,
      //     fragmentShader: fs,
      //     fog: true
      //   })
      //   element.children[1].material = new THREE.ShaderMaterial({
      //     uniforms: {
      //       ...THREE.UniformsUtils.merge([
      //         THREE.UniformsLib['fog'],
      //       ]),
      //       ...this.uniforms
      //     },
      //     vertexShader: vs2,
      //     fragmentShader: fs2,
      //     fog: true
      //   })
      // }
    })
    // const hemiLight = new THREE.HemisphereLight(0x443333, 0x111122)
    // this.scene.add(hemiLight)
    const ambientlight = new THREE.AmbientLight()
    const directional = new THREE.DirectionalLight()
    this.scene.add(ambientlight, directional) 
  }

  setVideoPlayer() {

  }

  resize() {}
}