#define PHONG

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <normalmap_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>

uniform sampler2D diffuseTex;
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;

uniform float uAlpha;


void main() {

  vec3 t = texture2D(diffuseTex, vUv).rgb;
  vec4 diffuseColor = vec4( t, 1.);

  #include <map_fragment>
  #include <normal_fragment_begin>

	// Rim (Fake GI?)
	float rimLightPower = 1.6;
	float rimLightStrength = .69;
	vec3 rimColor = vec3(1.);
	float rightLight = rimLightPower * abs( dot( vNormal, normalize( vViewPosition ) ) );
	rightLight = 1. - smoothstep(.0, 1., rightLight );

	diffuseColor.rgb += vec3( rightLight * rimLightStrength ) * rimColor;

  //LIGHTS
	float specularStrength = 1.0;
  vec3 totalEmissiveRadiance = emissive;
	ReflectedLight reflectedLight = ReflectedLight(vec3(.0), vec3(.0), vec3(.0), vec3(.0));
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	vec3 color =
		reflectedLight.directDiffuse +
		reflectedLight.indirectDiffuse +
		reflectedLight.directSpecular +
		reflectedLight.indirectSpecular;

  // #include <output_fragment>
  #include <normal_fragment_maps>

  if(uAlpha <=0.001) discard;
  gl_FragColor = vec4(color, uAlpha);

  // #include <fog_fragment>

}