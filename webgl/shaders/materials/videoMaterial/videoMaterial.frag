#define PHONG

#include <common>
#include <fog_pars_fragment>

uniform sampler2D diffuseTex;
uniform sampler2D noiseMap;

varying vec2 noiseUv;
varying vec2 vUv;

uniform float time;
uniform float uAlpha;


void main() {

  vec3 t = texture2D(diffuseTex, vUv).rgb;
  vec4 diffuseColor = vec4( t, 1.);


	// Rim (Fake GI?)
	// float rimLightPower = 1.6;
	// float rimLightStrength = .69;
	// vec3 rimColor = vec3(1.);
	// float rightLight = rimLightPower * abs( dot( vNormal, normalize( vViewPosition ) ) );
	// rightLight = 1. - smoothstep(.0, 1., rightLight );

	// diffuseColor.rgb += vec3( rightLight * rimLightStrength ) * rimColor;

  highp vec2 nUv = noiseUv;
  vec3 tNoise = texture2D(noiseMap, vUv).rrr;
  float tValue =  1. - uAlpha;
  vec3 erosion = smoothstep(tValue - 0.2, tValue, tNoise);
  vec3 border = smoothstep(0., .1, erosion) - smoothstep(.1, 1., erosion);
  vec3 leadcol = vec3(1.);
  vec3 fire = mix(leadcol, leadcol, smoothstep(0.8, 1., border)) * 5.;

  t += fire * border;

  // TRANSITION
  vec2 dpUV = (vUv) * 0.14; // 0.22
  dpUV.x += step(1., mod(dpUV.y, 2.)) * 0.5;
  dpUV = mod(dpUV, 1.);
  float tValue2 = erosion.x;
  float dpLimit = smoothstep(0., 1., 1. - tValue2 );
  float dpMask = smoothstep(dpLimit, dpLimit, length(dpUV - vec2(0.1)));
  if (dpMask < 1.) { discard; }

  if (uAlpha <= 0.3) {discard;}

  gl_FragColor = vec4(t, 1.);

  #include <fog_fragment>

}