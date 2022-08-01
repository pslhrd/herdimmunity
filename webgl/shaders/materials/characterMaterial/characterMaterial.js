import * as THREE from 'three'
import { store } from '~/store'
import { App } from '~/webgl/index'
import { uniforms } from '~/webgl/shaders/uniforms'

import fs from './characterMaterial.frag';
import vs from './characterMaterial.vert';

let instance = null;

export default class CharacterMaterial extends THREE.ShaderMaterial {
  constructor() {
    super();

    this.app = new App();
    this.resources = this.app.resources;
    this.resources.items.noiseMap.mapping = THREE.RepeatWrapping;
    this.resources.items.noiseMap.wrapS = THREE.RepeatWrapping;
    this.resources.items.noiseMap.wrapT = THREE.RepeatWrapping;

    this.uAlpha = 1;

    this.uniforms =  {
      ...THREE.UniformsUtils.merge([
        THREE.UniformsLib['fog'],
      ]),
      ...uniforms,
      matcap: {value: this.resources.items.matcap},
      roughness: {value: this.resources.items.roughness},
      uAlpha: new THREE.Uniform(this.uAlpha),
      noiseMap: {value: this.resources.items.noiseMap},
    },

    this.vertexShader = vs;
    this.fragmentShader = fs;

    this.type = 'ShaderMaterial';
    this.isShaderMaterial = true;
    this.fog = true;
    this.transparent = true;
  }
}

CharacterMaterial.use = function use() {
	instance = instance || new CharacterMaterial();
	return instance;
};