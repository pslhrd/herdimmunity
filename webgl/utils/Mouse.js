import { Vector2 } from 'three';
import { uniforms } from '~/webgl/shaders/uniforms'
import { store } from '~/store'
import { App } from '~/webgl/index'

const tVec2a = new Vector2();
const tVec2b = new Vector2();
const tVec2c = new Vector2();
const tVec2d = new Vector2();


export class Mouse {
  constructor() {
		document.addEventListener(
			'mousemove',
			this.getMousesPositions.bind(this),
		);

		this.initMouses();
  }

	initMouses() {
		// Mouse's positions in the DOM
		this.dom = tVec2a;

		// Mouse's positions for fragment shader (x: [0, 1], y:[0, 1])
		this.frag = tVec2b;

		// Mouse's positions in the scene (x: [-1, 1], y:[-1, 1])
		this.scene = tVec2c;
	}

	getMousesPositions(e) {
		this.dom.set(e.clientX, e.clientY);

    store.mouseY = e.clientY - (store.height / 2)
    store.mouseX = e.clientX - (store.width / 2)

		this.frag.set(
			this.dom.x / window.innerWidth,
			this.dom.y / window.innerHeight,
		);

		this.scene.set(
			(this.dom.x / window.innerWidth) * 2 - 1,
			-(this.dom.y / window.innerHeight) * 2 + 1,
		);
	}
	destroy() {
		document.removeEventListener(
			'mousemove',
			this.getMousesPositions.bind(this),
		);
	}
}

