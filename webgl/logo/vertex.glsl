#version 300 es

layout(location=0) in vec4 position;
layout(location=1) in vec4 color;

uniform mat4 matrix;

uniform float seconds;



out vec4 vColor;

mat2 rotate(float angle) {
    return mat2(
        cos(angle), -sin(angle), sin(angle), cos(angle)
    );
}


void main() {
    vColor = color;
    gl_Position = vec4(
        position.xy* (abs(cos(seconds * 1.0)) + 0.2) * rotate(sin(seconds) * 5.0),
        position.zw
    );

}