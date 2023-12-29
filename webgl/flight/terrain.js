var _gridsize = 0
var _faults = 0
var _numVertices = 0
var _numSquares = 0
var _weathering = 0

var _max_height = 0
var _min_height = 0

var currentlyRendering = false;

var _theta = 0.005


//Flight relevant global variables:
var _eye = [0,0,0]
var _global_up = [0,1,0]
var _center = [0,0,0]

var _forward = [0,0,-1]
var _right = [1,0,0]
var _camera_up = [0,1,0]

var R = new Float32Array([_right[0], _camera_up[0], -_forward[0], 0, 
    _right[1],_camera_up[1],-_forward[1],0, 
    _right[2], _camera_up[2], -_forward[2], 0,
    0,0,0,1])



function makeGeom() {
    g = {"triangles":
        []
    ,"attributes":
        [ // position
            []
            //We will have a normals attribute here
        ]
    }

    //Let the gridspace only between -1 and 1 on the x and z axes
    //When placing verts, divide 2 by num verts and place accordingly
    increment = 2 / _gridsize
    for (var i = 0; i <_gridsize; i++) {
        for (var j = 0; j <_gridsize;j++) {
            g.attributes[0].push([i * increment - 1, 0, j*increment - 1])
        }
    }
    
    //Now we move on to faulting:
    max_height = 0
    min_height = 0
    for (var i = 0; i < _faults; i++) {
        randPointIdx = Math.floor(Math.random() * (g.attributes[0].length - 0 + 1))
        randPoint = g.attributes[0][randPointIdx]
        randAngle = Math.random() * (2*Math.PI - 0 + 1)
        randNormal = [Math.cos(randAngle), 0, Math.sin(randAngle)]
        for (var j = 0; j < g.attributes[0].length; j++) {
            if (dot(sub(g.attributes[0][j], randPoint), randNormal) >= 0) {
                //console.log("isgreater")
                g.attributes[0][j][1] += 0.1
            } else {
                //console.log("islesser")
                g.attributes[0][j][1] -= 0.1
                
            }
            if (g.attributes[0][j][1] > max_height) {
                max_height = g.attributes[0][j][1]
            }
            if (g.attributes[0][j][1] < min_height) {
                min_height = g.attributes[0][j][1]
            }
        }
    }
    //normalization
    c = 1
    for (var i = 0; i < g.attributes[0].length; i++) {
        curr_height = g.attributes[0][i][1]
        new_height = (c * curr_height - (0.5 *(max_height - min_height))) / (max_height - min_height)
        g.attributes[0][i][1] = new_height
    }
    //Range finding for color height map
    _max_height = g.attributes[0][0][1]
    _min_height = g.attributes[0][0][1]
    
    for (var i = 0; i < g.attributes[0].length; i++) {
        if (g.attributes[0][i][1] < _min_height) {
            _min_height = g.attributes[0][i][1]
        }
        if (g.attributes[0][i][1] > _max_height) {
            _max_height = g.attributes[0][i][1]
        }
    }
    if (_min_height == _max_height) {
        console.log("uh oh")
    }
    

    //console.log(g.attributes[0].length)
    //Every square has 2 triangles
    for (var i = 0; i < g.attributes[0].length - _gridsize; i++) {
        if (i % _gridsize != _gridsize - 1) {
            g.triangles.push([i,i+1,i+_gridsize])
            g.triangles.push([i+1,i+_gridsize + 1,i+_gridsize])
        }
        
        
    }
    return g
}


/** Draw one frame */
function draw(seconds) {
    gl.clearColor(...IlliniBlue) // f(...[1,2,3]) means f(1,2,3)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)

    gl.bindVertexArray(geom.vao)

    gl.uniform4fv(program.uniforms.color, IlliniOrange)
    let ld = normalize([1,1,1])
    let h = normalize(add(ld, normalize([1,1,1])))
    gl.uniform3fv(program.uniforms.lightdir, ld)
    gl.uniform3fv(program.uniforms.halfway, h)
    gl.uniform1f(program.uniforms.min_height, _min_height)
    gl.uniform1f(program.uniforms.max_height, _max_height)
    let m = IdentityMatrix
    
    // let R = new Float32Array([_right[0], _right[1], _right[2], 0, 
    //         _camera_up[0],_camera_up[1],_camera_up[2],0, 
    //         -_forward[0], -_forward[1], -_forward[2], 0,
    //         0,0,0,1])
    // //console.log(R)
    //_right = cross(_forward, _global_up)
    //_camera_up = cross(_right, _forward)
    //R = m4fixAxes(_forward, _global_up)
    _right = normalize(cross(_forward, _global_up))
    _camera_up = normalize(cross(_right, _forward))
    R = new Float32Array([_right[0], _camera_up[0], -_forward[0], 0, 
        _right[1],_camera_up[1],-_forward[1],0, 
        _right[2], _camera_up[2], -_forward[2], 0,
        0,0,0,1])
    let T = m4trans(-_eye[0],-_eye[1],-_eye[2])
    let v = m4mul(R,T)
    //let v = m4mul(R,m4view([1,1,3], [0,0,0], [0,1,0]))
    //console.log(v)
    //A camera has 3 degrees of freedom: 3d location
    //It also has 3 aspects of orientation 2 of which we want to use as we want to keep the camera right side up
    //Keep track of eye location and forward direction (2 3d vectors)
    
    //Taking global up and camera's right direction in a normalized cross product, 
    //We can get camera up from cross product of camera right and camera up

    //Rotate left or right by rotating camera forward about global up
    //Rotate up or down by rotating camera forward about camera right

    //Translate camera by adding to eye vector

    //Figure out camera forward vector.
    //Need to update forward vector
    //Changing center and eye vectors and subtracting them gives the forward vector.
    //I'm not properly upating one of the vectors.


    gl.uniformMatrix4fv(program.uniforms.mv, false, m4mul(v,m))
    gl.uniformMatrix4fv(program.uniforms.p, false, p)

    gl.drawElements(geom.mode, geom.count, geom.type, 0)
}

