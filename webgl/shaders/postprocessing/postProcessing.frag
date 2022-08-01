
varying vec2 vUv;

uniform float opacity;
uniform sampler2D tDiffuse;
uniform vec4 res;
uniform float time;
uniform float pixelratio;

uniform sampler2D noise;
uniform sampler2D grunge;
uniform sampler2D blur;

uniform vec2 ditherOffset;
uniform vec4 uvOverlayOffset;

const float barrelMax = 0.05;
const int chromaNumIter = 8;
const float chromaInvNumIter= 1.0 / float(chromaNumIter);

const vec3 BLUE = vec3(0.125, 0.098, 0.455);

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

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}


float rand(vec2 uv, float t) {
    return fract(sin(dot(uv, vec2(1225.6548, 321.8942))) * 4251.4865 + t);
}
vec2 barrelDistortion(vec2 coord, float amt) {
	vec2 cc = coord - 0.5;
	float dist = dot(cc, cc);
	return coord + cc * dist * amt;
}

float sat( float t ) {
	return clamp( t, 0.0, 1.0 );
}

float remap( float t, float a, float b ) {
	return sat( (t - a) / (b - a) );
}

float linterp( float t ) {
	return sat( 1.0 - abs( 2.0*t - 1.0 ) );
}

vec4 spectrum_offset( float t ) {
	vec4 ret;
	float lo = step(t,0.5);
	float hi = 1.0-lo;
	float w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );
	ret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);
	return pow( ret, vec4(1.0/2.2) );
}


void main() {
  
	vec2 uv = vUv;
	vec2 pxCoords = vUv * res.xy / pixelratio;
  vec2 m = res.xy / pixelratio;

  // ABERRATION
	vec4 sumcol = vec4(0.0);
	vec4 sumw = vec4(0.0);
	for ( int i = 0; i < chromaNumIter; ++i ) {
		float t = float(i) * chromaInvNumIter;
		vec4 w = spectrum_offset( t );
		sumw += w;
		vec2 distortUV = barrelDistortion(vUv, barrelMax * t );
		distortUV += (t + 0.01) * 0.0001;
    // distortUV *= rotate2d( 0.001 * float(i));   
		sumcol += w * texture2D( tDiffuse, distortUV );
	}
  vec3 diffuse = (sumcol / sumw).rgb;      

  // TEXTURE
  vec3 grungeTex = texture2D(grunge, vUv).rgb;
  diffuse = blendScreen(diffuse, grungeTex * 0.4); 

  vec3 tBlur = texture2D(blur, vUv).rrr;
  vec2 uv2 = vec2(vUv.x * tBlur.r * 0.2, vUv.y * tBlur.r * 0.2);

  // VIGNETTE
	float radius = length( vUv * 2. - 1. );
	diffuse = mix(diffuse, diffuse * 0.3, smoothstep(0.8, 1.8, radius) );

	// Dithering
	float lum = clamp(luma(diffuse), 0., 1.);
	vec3 dither = texture2D(noise, (pxCoords + ditherOffset) / NOISE_SIZE * pixelratio).rgb;
	vec3 ditheredDiffuse = blendSoftLight(diffuse, dither);
	diffuse = mix(diffuse, ditheredDiffuse, 0.85);
  


  gl_FragColor = vec4(diffuse, 1.0);
}