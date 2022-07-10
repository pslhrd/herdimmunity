uniform float opacity;
uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform vec4 res;
uniform float dpi;
uniform sampler2D noise;
uniform vec2 ditherOffset;

int sampleCount = 5;
float blur = 0.25; 
float falloff = 3.0;

vec3 blendSoftLight(vec3 base, vec3 blend) {
	return mix(
		sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend),
		2.0 * base * blend + base * base * (1.0 - 2.0 * blend),
		step(base, vec3(0.5))
	);
}

float rand(vec2 uv, float t) {
    return fract(sin(dot(uv, vec2(1225.6548, 321.8942))) * 4251.4865 + t);
}

void main() {
  
  vec4 diffuse = texture2D(tDiffuse, vUv);
  vec3 color = texture2D(tDiffuse, vUv).rgb;

  // CHROMA

  // vec2 destCoord = gl_FragCoord.xy / res.xy;
  // vec2 direction = normalize(destCoord - 0.5);
  // vec2 velocity = direction * blur * pow(length(destCoord - 0.5), falloff);
  // float inverseSampleCount = 1.0 / float(sampleCount);

  // mat3x2 increments = mat3x2(velocity * 1.0 * inverseSampleCount,
  //                             velocity * 2.0 * inverseSampleCount,
  //                             velocity * 4.0 * inverseSampleCount);

  // vec3 accumulator = vec3(0);
  // mat3x2 offsets = mat3x2(0); 
  
  // for (int i = 0; i < sampleCount; i++) {
  //     accumulator.r += texture(diffuse, destCoord + offsets[0]).r; 
  //     accumulator.g += texture(diffuse, destCoord + offsets[1]).g; 
  //     accumulator.b += texture(diffuse, destCoord + offsets[2]).b; 
      
  //     offsets -= increments;
  // }

  
  // VIGNETTE

	float radius = length( vUv * 2. - 1. );
	diffuse = mix(diffuse, diffuse * 2., smoothstep(1.5 - 1. * 0.8, 1.8, radius));

  // GRAIN

  // vec2 pxCoords = vUv * res.xy / dpi;
  // vec3 dither = texture2D(noise, (pxCoords + ditherOffset) / 124. * dpi).rgb;
  // vec3 ditheredDiffuse = blendSoftLight(diffuse, dither);
  // diffuse = mix(diffuse, ditheredDiffuse, 0.85);

  gl_FragColor = diffuse;
  gl_FragColor.a *= opacity;
}