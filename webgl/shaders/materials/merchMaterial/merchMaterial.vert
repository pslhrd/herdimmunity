#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <shadowmap_pars_vertex>


void main() {
	#include <uv_vertex>

	#include <beginnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <project_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}
