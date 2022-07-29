import * as THREE from 'three'
import { store } from '~/store'
import { App } from '~/webgl/index'
import { watch } from 'vue'
import { uniforms } from '~/webgl/shaders/uniforms'

import MerchMaterial from '~/webgl/shaders/materials/merchMaterial/merchMaterial'
import ProtagonistMaterial from '~/webgl/shaders/materials/protagonistMaterial/protagonistMaterial'
import TextMaterial from '~/webgl/shaders/materials/textMaterial/textMaterial'
import CharacterMaterial from '~/webgl/shaders/materials/characterMaterial/characterMaterial'
import GroundMaterial from '~/webgl/shaders/materials/groundMaterial/groundMaterial'

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

export class World {
  constructor(_options) {
    this.app = new App()
    this.scene = this.app.scene
    this.config = this.app.config
    this.resources = this.app.resources
    this.video = this.app.video
    this.renderer = this.app.renderer
    this.camera = this.app.camera.modes.default.instance
    this.uniforms = uniforms

    watch(() => store.assetsLoaded, () => {
      this.setMaterials()
      this.setScene()
      this.setVideoPlayer()
    })
  
  }

  setMaterials() {
    this.MerchMaterial = MerchMaterial.use();
    this.CharacterMaterial = CharacterMaterial.use();
    this.ProtagonistMaterial = ProtagonistMaterial.use();
    this.TextMaterial = TextMaterial.use();
    this.GroundMaterial = GroundMaterial.use();
    // this.scene.fog = new THREE.Fog(0x000000, 12, 16)
  }

  setScene() {
    this.scene.add(this.resources.items.draco.scene)
    this.resources.items.draco.scene.traverse((element) => {
      if (element.name === 'TEE') {
        element.material = this.MerchMaterial
        this.Teeshirt = element
        element.material.uniforms.uAlpha.value = 0
      }

      if (element.name === 'GROUND') {
        this.Ground = element
      }

      if (element.name === 'VIDEO') {
        const videoTexture = new THREE.VideoTexture(this.video)
        element.material = new THREE.MeshBasicMaterial( {map:videoTexture, transparent: true, opacity:0} );
        element.material.needsUpdate = true;
        this.video3D = element
      }

      if (element.name === 'PROTAGONIST') {
        this.Protagonist = element
        element.material = this.ProtagonistMaterial
      }

      if (element.name === '1') {
        console.log(element.position)
        console.log(element.rotation)
      }

      if (element.name === 'TEXT') {
        this.Text = element
        element.material = this.TextMaterial
      }

      if (element.name === 'PEOPLE') {
        this.People = element
        element.material = this.CharacterMaterial
      }
      
    })
    
    const directional = new THREE.DirectionalLight()
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2)
    this.scene.add(ambientlight, directional) 
  }

  setVideoPlayer() {

  }

  resize() {}
}