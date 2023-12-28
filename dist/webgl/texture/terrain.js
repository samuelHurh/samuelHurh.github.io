var _gridsize = 0
var _faults = 0
var _numVertices = 0
var _numSquares = 0
var _weathering = 0

var _max_height = 0
var _min_height = 0

var currentlyRendering = false
var _text
var _color = new Float32Array([1,1,1,0.3])

var _img;

var usingTexture = false

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
    console.log(g.attributes[0][0])
    
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
    var curr_program
    // if (usingProgram1):
    // set local to program
    // else:
    // program2
    if (usingTexture) {
        console.log("non-texture")
        curr_program = program2
    } else {
        console.log("texture")
        curr_program = program
    }
    gl.clearColor(...IlliniBlue) // f(...[1,2,3]) means f(1,2,3)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(curr_program)

    gl.bindVertexArray(geom.vao)

    gl.uniform4fv(curr_program.uniforms.color, _color)
    let ld = normalize([1,1,1])
    let h = normalize(add(ld, [1,1,1]))
    gl.uniform3fv(curr_program.uniforms.lightdir, ld)
    gl.uniform3fv(curr_program.uniforms.halfway, h)
    gl.uniform1f(curr_program.uniforms.min_height, _min_height)
    gl.uniform1f(curr_program.uniforms.max_height, _max_height)
    let m = m4mul(m4rotY(seconds), m4rotY(-Math.PI/2))
    let v = m4view([1,1,3], [0,0,0], [0,1,0])
    gl.uniformMatrix4fv(curr_program.uniforms.mv, false, m4mul(v,m))
    gl.uniformMatrix4fv(curr_program.uniforms.p, false, p)

    gl.drawElements(geom.mode, geom.count, geom.type, 0)
}

/** Compute any time-varying or animated aspects of the scene */
function tick(milliseconds) {
    if (currentlyRendering) {
        let seconds = milliseconds / 1000;

        draw(seconds)

        requestAnimationFrame(tick)
    }
    
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
    let vs = await fetch('nonTextureVertex.glsl').then(res => res.text())
    let fs = await fetch('nonTextureFragment.glsl').then(res => res.text())
    window.program = compileShader(vs,fs)
    let vs2 = await fetch('textureVertex.glsl').then(res => res.text())
    let fs2 = await fetch('textureFragment.glsl').then(res => res.text())
    window.program2 = compileShader(vs2,fs2)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    //window.geom = setupGeomery(tetrahedron)
    //window.geom2 = setupGeomery(makeGeom())
    fillScreen()
    window.addEventListener('resize', fillScreen)
    //requestAnimationFrame(tick)

    //Placing this here makes it so that the page loads first
    document.querySelector('#submit').addEventListener('click', event => {
        if (currentlyRendering == false) {
            currentlyRendering = true
            requestAnimationFrame(tick)
        }

        const gridsize = Number(document.querySelector('#gridsize').value) || 2
        const faults = Number(document.querySelector('#faults').value) || 0
        const text = String(document.querySelector('#material').value) || ""
        // TO DO: generate a new gridsize-by-gridsize grid here, then apply faults to it
        //console.log(gridsize)
        //console.log(faults)
        //_text = text
        //setColor()
        //const text = String(document.querySelector('#material').value) || ""
        _text = text
        setColor()
        _gridsize = gridsize
        _faults = faults
        _numVertices = _gridsize * _gridsize
        _numSquares = (_gridsize - 1) * (_gridsize  - 1)
        //intermediate = addNormals(makeGeom())
        init_geom = makeGeom()
        addNormals(init_geom)
        window.geom = setupGeomery(init_geom)
        //addNormals(window.geom)
        //window.geom = setupGeomery(makeGeom())
        //makeGeom()
        // if (currentlyRendering) {
            
        // }
        
        //draw()
        //console.log("final")
        setColor()
    })

    document.querySelector('#material').addEventListener('change', event => {
        console.log("Change found")
        const text = String(document.querySelector('#material').value) || ""
        _text = text
        setColor()
    })

    
    requestAnimationFrame(tick)
})



function setColor() {
    if (_text == "") {
        _color = new Float32Array([1,1,1,0.3])
        console.log("empty")
        usingTexture = false
    } else if (_text.substr(0,1) == "#") {
        r = Number('0x' + _text.substr(1,2)) / 256
        g = Number('0x' + _text.substr(3,2)) / 256
        b = Number('0x' + _text.substr(5,2)) / 256
        a = Number('0x'+ _text.substr(7,2)) / 256
        usingTexture = false
        _color = new Float32Array([r,g,b,a])
    } else if (_text.slice(-4) == ".png" || _text.slice(-4) == ".jpg") {
        usingTexture = true
        _img = new Image();
        _img.crossOrigin = "anonymous"
        _img.src = _text
        _img.addEventListener('error', (event) => {
            _color = new Float32Array([1,0,1,0])
            console.log("load failed")
        })
        _img.addEventListener('load', (event) => {
            //Can call _img.width and _img.height
            let slot = 0;
            let texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0 + slot)
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                _img,
            )
            gl.generateMipmap(gl.TEXTURE_2D)
            let bindpoint = gl.getUniformLocation(program2, 'aTextureIPlanToUse')
            //gl.uniform1i(bindpoint, slot)
            gl.uniform1i(program2.uniforms.size, _gridsize)
            console.log("here")
        })
    }
    console.log("using texture " + usingTexture)
}


