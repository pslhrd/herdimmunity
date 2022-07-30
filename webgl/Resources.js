import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Assets } from '~/webgl/assets'
import { store } from '~~/store'

export class Resources {
  constructor(_assets) {

    this.items = {}  
    this.groups = {}
    this.assets = Assets
    this.toLoad = 0
    this.loaded = 0

    this.setLoaders()
    this.load()
  }

  setLoaders() {
    this.loaders = []

    // Images
    this.loaders.push({
      extensions: ['jpg', 'png'],
      action: (_resource) =>
      {
        const image = new Image()

        image.addEventListener('load', () => {
            this.fileLoadEnd(_resource, image)
        })

        image.addEventListener('error', () => {
            this.fileLoadEnd(_resource, image)
        })

        image.src = _resource.source
      }
    })

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })

    // GLTF
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    this.loaders.push({
        extensions: ['glb', 'gltf'],
        action: (_resource) =>
        {
            gltfLoader.load(_resource.source, (_data) =>
            {
                this.fileLoadEnd(_resource, _data)
            })
        }
    })
  }

  load() {
    for (const asset of this.assets) {
      this.toLoad++
      store.toLoad++
      const extensionMatch = asset.source.match(/\.([a-z]+)$/)

      if(typeof extensionMatch[1] !== 'undefined') {
        const extension = extensionMatch[1]
        const loader = this.loaders.find((_loader) => _loader.extensions.find((_extension) => _extension === extension))

        if (loader) {
            loader.action(asset)
        }
        else
        {
          console.warn(`Cannot found loader for ${asset}`)
        }
      }

      else {
          console.warn(`Cannot found extension of ${asset}`)
      }
    }
  }

  fileLoadEnd(_resource, _data) {
    this.loaded++
    store.loaded++
    let data = _data

    if(_resource.type === 'texture') {
      if(!(data instanceof THREE.Texture)) {
        data = new THREE.Texture(_data)
      }
      data.needsUpdate = true
      data.flipY = false
    }

    this.items[_resource.name] = data

    if(this.loaded === this.toLoad)
    {
      this.ended(_resource, _data)
    }
  }

  ended(_resource, _data) {
    store.assetsLoaded = true
  }
}