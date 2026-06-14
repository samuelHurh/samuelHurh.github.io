#version 300 es
precision highp float;
uniform vec4 color;
uniform vec3 lightdir;
uniform vec3 halfway;
uniform float max_height;
uniform float min_height;
out vec4 fragColor;
in vec3 vnormal;
in float height;

void main() {

    vec3 n = normalize(vnormal);
    float blinn = pow(max(dot(n,halfway),0.0), 50.0)* color.a *3.0;
    float lambert = max(dot(n, lightdir), 0.0) * (1.0 - color.a);
    fragColor = vec4(color.rgb * lambert + vec3(1,1,1) * blinn, 1);
}