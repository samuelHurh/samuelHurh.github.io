#version 300 es
precision highp float;
uniform vec3 lightdir;
uniform vec3 halfway;
uniform float max_height;
uniform float min_height;
out vec4 fragColor;
in vec3 vnormal;
in float height;

in vec2 vTexCoord;

uniform sampler2D aTextureIPlanToUse; 

void main() {

    vec3 n = normalize(vnormal);
    float blinn = pow(max(dot(n,halfway),0.0), 50.0);
    float lambert = max(dot(n, lightdir), 0.0);
    fragColor = vec4(texture(aTextureIPlanToUse, vTexCoord)[0] * lambert,
        texture(aTextureIPlanToUse, vTexCoord)[1] * lambert,
        texture(aTextureIPlanToUse, vTexCoord)[2] * lambert,
         1);
}