/** Compute any time-varying or animated aspects of the scene */
function tick(milliseconds) {
    if (currentlyRendering) {
        let seconds = milliseconds / 1000;

        draw(seconds)

        requestAnimationFrame(tick)
    }
    c = Math.cos(_theta)
    s = Math.sin(_theta)
    neg_c = Math.cos(-_theta)
    neg_s = Math.sin(-_theta)
    // sum_right = Math.sqrt(R[0]*R[0] + R[1]*R[1] + R[2]*R[2])
    // n_r0 = R[0] / sum_right
    // n_r1 = R[1] / sum_right
    // n_r2 = R[2] / sum_right
    if (keysBeingPressed['ArrowUp']) {
        //We use the right matrix here:
        let right = normalize(cross(_forward,_global_up))
        let n_r0 = right[0]
        let n_r1 = right[1]
        let n_r2 = right[2]
        //console.log(right)
        
        let rot = new Float32Array([(n_r0*n_r0)*(1-c) + c, (n_r0*n_r1)*(1-c) - n_r2*s, (n_r0*n_r2)*(1-c) + n_r2*s,
            (n_r0*n_r1) * (1-c) + n_r2*s, (n_r1*n_r1)*(1-c) + c, (n_r1*n_r2)*(1-c) - n_r0*s,
            (n_r0*n_r2)*(1-c) - n_r1*s, (n_r1*n_r2)*(1-c) + n_r0*s, (n_r2 * n_r2)*(1-c) + c])
        //R = m4mul(R, R_mat)
        //console.log(R)
        _forward[0] = _forward[0] *rot[0] + _forward[1]*rot[1] + _forward[2] * rot[2]
        _forward[1] = _forward[0] *rot[3] + _forward[1]*rot[4] + _forward[2] * rot[5]
        _forward[2] = _forward[0] *rot[6] + _forward[1]*rot[7] + _forward[2] * rot[8]
        _forward = normalize(_forward)

        
        console.log(_forward)
        
    }
    if (keysBeingPressed['ArrowDown']) {
        let right = cross(_forward,_global_up)
        let n_r0 = right[0]
        let n_r1 = right[1]
        let n_r2 = right[2]
        let rot = new Float32Array([Math.pow(n_r0,2)*(1-neg_c) + neg_c, (n_r0*n_r1)*(1-neg_c) - n_r2*neg_s, (n_r0*n_r2)*(1-neg_c) + n_r2*neg_s,
            (n_r0*n_r1) * (1-neg_c) + n_r2*neg_s, Math.pow(n_r1,2)*(1-neg_c) + neg_c, (n_r1*n_r2)*(1-neg_c) - n_r0*neg_s,
            (n_r0*n_r2)*(1-neg_c) - n_r1*neg_s, (n_r1*n_r2)*(1-neg_c) + n_r0*neg_s, Math.pow(n_r2,2)*(1-neg_c) + neg_c])

        
        //R = m4mul(R, R_mat)
        _forward[0] = _forward[0] *rot[0] + _forward[1]*rot[1] + _forward[2] * rot[2]
        _forward[1] = _forward[0] *rot[3] + _forward[1]*rot[4] + _forward[2] * rot[5]
        _forward[2] = _forward[0] *rot[6] + _forward[1]*rot[7] + _forward[2] * rot[8]
        _forward = normalize(_forward)
        console.log(_forward)
    }
    if (keysBeingPressed['ArrowLeft'] && !keysBeingPressed['ArrowUp'] && !keysBeingPressed['ArrowDown']) {
        //R = m4mul(R, m4rotY(-_theta))
        

        
        _forward[0] = c * _forward[0] + s*_forward[2]
        _forward[1] = _forward[1]
        _forward[2] = -s*_forward[0] + c*_forward[2]
        _forward = normalize(_forward)
        // console.log(_forward)
        // _forward = normalize(_forward)
        
    }
    if (keysBeingPressed['ArrowRight'] && !keysBeingPressed['ArrowUp'] && !keysBeingPressed['ArrowDown']) {
        //R = m4mul(R, m4rotY(_theta))
        _forward[0] = Math.cos(-_theta) * _forward[0] + Math.sin(-_theta)*_forward[2]
        _forward[1] = _forward[1]
        _forward[2] = -Math.sin(-_theta)*_forward[0] + Math.cos(-_theta)*_forward[2]
        _forward = normalize(_forward)
        //_forward = normalize(_forward)
    }
    if (keysBeingPressed['w']) {
        _eye[0] += _forward[0] * 0.0025
        _eye[1] += _forward[1] * 0.0025
        _eye[2] += _forward[2] * 0.0025
        
    }
    if (keysBeingPressed['s']) {
        _eye[0] -= _forward[0] * 0.0025
        _eye[1] -= _forward[1] * 0.0025
        _eye[2] -= _forward[2] * 0.0025
    }
    if (keysBeingPressed['a']) {
        _eye[0] -= _right[0] * 0.0025
        _eye[1] -= _right[1] * 0.0025
        _eye[2] -= _right[2] * 0.0025
    }
    if (keysBeingPressed['d']) {
        _eye[0] += _right[0] * 0.0025
        _eye[1] += _right[1] * 0.0025
        _eye[2] += _right[2] * 0.0025
    }
    
}

