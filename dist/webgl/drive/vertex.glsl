#version 300 es

layout(location = 0) in vec4 position;
layout(location = 1) in vec3 normal;
uniform mat4 mv;
uniform mat4 p;
out vec3 vnormal;
out float height;
out vec3 pos;
void main() {
    
    gl_Position = p * mv * position;
    pos = position.xyz;
    vnormal =  normal;
    height = position[1];
}