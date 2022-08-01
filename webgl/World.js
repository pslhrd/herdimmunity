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

import { Reflector } from '~/webgl/components/Reflector'
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
    // this.MerchMaterial = MerchMaterial.use();
    this.CharacterMaterial = CharacterMaterial.use();
    this.ProtagonistMaterial = ProtagonistMaterial.use();
    this.TextMaterial = TextMaterial.use();;
    this.scene.fog = new THREE.Fog(0x121212, 5, 12)
  }

  setScene() {
    this.scene.add(this.resources.items.draco.scene)
    this.resources.items.draco.scene.traverse((element) => {
      if (element.name === 'TEE') {
        element.material = new MerchMaterial({diffuse: this.resources.items.teeDiffuse})
        this.Teeshirt = element
        element.basePosition = new THREE.Vector3()
        element.baseRotation = new THREE.Euler()
        element.basePosition.clone(element.position)
        element.baseRotation.clone(element.rotation)
      }

      if (element.name === 'DAD') {
        element.material = new MerchMaterial({diffuse: this.resources.items.dad})
        this.Dad = element
        element.basePosition = new THREE.Vector3()
        element.baseRotation = new THREE.Euler()
        element.basePosition.clone(element.position)
        element.baseRotation.clone(element.rotation)
      }

      if (element.name === 'PANTS') {
        element.material = new MerchMaterial({diffuse: this.resources.items.pants})
        this.Pants = element
        element.basePosition = new THREE.Vector3()
        element.baseRotation = new THREE.Euler()
        element.basePosition.copy(element.position)
        element.baseRotation.copy(element.rotation)
      }


      if (element.name === 'GROUND') {
        // element.material = this.GroundMaterial
        this.Ground = element
      }

      if (element.name === 'VIDEO') {
        const videoTexture = new THREE.VideoTexture(this.video)
        element.material = new THREE.MeshBasicMaterial({map:videoTexture, transparent: true});
        let material = element.material
        material.onBeforeCompile = (shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <specularmap_fragment>',
            `
            #include <specularmap_fragment>
            if(opacity <= 0.001) discard;
            `
         )
        }
        element.material.needsUpdate = true;
        this.video3D = element
      }

      if (element.name === 'PROTAGONIST') {
        this.Protagonist = element
        element.material = this.ProtagonistMaterial
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
    
    const directional = new THREE.DirectionalLight(0xffffff, 1)
    const helper = new THREE.DirectionalLightHelper( directional, 5 );
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2)
    const hemi = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
    this.scene.add(ambientlight, directional)

    const geometry = new THREE.PlaneBufferGeometry(20, 20)
    const mirror = new Reflector(geometry, {
      clipBias: 0.003,
      textureWidth: 1024 * this.config.pixelRatio,
      textureHeight: 1024 * this.config.pixelRatio,
      color: 0x232323,
      recursion: 1
    })
    mirror.rotateX(-Math.PI / 2);
    mirror.position.y = 0;
    mirror.material.transparent = true;
    mirror.material.alpha = 1;
  
    this.scene.add(mirror);

    store.worldSet = true;
  }

  setVideoPlayer() {

  }

  resize() {}
}