function rotMatrix(angle) {
    return new Float32Array([Math.cos(angle), -Math.sin(angle), 0, 
                            Math.sin(angle), Math.cos(angle), 0,
                            0, 0, 1])
}

/** Resizes the canvas to completely fill the screen */
function fillScreen() {
    let canvas = document.querySelector('canvas')
    document.body.style.margin = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    canvas.style.width = ''
    canvas.style.height = ''
    if (window.gl) {
        gl.viewport(0,0, canvas.width, canvas.height)
        window.p = m4perspNegZ(0.1, 10, 1.5, canvas.width, canvas.height)
    }
}

function addNormals(geom) {
    let ni = geom.attributes.length
    geom.attributes.push([])
    for (let i = 0; i <geom.attributes[0].length; i++) {
        geom.attributes[ni].push([0,0,0])
    }
    for (let i = 0; i < geom.attributes[ni].length; i++) {
        let n = [0,0,0]
        let s = [0,0,0]
        let e = [0,0,0]
        let w = [0,0,0]
        if (i % _gridsize == 0) {
            w = geom.attributes[0][i]
        } else {
            w = geom.attributes[0][i - 1]
        }
        if (i % _gridsize == _gridsize - 1) {
            e = geom.attributes[0][i]
        } else {
            e = geom.attributes[0][i+1]
        }
        if (Math.floor(i/_gridsize) == 0) {
            n = geom.attributes[0][i]
        } else {
            n = geom.attributes[0][i - _gridsize]
        }
        if (Math.floor(i/_gridsize) == _gridsize - 1) {
            s = geom.attributes[0][i]
        } else {
            s = geom.attributes[0][i + _gridsize]
        }
        let vert = sub(n,s)
        let hor = sub(w,e)
        let normal = cross(hor,vert)
        //console.log(normal)
        geom.attributes[ni][i] = add(geom.attributes[ni][i], normal)
        // geom.attributes[ni][i] = add(geom.attributes[ni][i], normal)
        // geom.attributes[ni][i] = add(geom.attributes[ni][i], normal)

    }

    for (let i = 0; i < geom.attributes[0].length; i++) {
        geom.attributes[ni][i] = normalize(geom.attributes[ni][i])
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
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    //window.geom = setupGeomery(tetrahedron)
    //window.geom2 = setupGeomery(makeGeom())
    fillScreen()
    window.addEventListener('resize', fillScreen)

    // _eye = [0,0,1]
    // _center = [0,0,0]
    // _up = [0,1,0]

    
    currentlyRendering = true
    _gridsize = 50
    _faults = 50
    _numVertices = _gridsize * _gridsize
    _numSquares = (_gridsize - 1) * (_gridsize  - 1)
    //intermediate = addNormals(makeGeom())
    init_geom = makeGeom()
    addNormals(init_geom)
    window.geom = setupGeomery(init_geom)
    
    requestAnimationFrame(tick)
})

window.keysBeingPressed = {}
window.addEventListener('keydown', event => keysBeingPressed[event.key] = true)
window.addEventListener('keyup', event => keysBeingPressed[event.key] = false)


