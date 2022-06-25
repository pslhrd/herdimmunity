import * as THREE from 'three'
import { App } from '~/webgl/index'

export class World {
  constructor(_options) {
    this.app = new App()
    this.scene = this.app.scene
    this.config = this.app.config
    
    this.setDummy()
  }

  setDummy() {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 'red' })
    )
    const light = new THREE.AmbientLight( 0x404040 );
    this.scene.add(cube, light) 
  }

  resize() {}
}