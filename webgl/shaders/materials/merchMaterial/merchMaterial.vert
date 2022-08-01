#define PHONG

varying vec3 vViewPosition;
varying vec2 noiseUv;

#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <shadowmap_pars_vertex>

attribute vec2 uv2;

void main() {
	#include <uv_vertex>

	#include <beginnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <project_vertex>

  noiseUv = uv2;

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}
