
var tetrahedron =
    {"triangles":
        [[0,1,2], 
        [0,2,3], 
        [0,3,1], 
        [1,2,3]]
    ,"attributes":
        [ // position
            [[1,1,1], 
            [-1,-1,1], 
            [-1,1,-1], 
            [1,-1,-1]]
        , // color
            [[1,1,1], 
            [0,0,1], 
            [0,1,0], 
            [1,0,0]]
        ]
    }

var octahedron = 
    {"triangles":
        [[0,1,2], 
        [0,2,3], 
        [0,3,4], 
        [0,4,1], 
        [5,1,4], 
        [5,4,3], 
        [5,3,2], 
        [5,2,1]]
    , "attributes":
    [ // position
        [[1,0,0],
        [0,1,0],
        [0,0,1],
        [0,-1,0],
        [0,0,-1],
        [-1,0,0]]
    , // color
        [[1,0.5,0.5],
        [0.5,1,0.5],
        [0.5,0.5,1],
        [0.5,0,0.5],
        [0.5,0.5,0],
        [0,0.5,0.5]]
    ]

    }


/** Draw one frame */
function draw(seconds) {
    gl.clearColor(...IlliniBlue) // f(...[1,2,3]) means f(1,2,3)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)

    gl.bindVertexArray(geom2.vao)

    gl.uniform4fv(program.uniforms.color, IlliniOrange)
    //SUN:
    let m = m4rotY(seconds * Math.PI)
    let v = m4view([1,1,5], [0,0,0], [0,1,0])
    gl.uniformMatrix4fv(program.uniforms.mv, false, m4mul(v,m))
    gl.uniformMatrix4fv(program.uniforms.p, false, p)
    
    gl.drawElements(geom2.mode, geom2.count, geom2.type, 0)
    //EARTH:
    earth_rot = m4rotY(seconds * 3)
    let m2 = m4mul(earth_rot, m4trans(2,0,0), m4scale(0.3, 0.3, 0.3), m4rotY(seconds * 10))
    gl.uniformMatrix4fv(program.uniforms.mv, false, m4mul(v,m2))
    gl.drawElements(geom2.mode, geom2.count, geom2.type, 0)
    //MARS:
    mars_rot = m4rotY((seconds * 3) / 1.9)
    let m3 = m4mul(mars_rot, m4trans(1.6 * 2,0,0), m4scale(0.25, 0.25, 0.25), m4rotY((seconds * 10) / 2.2))
    gl.uniformMatrix4fv(program.uniforms.mv, false, m4mul(v,m3))
    gl.drawElements(geom2.mode, geom2.count, geom2.type, 0)

    //MOON:
    moon_rot = m4mul(m4rotY((seconds * 3)),  m4trans(2,0,0), m4scale(0.3, 0.3, 0.3), m4rotY(seconds * 4))
    let m4 = m4mul(moon_rot, m4trans(1.5,0,0), m4scale(0.5, 0.5, 0.5))
    gl.uniformMatrix4fv(program.uniforms.mv, false, m4mul(v,m4))
    gl.drawElements(geom1.mode, geom1.count, geom1.type, 0)
    //PHOBOS:
    phobos_rot = m4mul(m4rotY((seconds * 3) / 1.9),  m4trans(1.6 * 2,0,0), m4scale(0.25, 0.25, 0.25), m4rotY(((seconds * 10) / 2.2)*5))
    let m5 = m4mul(phobos_rot, m4trans(1.5,0,0), m4scale(0.5, 0.5, 0.5))
    gl.uniformMatrix4fv(program.uniforms.mv, false, m4mul(v,m5))
    gl.drawElements(geom1.mode, geom1.count, geom1.type, 0)
    //DEIMOS:
    deimos_rot = m4mul(m4rotY((seconds * 3) / 1.9),  m4trans(1.6 * 2,0,0), m4scale(0.25, 0.25, 0.25), m4rotY(((seconds * 10) / 2.2)*1.1))
    let m6 = m4mul(deimos_rot, m4trans(3,0,0), m4scale(0.25, 0.25, 0.25))
    gl.uniformMatrix4fv(program.uniforms.mv, false, m4mul(v,m6))
    gl.drawElements(geom1.mode, geom1.count, geom1.type, 0)
}

/** Compute any time-varying or animated aspects of the scene */
function tick(milliseconds) {
    let seconds = milliseconds / 1000;

    draw(seconds)
    requestAnimationFrame(tick)
}

/** Resizes the canvas to completely fill the screen */
function fillScreen() {
    let canvas = document.querySelector('canvas')
    document.body.style.margin = '0'
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    canvas.style.width = ''
    canvas.style.height = ''
    if (window.gl) {
        gl.viewport(0,0, canvas.width, canvas.height)
        window.p = m4perspNegZ(0.1, 10, 1.5, canvas.width, canvas.height)
    }
}

/** Compile, link, set up geometry */
window.addEventListener('load', async (event) => {
    window.gl = document.querySelector('canvas').getContext('webgl2',
        // optional configuration object: see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
        {antialias: false, depth:true, preserveDrawingBuffer:true}
    )
    let vs = await fetch('vertex.glsl').then(res => res.text())
    let fs = await fetch('fragment.glsl').then(res => res.text())
    window.program = compileShader(vs,fs)
    gl.enable(gl.DEPTH_TEST)
    window.geom1 = setupGeomery(tetrahedron)
    window.geom2 = setupGeomery(octahedron)
    fillScreen()
    window.addEventListener('resize', fillScreen)
    requestAnimationFrame(tick)
})

