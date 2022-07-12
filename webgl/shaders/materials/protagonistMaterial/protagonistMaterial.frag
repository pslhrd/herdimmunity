#include <common>
#include <fog_pars_fragment>

varying vec2 vUv;
uniform float time;
varying vec3 vWorldNormal;
varying vec3 vViewDirection;
varying vec3 vPosition;


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

void main() {

  float n = noise(vPosition * 2. + (time / 10.));

  vec3 colorA = vec3(0.239,0.239,0.239);
  vec3 colorB = vec3(0.09,0.09,0.09);
  vec3 sum = vec3(0.0);

  sum = mix(colorA, colorB, n);

	vec3 rimColor = vec3(0.75); // vec3(0.9, 1., 0.4);
	float rimLightPower = 2.6;
	float rimLightStrength = .19;
	float rightLight = rimLightPower * abs( dot( vWorldNormal, normalize( vViewDirection ) ) );
	rightLight = 1. - smoothstep(.0, 1., rightLight );
	sum.rgb += vec3( rightLight * rimLightStrength ) * rimColor;
  
  gl_FragColor = vec4(sum, 1.0);

  #include <fog_fragment>

}