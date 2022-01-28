import './style.css'
import './WebGL.js'
// https://www.youtube.com/watch?v=Q7AOvWpIVHU
// use npm run dev
// Three.js Docs https://threejs.org/
// WebGL Overview https://youtu.be/f-9LEoYYvE4
// images from:
//http://planetpixelemporium.com/earth8081.html
//https://www.solarsystemscope.com/textures/
import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
//import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(20);

renderer.render(scene, camera);



// const planet_geometry = new THREE.SphereGeometry(3, 32, 16);
// const planet_material = new THREE.MeshStandardMaterial({color: 0x3D91F7 })
// const planet = new THREE.Mesh(planet_geometry, planet_material);
// scene.add(planet);

const earthTexture = new THREE.TextureLoader().load('picture.jpg')
//const earthNormal = new THREE.TextureLoader().load('bw.jpg')
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(6,32,316),
  new THREE.MeshStandardMaterial({map: earthTexture
  })
);
planet.castShadow = true;

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1,10,20),
  new THREE.MeshStandardMaterial({map: moonTexture})
);
moon.position.setZ(12);
moon.position.setY(2);
moon.receiveShadow = true;
scene.add(planet, moon);



// const invisObj = new THREE.SphereGeometry();
// const invisMat = new THREE.MeshStandardMaterial();
// const invis = new THREE.Mesh(invisObj, invisMat);
// scene.add(invis);
// invis.visible = false;


// const geometry = new THREE.TorusGeometry(10,3,16,100);
// const material = new THREE.MeshStandardMaterial ({color: 0xFF6347});
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus)

//Creates a light that points in a specific direction
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,10,20)
pointLight.castShadow = true;

pointLight.shadow.mapSize.width = 512
pointLight.shadow.mapSize.height = 512
pointLight.shadow.camera.near = 0.5
pointLight.shadow.camera.far = 500

//Creating the sun:
const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(40,100,100),
  new THREE.MeshBasicMaterial({map: sunTexture})
);
sun.position.set(200,100,200);
scene.add(sun)


//creating a new shape:
// const geometry1 = new THREE.BoxGeometry(5,5,5);
// const material1 = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh(geometry1, material1);
// scene.add(cube);

//creating a line
// const material_for_line = new THREE.LineBasicMaterial( {color: 0x0000ff});
// const points = [];
// points.push(new THREE.Vector3(0,10,10));
// points.push(new THREE.Vector3(0,-10,10));
// const geometry2 = new THREE.BufferGeometry().setFromPoints(points);
// const line = new THREE.Line(geometry2, material_for_line);
// scene.add(line);
// const straight = new THREE.Vector3(0,0,10);
// const up = new THREE.Vector3(0,10,0);
// const axis = new THREE.Vector3();
// axis.addVectors(straight, up)



//Creates a light that lights up an entier room
//const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight)

//reveals position of point light
// const lightHelper = new THREE.PointLightHelper(pointLight);
// //displays a 2d grid on the screen
// const gridHelper = new THREE.GridHelper(200,50)
// scene.add(lightHelper, gridHelper)

//OrbitControls had to be imported
//This allows me to orbit around the scene by drag-clicking
const controls = new OrbitControls(camera, renderer.domElement);

//This functions randomly populates the 3d space with spherical stars
function addStar() {
    const star_geometry = new THREE.SphereGeometry(0.35)
    const star_material = new THREE.MeshBasicMaterial({color: 0xffffff})
    const star = new THREE.Mesh( star_geometry, star_material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));

    star.position.set(x,y,z);
      
   
    scene.add(star);
  
    
}

//Number of stars
Array(400).fill().forEach(addStar)


//This variable manages what image is the background for the website


// const backgroundthing = new THREE.TextureLoader().load('spaceBG.webp');
// scene.background = backgroundthing;

//Texturemap test
// const meTexture = new THREE.TextureLoader().load('iCard.jpg')
// const me = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial({map: meTexture})
// );
// scene.add(me);


//scroll animation
const log = document.getElementById('log');
let lastScrollTop = window.scrollY;
window.onscroll = logScroll;

let angleCamera = Math.PI / 2
let radiusCamera = 20

function logScroll() {
  let curScroll = window.scrollY;
  if (lastScrollTop > curScroll) {
    log.textContent = "scrolling up";
    moveCameraUp();
    
  } else if (lastScrollTop < curScroll) {
    log.textContent = "scrolling down";
    moveCameraDown();
    
  } else {
    log.textContent = "not scrolling"
 
  }
  lastScrollTop = curScroll
}
function moveCameraUp() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.x = radiusCamera * Math.cos( angleCamera );
  camera.position.z = radiusCamera * Math.sin( angleCamera );
  angleCamera -= 0.005
}

let yaw = 3;
function moveCameraDown() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.x = radiusCamera * Math.cos( angleCamera );
  camera.position.z = radiusCamera * Math.sin( angleCamera );
  angleCamera += 0.005

}

//This function needs to be last
//This function controls how stuff is animated automatically on the
//page



let angleMoon = 0
let radiusMoon = 12

let aboveHorizon = 2
let lowering = true

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  //planet.rotation.y += 0.002
  controls.update();
  camera.position.x = radiusCamera * Math.cos( angleCamera );
  camera.position.z = radiusCamera * Math.sin( angleCamera );
  angleCamera += 0.00075

  planet.rotation.y += 0.001
  moon.rotation.y += 0.005
  sun.rotation.y += 0.0005
  
  moon.position.x = radiusMoon * Math.cos( angleMoon );
  moon.position.z = radiusMoon * Math.sin( angleMoon );
  angleMoon -= 0.0001 * Math.PI * 6
  
  if (lowering) {
    moon.position.y -= 0.0001 * 2 * 12
    aboveHorizon -= 0.0001 * 2 * 12
    if (aboveHorizon <= -2) {
      lowering = false
    }
  } else {
    moon.position.y += 0.0001 * 2 * 12
    aboveHorizon += 0.0001 * 2 * 12
    if (aboveHorizon >= 2) {
      lowering = true
    }
  }

  renderer.render(scene, camera);
}

animate();
// if ( WEBGL.isWebGLAvailable() ) {

// 	// Initiate function or other initializations here
// 	animate();

// } else {

// 	const warning = WEBGL.getWebGLErrorMessage();
// 	document.getElementById( 'container' ).appendChild( warning );

// }



