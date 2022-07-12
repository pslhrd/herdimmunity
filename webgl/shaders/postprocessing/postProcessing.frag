uniform float opacity;
uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform vec4 res;
uniform float dpi;
uniform sampler2D noise;
uniform sampler2D grunge;
uniform vec2 ditherOffset;
uniform vec4 uvOverlayOffset;

#define SAMPLE_AMOUNT 7.0
int sampleCount = 5;
float blur = 0.25; 
float falloff = 3.0;

vec3 blendScreen(vec3 base, vec3 blend) {
  return  1.0 - ((1.0 - base) * (1.0 - blend));
}


float rand(vec2 uv, float t) {
    return fract(sin(dot(uv, vec2(1225.6548, 321.8942))) * 4251.4865 + t);
}

vec2 barrelDistortion( vec2 p, vec2 amt ) {
  p = 2.0 * p - 1.0;
  float maxBarrelPower = sqrt(5.0);
  float radius = dot(p,p);
  p *= pow(vec2(radius), maxBarrelPower * amt);
  return p * 0.5 + 0.5;
}

vec2 brownConradyDistortion(vec2 uv, float scalar) {
    uv = (uv - 0.5 ) * 2.0;
    
    if( true ) {
        float barrelDistortion1 = -0.02 * scalar; // K1 in text books
        float barrelDistortion2 = 0.0 * scalar; // K2 in text books

        float r2 = dot(uv,uv);
        uv *= 1.0 + barrelDistortion1 * r2 + barrelDistortion2 * r2 * r2;
    }
   return (uv / 2.0) + 0.5;
}

void main() {
  
  vec3 diffuse = texture2D(tDiffuse, vUv).rgb;

  // VIGNETTE
	// float radius = length( vUv * 2. - 1. );
	// diffuse = mix(diffuse, diffuse * 2., smoothstep(1.5 - 1. * 0.8, 1.8, radius));

  
  // TEXTURE
  vec3 grungeTex = texture2D(grunge, vUv).rgb;
  diffuse = blendScreen(diffuse, grungeTex * 0.7);       

  // ABERRATION
  // float scalar = 4.0;
  // vec4 colourScalar = vec4(700.0, 560.0, 490.0, 1.0);
  // colourScalar /= max(max(colourScalar.x, colourScalar.y), colourScalar.z);
  // colourScalar *= 1.0;
  // colourScalar *= scalar;
  // const float numTaps = 8.0;
  // for( float tap = 0.0; tap < numTaps; tap += 1.0 ) {
  //   diffuse.r += texture(tDiffuse, brownConradyDistortion(vUv, colourScalar.r)).r;
  //   diffuse.g += texture(tDiffuse, brownConradyDistortion(vUv, colourScalar.g)).g;
  //   diffuse.b += texture(tDiffuse, brownConradyDistortion(vUv, colourScalar.b)).b;
    
  //   colourScalar *= 0.99;
  // }
    

  // RADIAL BLUR
  // float strength = (distance(vUv, vec2(0.2)) * distance(vUv, vec2(0.5))) * -0.01;
  // vec2 dir = normalize(vUv - vec2(0.5, 0.5)) * strength;

  // for(float i = 0.; i < SAMPLE_AMOUNT; ++i) {
  //   diffuse += texture2D(tDiffuse, vUv + (grungeTex.rg * 0.05 + dir) *  (i / SAMPLE_AMOUNT)).rgb / SAMPLE_AMOUNT;
  // }

  // gl_FragColor /= numTaps;
  gl_FragColor = vec4(diffuse, 1.0);
  // gl_FragColor.a = 1.0;
}