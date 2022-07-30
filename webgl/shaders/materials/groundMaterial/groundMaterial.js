import * as THREE from 'three'
import { App } from '~/webgl/index'
import { store } from '~/store'
import { uniforms } from '~/webgl/shaders/uniforms'

import fs from './groundMaterial.frag';
import vs from './groundMaterial.vert';

let instance = null;

export default class GroundMaterial extends THREE.ShaderMaterial {
  constructor() {
    super();

    this.app = new App();
    this.resources = this.app.resources;

    this.resources.items.ao.flipY = true

    this.uniforms =  {
      ...THREE.UniformsUtils.merge([
        THREE.UniformsLib['common'],
        THREE.UniformsLib['envmap'],
        THREE.UniformsLib['normalmap'],
        THREE.UniformsLib['lights'],
        THREE.UniformsLib['fog'],
        THREE.UniformsLib['roughnessmap'],
        THREE.UniformsLib['metalnessmap']
      ]),
      ...this.uniforms,
      color: {value: null},
      tDiffuse: {value: null},
      tDepth: {value: null},
      textureMatrix: {value: null},
      mirror: {value: 0.75},
      mixStrength: {value: 1},
      metalness: {value: 1},
      roughness: {value: 1},
      ambient: {value: this.resources.items.ao}
    },

    this.vertexShader = vs;
    this.fragmentShader = fs;

    console.log(this.uniforms)

    this.map = this.uniforms.map.value = this.resources.items.concrete

    this.metalnessMap = this.uniforms.metalnessMap.value = this.resources.items.orm
    this.roughnessMap = this.uniforms.roughnessMap.value = this.resources.items.orm

    this.normalMap = this.uniforms.normalMap.value = this.resources.items.normalMap
    this.normalScale = this.uniforms.normalScale.value = new THREE.Vector2(1,1);

    this.map.wrapS = THREE.RepeatWrapping;
    this.map.wrapT = THREE.RepeatWrapping;
    this.map.repeat.set(16, 16);

    this.normalMap.wrapS = THREE.RepeatWrapping;
    this.normalMap.wrapT = THREE.RepeatWrapping;
    this.normalMap.repeat.set(16, 16);

    this.resources.items.orm.wrapS = THREE.RepeatWrapping;
    this.resources.items.orm.wrapT = THREE.RepeatWrapping;
    this.resources.items.orm.repeat.set(16, 16);

    this.lights = true;
    this.fog = true;
    // this.side = THREE.DoubleSide;
    // this.needsUpdate = true;
    this.transparent = true;

    this.type = 'ShaderMaterial';
  }
}

GroundMaterial.use = function use() {
	instance = instance || new GroundMaterial();
	return instance;
};