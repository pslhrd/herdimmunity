import * as THREE from 'three'
import { App } from '~/webgl/index'
import { store } from '~/store'
import { watch } from 'vue'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'


import { uniforms } from '~/webgl/shaders/uniforms'
import fs from './shaders/postprocessing/postProcessing.frag'
import vs from './shaders/postprocessing/postProcessing.vert'
export class Renderer {
  constructor(_options) {
    this.app = new App()
    this.scene = this.app.scene
    this.camera = this.app.camera
    this.config = this.app.config
    this.resources = this.app.resources

    this.usePostProcess = true
    this.setInstance()
    
    watch(() => store.assetsLoaded, () => {
      this.setPostProcess()
    })
  }

  setInstance() {
    this.clearColor = '#1D1D1D'

    // Renderer
    this.instance = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true
    })
    this.instance.domElement.style.position = 'absolute'
    this.instance.domElement.style.top = 0
    this.instance.domElement.style.left = 0
    this.instance.domElement.style.width = '100%'
    this.instance.domElement.style.height = '100%'
    this.instance.setClearColor(this.clearColor, 1)
    this.instance.setSize(store.width, store.height)
    this.instance.setPixelRatio(this.config.pixelRatio)

    this.context = this.instance.getContext()
  }

  setPostProcess() {
    this.postProcess = {}

    this.postProcess.renderPass = new RenderPass(this.scene, this.camera.currentCamera)
    this.postProcess.composer = new EffectComposer(this.instance)
    this.postProcess.composer.setSize(store.width, store.height)
    this.postProcess.composer.setPixelRatio(this.config.pixelRatio)
    this.postProcess.composer.addPass(this.postProcess.renderPass)

    this.processingShader = {
      uniforms: {
        ...uniforms,
        tDiffuse: {value: null},
        opacity: {value: 1.0},
        noise: {value: this.resources.items.noise},
        res: {value: new THREE.Vector4()},
        dpi: { value: 0 },
        ditherOffset: { value: [ 0, 0 ] },
      },
    
      vertexShader: vs,
      fragmentShader: fs
    }

    console.log(this.processingShader)

    this.postProcessingPass = new ShaderPass(this.processingShader)
    this.postProcessingPass.renderToScreen = true
    this.postProcess.composer.addPass(this.postProcessingPass)
  }

  update() {
    if(this.usePostProcess & store.assetsLoaded) {
      this.postProcess.composer.render()
    } else {
      this.instance.render(this.scene, this.camera.currentCamera)
    }
  }

  resize() {
    // Instance
    this.instance.setSize(store.width, store.height)
    this.instance.setPixelRatio(this.config.pixelRatio)
    
    
    // Post Process
    this.postProcess.composer.setSize(store.width, store.height)
    this.postProcess.composer.setPixelRatio(this.config.pixelRatio)
    this.processingShader.uniforms.res.value.set(store.width, store.height, 1 / store.width, 1 / store.height)
  }

  updateNoise(noise) {
		noise.frame += 1;
		if (noise.frame < noise.maxFrames) return;
		noise.frame = 0;
		noise.value[ 0 ] = prng.randomInt(-noiseSize * 0.5, noiseSize * 0.5);
		noise.value[ 1 ] = prng.randomInt(-noiseSize * 0.5, noiseSize * 0.5);
	}

  destroy() {
    this.instance.renderLists.dispose()
    this.instance.dispose()
  }
}