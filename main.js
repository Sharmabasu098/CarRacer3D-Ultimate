import { scene, camera, renderer } from "./js/scene.js";

import {
    createRoad,
    updateRoad
} from "./js/road.js";

import {
    createPlayer,
    updatePlayer,
    player,
    nitroFlame
} from "./js/player.js";

import {
    setupControls,
    moveLeft,
    moveRight
} from "./js/controls.js";

import {
    createTraffic,
    updateTraffic
} from "./js/traffic.js";

import * as THREE from "three";

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1));

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(10, 20, 10);
scene.add(sun);

// imports...

// create world...
createRoad(scene);
createPlayer(scene);
createTraffic(scene);
setupControls();

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    startScreen.style.display = "none";

    animate();

});

function animate() {

    requestAnimationFrame(animate);

    updateRoad();
    updatePlayer(moveLeft, moveRight);
    updateTraffic();

    if (player) {
        camera.position.x = player.position.x;
        camera.lookAt(player.position.x, 0, -20);
    }

    renderer.render(scene, camera);
}
