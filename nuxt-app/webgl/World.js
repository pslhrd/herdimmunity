import * as THREE from 'three'
import { store } from '~/store'
import { App } from '~/webgl/index'
import { watch } from 'vue'

export class World {
  constructor(_options) {
    this.app = new App()
    this.scene = this.app.scene
    this.config = this.app.config
    this.resources = this.app.resources

    watch(() => store.assetsLoaded, () => {
      this.setDummy()
    })
   
  }

  setDummy() {
    this.resources.items.draco.scene.traverse((element) => {
      console.log(element)
      if (element.name === 'MAIN') {
        this.scene.add(element)
      }
    })
    const light = new THREE.AmbientLight( 0x404040 );
    this.scene.add(light) 
  }

  resize() {}
}