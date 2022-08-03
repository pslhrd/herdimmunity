import * as THREE from 'three'
import { App } from '~/webgl/index'
import { store } from '~/store'
import { uniforms } from '~/webgl/shaders/uniforms'

import fs from './videoMaterial.frag';
import vs from './videoMaterial.vert';

let instance = null;

export default class VideoMaterial extends THREE.ShaderMaterial {
  constructor(_options) {
    super();
    this.uDiffuse = _options.map
    this.app = new App();
    this.resources = this.app.resources;
    this.uAlpha = 0;

    console.log(this.uDiffuse)

    // this.uDiffuse.flipY = false;

    this.uniforms =  {
      ...THREE.UniformsUtils.merge([
        THREE.UniformsLib['common'],
        THREE.UniformsLib['envmap'],
        THREE.UniformsLib['normalmap'],
        THREE.UniformsLib['lights'],
        THREE.UniformsLib['fog'],
      ]),
      ...this.uniforms,
      diffuseTex: {value: this.uDiffuse},
      uAlpha: new THREE.Uniform(this.uAlpha),
      noiseMap: {value: this.resources.items.noiseMap},
    },

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

VideoMaterial.use = function use() {
	instance = instance || new VideoMaterial();
	return instance;
};