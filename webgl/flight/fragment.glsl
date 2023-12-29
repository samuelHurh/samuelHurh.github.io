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
    float height_diff = max_height - min_height;
    float curr_diff = height - min_height;
    float hue_degree = (curr_diff / height_diff) * 360.0;
    float hp = hue_degree / 60.0;
    float C = 1.0;
    float X = C * (1.0 - abs((mod(hp, 2.0)) - 1.0));

    float R = (hp >= 5.0) ? C : (hp>=4.0) ? X : (hp>=3.0) ? 0.0 : (hp>=2.0) ? 0.0 : (hp>=1.0) ? X : C;
    float G = (hp >= 5.0) ? 0.0 : (hp>=4.0) ? 0.0 : (hp>=3.0) ? X : (hp>=2.0) ? C : (hp>=1.0) ? C : X;
    float B = (hp >= 5.0) ? X : (hp>=4.0) ? C : (hp>=3.0) ? C : (hp>=2.0) ? X : 0.0;
    vec3 n = normalize(vnormal);
    float blinn = pow(max(dot(n,halfway),0.0), 50.0);
    float lambert = max(dot(n, lightdir), 0.0);
    vec3 newRGB = vec3(R,G,B);
    fragColor = vec4(newRGB * lambert +
        vec3(1,1,1) * blinn,
        color.a);
}