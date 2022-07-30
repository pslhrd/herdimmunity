import * as THREE from 'three'
import { App } from '~/webgl/index'
import { store } from '~/store'
import { uniforms } from '~/webgl/shaders/uniforms'

import fs from './merchMaterial.frag';
import vs from './merchMaterial.vert';

let instance = null;

export default class MerchMaterial extends THREE.ShaderMaterial {
  constructor() {
    super();

    this.app = new App();
    this.resources = this.app.resources;
    this.uAlpha = 1;

    this.resources.items.teeDiffuse.flipY = false;
    this.resources.items.teeNormal.flipY = false;

    this.uniforms =  {
      ...THREE.UniformsUtils.merge([
        THREE.UniformsLib['common'],
        THREE.UniformsLib['envmap'],
        THREE.UniformsLib['normalmap'],
        THREE.UniformsLib['lights'],
        THREE.UniformsLib['fog'],
      ]),
      ...this.uniforms,
      diffuseTex: {value: this.resources.items.teeDiffuse},
      uAlpha: new THREE.Uniform(this.uAlpha)
    },

    this.normalMap = this.uniforms.normalMap.value = this.resources.items.teeNormal
    this.normalScale = this.uniforms.normalScale.value = new THREE.Vector2(4, 4);

    this.vertexShader = vs;
    this.fragmentShader = fs;

    this.lights = true;
    this.fog = true;
    this.side = THREE.DoubleSide;

    this.type = 'ShaderMaterial';
    this.isShaderMaterial = true;
    this.transparent = true;
  }
}

MerchMaterial.use = function use() {
	instance = instance || new MerchMaterial();
	return instance;
};