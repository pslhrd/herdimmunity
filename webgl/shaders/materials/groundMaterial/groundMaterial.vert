varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>


uniform mat4 textureMatrix;
varying vec4 vCoord;
varying vec3 vToEye;


void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <project_vertex>

  vCoord = textureMatrix * vec4( position, 1.0 ); 
  vToEye = cameraPosition - (modelMatrix * vec4(transformed, 1.0)).xyz;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

  vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}