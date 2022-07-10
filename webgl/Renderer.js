import * as THREE from 'three'
import { App } from '~/webgl/index'
import { store } from '~/store'
import { watch } from 'vue'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
// import * as POSTPROCESSING from 'postprocessing'
// import { SSRPass } from '~/webgl/utils/SSR'


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

    this.usePostProcess = false
    this.setInstance()
    
    watch(() => store.assetsLoaded, () => {
      this.setPostProcess()
      if(this.debug) {
        // this.setDebug()
      }
    })
  }

  setInstance() {
    this.clearColor = '#1D1D1D'

    // Renderer
    this.instance = new THREE.WebGLRenderer({
        alpha: false,
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

  oldPostProc() {
    this.postProcess = {}

    this.postProcess.renderPass = new POSTPROCESSING.RenderPass(this.scene, this.camera.currentCamera)

    this.params = {
      enabled: true,
      floorRoughness: 1,
      floorNormalScale: 1,
      antialias: false,
    
      width: store.width,
      height: store.height,
      useBlur: false,
      blurWidth: 935,
      blurHeight: 304,
      rayStep: 0.534,
      intensity: 1,
      power: 1,
      depthBlur: 0.11,
      enableJittering: false,
      jitter: 0.17,
      jitterSpread: 0.59,
      jitterRough: 0.8,
      roughnessFadeOut: 1,
      maxDepth: 1,
      thickness: 3.5,
      ior: 1.45,
      rayFadeOut: 0,
      MAX_STEPS: 50,
      NUM_BINARY_SEARCH_STEPS: 7,
      maxDepthDifference: 3,
      stretchMissedRays: false,
      useMRT: true,
      useNormalMap: true,
      useRoughnessMap: true,

      blurKernelSize: 3,
    }

    // this.postProcess.composer = new POSTPROCESSING.EffectComposer(this.instance)
    this.postProcess.composer.setSize(store.width, store.height)
    // this.postProcess.composer.setPixelRatio(this.config.pixelRatio)
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

    // this.postProcessingPass = new ShaderPass(this.processingShader)
    // this.postProcessingPass.renderToScreen = true
    // this.postProcess.composer.addPass(this.postProcessingPass)

    // this.SSRPass = new SSRPass(this.scene, this.camera.currentCamera, this.params)
    this.postProcess.composer.addPass(this.SSRPass)
  }

  setPostProcess() {
    this.postProcess = {}

    /**
     * Render pass
     */
    this.postProcess.renderPass = new RenderPass(this.scene, this.camera.currentCamera)

    /**
     * Effect composer
     */
    this.renderTarget = new THREE.WebGLRenderTarget(
        store.width,
        store.height,
        {
            generateMipmaps: false,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            encoding: THREE.sRGBEncoding,
            samples: 2
        }
    )
    this.postProcess.composer = new EffectComposer(this.instance, this.renderTarget)
    this.postProcess.composer.setSize(store.width, store.height)
    this.postProcess.composer.setPixelRatio(this.config.pixelRatio)

    this.postProcess.composer.addPass(this.postProcess.renderPass)
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
    if(this.usePostProcess & store.assetsLoaded) {
      this.postProcess.composer.render()
      // this.postProcess.composer.render()

      // if(this.SSRPass) {
      //   this.SSRPass.setSize(this.params.width, this.params.height)
      //   for (const key of Object.keys(this.params)) {
      //     if (key in this.SSRPass.reflectionUniforms) {
      //       this.SSRPass.reflectionUniforms[key].value = this.params[key]
      //     }
      //   }
      // }
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