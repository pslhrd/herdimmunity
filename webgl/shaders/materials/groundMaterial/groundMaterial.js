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

    this.resources.items.teeDiffuse.flipY = false;
    this.resources.items.teeNormal.flipY = false;

    this.diffuse = this.resources.items.teeNormal

    this.uniforms =  {
      ...THREE.UniformsUtils.merge([
        THREE.UniformsLib['common'],
        THREE.UniformsLib['envmap'],
        THREE.UniformsLib['normalmap'],
        THREE.UniformsLib['lights'],
        THREE.UniformsLib['fog'],
      ]),
      ...this.uniforms,
      uMapTransform: new THREE.Uniform(new THREE.Matrix3()),
      uMatrix: new THREE.Uniform(new THREE.Matrix4()),
      uColor: new THREE.Uniform(new THREE.Color(0x101010)),
      uReflectivity: new THREE.Uniform(0),
      uMirror: new THREE.Uniform(1),
      MixStrength: new THREE.Uniform(4),
      tReflect: {value: this.diffuse}
    },

    this.normalMap = this.uniforms.normalMap.value = this.resources.items.normalMap
    this.normalScale = this.uniforms.normalScale.value = new THREE.Vector2(1,1);

    this.vertexShader = vs;
    this.fragmentShader = fs;

    this.lights = true;
    this.fog = true;
    this.side = THREE.DoubleSide;
    this.needsUpdate = true;

    this.type = 'ShaderMaterial';
    this.isShaderMaterial = true;
  }
}

GroundMaterial.use = function use() {
	instance = instance || new GroundMaterial();
	return instance;
};