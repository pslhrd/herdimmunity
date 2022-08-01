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
uniform sampler2D noiseMap;
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;

varying vec2 noiseUv;

uniform float time;
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

  highp vec2 nUv = noiseUv;
  vec3 tNoise = texture2D(noiseMap, nUv).rrr;
  float tValue =  1. - uAlpha;
  vec3 erosion = smoothstep(tValue - 0.2, tValue, tNoise);
  vec3 border = smoothstep(0., .1, erosion) - smoothstep(.1, 1., erosion);
  vec3 leadcol = vec3(1.);
  vec3 fire = mix(leadcol, leadcol, smoothstep(0.8, 1., border)) * 5.;

  diffuseColor.rgb += fire * border;
  // TRANSITION
  vec2 dpUV = (vUv) * 0.14; // 0.22
  dpUV.x += step(1., mod(dpUV.y, 2.)) * 0.5;
  dpUV = mod(dpUV, 1.);
  float tValue2 = erosion.x;
  float dpLimit = smoothstep(0., 1., 1. - tValue2 );
  float dpMask = smoothstep(dpLimit, dpLimit, length(dpUV - vec2(0.1)));
  if (dpMask < 1.) { discard; }

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

  gl_FragColor = vec4(color, 1.);

  // #include <fog_fragment>

}