#include <common>
#include <fog_pars_fragment>

varying vec2 vUv;
uniform float time;
uniform sampler2D matcap;
uniform sampler2D roughness;
varying vec3 vWorldNormal;
varying vec3 vViewDirection;
varying vec3 vPosition;
varying vec3 vWorldPosition;


// NOISE FUNCTION
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
	return mix(
		sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend),
		2.0 * base * blend + base * base * (1.0 - 2.0 * blend),
		step(base, vec3(0.5))
	);
}

vec3 blendScreen(vec3 base, vec3 blend) {
  return  1.0 - ((1.0 - base) * (1.0 - blend));
}

void main() {

  // DIFFUSE
  vec3 diffuse = vec3(0.973,0.914,0.416);

  // MATCAP
  highp vec2 muv = vec2(viewMatrix * vec4(normalize(vWorldNormal), 0))*0.5+vec2(0.5,0.5);
  vec3 matcapTexture = texture2D(matcap, vec2(muv.x, 1.0-muv.y)).rgb;

  // NOISE ANIMATIONS
  float n = noise(vPosition * 1. + (time / 10.));
  vec3 colorA = vec3(0.455,0.455,0.455);
  vec3 colorB = vec3(0.855,0.847,0.824);
  vec3 sum = mix(colorA, colorB, n);

  diffuse = sum;

  // RIM LIGHT
	vec3 rimColor = vec3(0.75); // vec3(0.9, 1., 0.4);
	float rimLightPower = 1.6;
	float rimLightStrength = .19;
	float rightLight = rimLightPower * abs( dot( vWorldNormal, normalize( vViewDirection ) ) );
	rightLight = 1. - smoothstep(.0, 1., rightLight );

	// diffuse.rgb += vec3( rightLight * rimLightStrength ) * rimColor;

  // ROUGHNESS
  vec3 roughnessTexture = texture2D(roughness, vUv).rgb;
  // diffuse = blendSoftLight(diffuse, (roughnessTexture * 0.15));

  // GROUND FOG
  vec3 groundFog = vec3(0., 0., 0.);
  // diffuse = mix(groundFog, diffuse.rgb, (vWorldPosition.y * 0.9));

  gl_FragColor = vec4(diffuse, 1.);

  // #include <fog_fragment>

}