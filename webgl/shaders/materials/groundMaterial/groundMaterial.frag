#define STANDARD


uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;


varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <lightmap_pars_fragment>
#include <bsdfs>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <shadowmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform float mirror;
uniform float mixStrength;
uniform sampler2D tDiffuse;
uniform sampler2D ambient;
varying vec4 vCoord;
varying vec3 vToEye;


void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

  vec4 normalColor = texture2D(normalMap, vUv * normalScale);
  vec3 reflectNormal = normalize(vec3(normalColor.r * 2.0 - 1.0, normalColor.b, normalColor.g * 2.0 - 1.0));
  vec3 reflectCoord = vCoord.xyz / vCoord.w;
  vec2 reflectUv = reflectCoord.xy + reflectCoord.z * reflectNormal.xz * 0.05;
  vec4 reflectColor = texture2D(tDiffuse, reflectUv);


  // Fresnel term
  vec3 toEye = normalize(vToEye);
  float theta = max(dot(toEye, normal), 0.0);
  float reflectance = pow((1.0 - theta), 5.0);
  reflectColor = mix(vec4(0), reflectColor, reflectance);
  diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + reflectColor.rgb * mixStrength);
  totalEmissiveRadiance += reflectColor.rgb * metalnessFactor;

  // AMBIENT


	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	// modulation

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;


	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <dithering_fragment>
}