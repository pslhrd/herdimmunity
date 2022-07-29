import * as THREE from 'three'
import { store } from '~/store'
import { App } from '~/webgl/index'
import { uniforms } from '~/webgl/shaders/uniforms'

import fs from './textMaterial.frag';
import vs from './textMaterial.vert';

let instance = null;

export default class TextMaterial extends THREE.ShaderMaterial {
  constructor() {
    super();

    this.app = new App();
    this.resources = this.app.resources;

    this.uniforms =  {
      ...THREE.UniformsUtils.merge([
        THREE.UniformsLib['fog'],
      ]),
      ...this.uniforms,
      matcap: {value: this.resources.items.matcap},
      roughness: {value: this.resources.items.roughness}
    },

    this.vertexShader = vs;
    this.fragmentShader = fs;

    this.type = 'ShaderMaterial';
    this.isShaderMaterial = true;
    this.fog = true;
  }
}

TextMaterial.use = function use() {
	instance = instance || new TextMaterial();
	return instance;
};