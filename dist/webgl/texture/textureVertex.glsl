#version 300 es

layout(location = 0) in vec4 position;
layout(location = 1) in vec3 normal;
uniform mat4 mv;
uniform mat4 p;
out vec3 vnormal;
out float height;

uniform float gridsize;
out vec2 vTexCoord;
void main() {
    gl_Position = p * mv * position;
    vnormal = mat3(mv) * normal;
    height = position[1];
    vTexCoord = vec2((position[0] + 1.0) / 2.0, (position[2] + 1.0) / 2.0);
}