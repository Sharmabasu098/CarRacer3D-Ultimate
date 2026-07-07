import * as THREE from "three";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 6, 10);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1));

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(10, 20, 10);
scene.add(sun);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshLambertMaterial({
    color: 0x3fa34d
  })
);

ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Road
const road = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 200),
  new THREE.MeshLambertMaterial({
    color: 0x333333
  })
);

road.rotation.x = -Math.PI / 2;
road.position.y = 0.01;
scene.add(road);

// Lane Lines
const laneMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff
});

const laneLines = [];

for (let i = 0; i < 40; i++) {

  const line = new THREE.Mesh(

    new THREE.PlaneGeometry(0.2,2),

    laneMaterial

  );

  line.rotation.x = -Math.PI / 2;

  line.position.set(0,0.02,-i*5);

  scene.add(line);

  laneLines.push(line);

}

// Player Car
const player = new THREE.Mesh(
let moveLeft = false;
let moveRight = false;
const speed = 0.15;
  new THREE.BoxGeometry(1.5,1,3),

  new THREE.MeshLambertMaterial({
    color:0xff0000
  })

);

player.position.y = 0.5;
player.position.z = 4;

scene.add(player);

// Animation

function animate(){

requestAnimationFrame(animate);

// Road Animation

laneLines.forEach(line=>{

line.position.z +=0.5;

if(line.position.z>10){

line.position.z=-190;

}

});
if (moveLeft && player.position.x > -2.8) {
  player.position.x -= speed;
}

if (moveRight && player.position.x < 2.8) {
  player.position.x += speed;
                        }
renderer.render(scene,camera);

}

animate();
window.addEventListener("touchstart", (e) => {

  if (e.touches[0].clientX < window.innerWidth / 2) {
    moveLeft = true;
  } else {
    moveRight = true;
  }

});

window.addEventListener("touchend", () => {

  moveLeft = false;
  moveRight = false;

});
// Resize

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});
