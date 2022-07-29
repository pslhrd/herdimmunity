import * as THREE from 'three'
import { store } from '~/store'
import { App } from '~/webgl/index'
import { uniforms } from '~/webgl/shaders/uniforms'

import fs from './protagonistMaterial.frag';
import vs from './protagonistMaterial.vert';

let instance = null;

export default class ProtagonistMaterial extends THREE.ShaderMaterial {
  constructor() {
    super();

    this.app = new App()
    this.resources = this.app.resources
    this.uAlpha = 1;

    this.uniforms =  {
      ...THREE.UniformsUtils.merge([
        THREE.UniformsLib['fog'],
      ]),
      ...uniforms,
      matcap: {value: this.resources.items.matcap},
      roughness: {value: this.resources.items.roughness},
      grunge: {value: this.resources.items.grunge},
      uAlpha: new THREE.Uniform(this.uAlpha)
    },

    this.vertexShader = vs;
    this.fragmentShader = fs;

    this.type = 'ShaderMaterial';
    this.isShaderMaterial = true;
    this.fog = true;
    this.transparent = true;
    this.needsUpdate = true;
  }
}

ProtagonistMaterial.use = function use() {
	instance = instance || new ProtagonistMaterial();
	return instance;
};