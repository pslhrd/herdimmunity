import * as THREE from 'three'
import { App } from '~/webgl/index'
import { store } from '~/store'
import { watch } from 'vue'

import prng from '~/webgl/utils/prng'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import { SSREffect } from 'screen-space-reflections'
import * as POSTPROCESSING from 'postprocessing'


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
    this.debug = this.app.debug
    this.time = this.app.time

    this.canvas = _options.canvas

    this.usePostProcess = true
    this.setInstance()
    
    watch(() => store.assetsLoaded, () => {
      this.setPostProcess()
      if(this.debug) {
        // this.setDebug()
      }
    })
  }

  setInstance() {
    this.clearColor = '#121212'

    // Renderer
    this.instance = new THREE.WebGLRenderer({
      // canvas: this.canvas,
      alpha: true,
      antialias: false
    })
    this.instance.domElement.style.position = 'absolute'
    this.instance.domElement.style.top = 0
    this.instance.domElement.style.left = 0
    this.instance.domElement.style.width = '100%'
    this.instance.domElement.style.height = '100%'
    this.instance.setClearColor(this.clearColor, 1)
    this.instance.setSize(store.width, store.height)
    this.instance.setPixelRatio(this.config.pixelRatio)

    this.instance.outputEncoding = THREE.sRGBEncoding
    this.instance.toneMapping = THREE.ACESFilmicToneMapping

    this.context = this.instance.getContext()
  }

  setPostProcess() {
    this.postProcess = {}
    this.noises = {}
    const ensureFloat = i => i.toString().includes('.') ? i : i + '.'
    this.noiseSize = 128

    this.postProcess.renderPass = new RenderPass(this.scene, this.camera.currentCamera)

    this.renderTarget = new THREE.WebGLRenderTarget(
        store.width,
        store.height,
        {
            generateMipmaps: false,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            encoding: THREE.sRGBEncoding,
            samples: 1
        }
    )
    this.resources.items.noise.wrapS = 1000
    this.resources.items.noise.wrapT = 1000
    this.processingShader = {
      uniforms: {
        ...uniforms,
        tDiffuse: {value: null},
        opacity: {value: 1.0},
        noise: {value: this.resources.items.noise},
        grunge: {value: this.resources.items.grunge},
        dpi: { value: 1 },
        ditherOffset: { value: [ 0, 0 ] },
        blur: {value: this.resources.items.blur}
      },

      defines: {
        NOISE_SIZE: ensureFloat(this.noiseSize),
      },

      uniformsNeedUpdate: true,

      vertexShader: vs,
      fragmentShader: fs
    }

    this.postProcessingPass = new ShaderPass(this.processingShader)
    this.postProcess.composer = new EffectComposer(this.instance, this.renderTarget)

    this.postProcess.composer.renderToScreen = true

    this.postProcess.composer.setSize(store.width, store.height)
    this.postProcess.composer.setPixelRatio(this.config.pixelRatio)

    this.postProcess.composer.addPass(this.postProcess.renderPass)
    this.postProcess.composer.addPass(this.postProcessingPass)

    this.noises.dither = {
			maxFrames: 1,
			frame: 0,
      value: this.postProcess.composer.passes[1].uniforms.ditherOffset.value
    }
  }


  setDebug() {
    const optionsFolder = this.debug.addFolder({ title: "Options" })
    optionsFolder.addInput(this.params, "width", { min: 0, max: 2000, step: 1 })
    optionsFolder.addInput(this.params, "height", { min: 0, max: 2000, step: 1 })
    optionsFolder.addInput(this.params, "rayStep", { min: 0.001, max: 5, step: 0.001 })
    optionsFolder.addInput(this.params, "intensity", { min: 0.1, max: 5, step: 0.1 })
    optionsFolder.addInput(this.params, "power", { min: 0.1, max: 5, step: 0.1 })
    optionsFolder.addInput(this.params, "depthBlur", { min: 0, max: 0.5, step: 0.01 })
    optionsFolder.addInput(this.params, "maxDepthDifference", {
      min: 0,
      max: 8,
      step: 0.01
    })
    optionsFolder.addInput(this.params, "maxDepth", {
      min: 0.99,
      max: 1,
      step: 0.00001
    })
    optionsFolder.addInput(this.params, "roughnessFadeOut", {
      min: 0,
      max: 1,
      step: 0.01
    })
    optionsFolder.addInput(this.params, "rayFadeOut", {
      min: 0,
      max: 5,
      step: 0.01
    })
    optionsFolder.addInput(this.params, "thickness", {
      min: 0,
      max: 10,
      step: 0.01
    })
    
    optionsFolder.addInput(this.params, "ior", {
      min: 1,
      max: 2.33333,
      step: 0.01
    })

    const blurFolder = this.debug.addFolder({ title: "Blur" })
    blurFolder.addInput(this.params, "useBlur").on("change", () => {
      if (this.params.useBlur) {
        this.SSRPass.fullscreenMaterial.defines.USE_BLUR = ""
        this.SSRPass.reflectionsPass.fullscreenMaterial.defines.USE_BLUR = ""
      } else {
        delete this.SSRPass.fullscreenMaterial.defines.USE_BLUR
        delete this.SSRPass.reflectionsPass.fullscreenMaterial.defines.USE_BLUR
      }
    
      this.SSRPass.fullscreenMaterial.needsUpdate = true
    })
    // blurFolder.addInput(this.params, "blurKernelSize", { min: 0, max: 5, step: 1 })
    blurFolder.addInput(this.params, "blurWidth", { min: 0, max: 2000, step: 1 })
    blurFolder.addInput(this.params, "blurHeight", { min: 0, max: 2000, step: 1 })

    const definesFolder = this.debug.addFolder({ title: "Steps", expanded: false })

    definesFolder
      .addInput(this.params, "MAX_STEPS", { min: 1, max: 256, step: 1 })
      .on("change", () => {
        this.SSRPass.reflectionsPass.fullscreenMaterial.defines.MAX_STEPS = parseInt(
          this.params.MAX_STEPS
        )
        this.SSRPass.reflectionsPass.fullscreenMaterial.needsUpdate = true
      })
    
    definesFolder
      .addInput(this.params, "NUM_BINARY_SEARCH_STEPS", { min: 0, max: 16, step: 1 })
      .on("change", () => {
        this.SSRPass.reflectionsPass.fullscreenMaterial.defines.NUM_BINARY_SEARCH_STEPS =
          parseInt(this.params.NUM_BINARY_SEARCH_STEPS)
          this.SSRPass.reflectionsPass.fullscreenMaterial.needsUpdate = true
      })
  }

  update() {
    if(this.usePostProcess && store.assetsLoaded) {
      this.postProcess.composer.render()
      this.updateNoise(this.noises.dither)
    } else {
      this.instance.render(this.scene, this.camera.currentCamera)
    }
  }

  resize() {
    
    // Instance
    this.instance.setSize(store.width, store.height)
    this.instance.setPixelRatio(this.config.pixelRatio)

    
    // Post Process
    if (this.postProcess) {
      this.postProcess.composer.setSize(store.width, store.height)
      this.postProcess.composer.setPixelRatio(this.config.pixelRatio) 
    }
  }

  updateNoise(noise) {
		noise.frame += 1;
		if (noise.frame < noise.maxFrames) return;
		noise.frame = 0;
		noise.value[ 0 ] = prng.randomInt(-this.noiseSize * 0.5, this.noiseSize * 0.5);
		noise.value[ 1 ] = prng.randomInt(-this.noiseSize * 0.5, this.noiseSize * 0.5);
	}

  destroy() {
    this.instance.renderLists.dispose()
    this.instance.dispose()
  }
}