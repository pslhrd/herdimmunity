in vec2 vUv;
in vec4 vCoord;
in vec3 vNormal;
in vec3 vToEye;

uniform sampler2D tReflect;
uniform vec3 uColor;
uniform float uReflectivity;
uniform float uMirror;
uniform float uMixStrength;

uniform sampler2D diffuseTex;
uniform sampler2D normalMap;
uniform vec2 normalScale;

varying vec2 vUv2;

void main(){
  vec4 color = vec4(0, 0, 0, 1);
  
  // vec3 normal = vNormal;
  // vec4 reflectColor = texture2D(tReflect, vUv);

  // vec3 toEye = normalize(vToEye);
  // float theta = max(dot(toEye, normal), 0.0);
  // float reflectance = uReflectivity + (1.0 - uReflectivity) * pow((1.0 - theta), 5.0);
  // reflectColor = mix(vec4(0), reflectColor, reflectance);

  gl_FragColor = color.rgb;
  gl_FragColor.a = 1.;
}