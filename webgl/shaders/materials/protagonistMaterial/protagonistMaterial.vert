#include <fog_pars_vertex>

varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vViewDirection;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
  #include <begin_vertex>
  #include <project_vertex>
  #include <fog_vertex>

	vUv = uv;
  vPosition = position;
  vNormal = normal;
  
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  vWorldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
  vViewDirection = normalize(cameraPosition - worldPosition.xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}