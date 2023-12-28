//Run auto-updating server with "npx vite"
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    // camera.position.z += 0.01;
    //Upon load, forward is negative z
    if (keysBeingPressed["d"]) {
        camera.position.x += 0.01
    }
    if (keysBeingPressed["a"]) {
        camera.position.x -= 0.01
    }
    if (keysBeingPressed["w"]) {
        camera.position.z -= 0.01
    }
    if (keysBeingPressed["s"]) {
        camera.position.z += 0.01
    }
    if (keysBeingPressed['ArrowUp']) {
        camera.rotation.x += 0.01;
    }
    if (keysBeingPressed['ArrowDown']) {
        camera.rotation.x -= 0.01;
    }
    if (keysBeingPressed['ArrowLeft']) {
        camera.rotation.y += 0.01;
    }
    if (keysBeingPressed['ArrowRight']) {
        camera.rotation.y -= 0.01;
    }

	renderer.render( scene, camera );
}

window.keysBeingPressed = {}
window.addEventListener('keydown', event => keysBeingPressed[event.key] = true)
window.addEventListener('keyup', event => keysBeingPressed[event.key] = false)

animate();