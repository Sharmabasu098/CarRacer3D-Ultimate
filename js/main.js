import { scene, camera, renderer } from "./js/scene.js";
console.log("1. main.js Loaded");

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

import { setupControls } from "./js/controls.js";

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

// Create World
createRoad(scene)
console.log("2. Road Created");
createPlayer(scene);
console.log("3. Player Created");
createTraffic(scene);
setupControls();

// Game Loop
function animate() {

    requestAnimationFrame(animate);

    updateRoad();

    updatePlayer();

    updateTraffic();

    // Nitro Flame
    if (nitroFlame) {
        nitroFlame.visible = false;
    }

    // Camera Follow
    if (player) {
        camera.position.x = player.position.x;

        camera.lookAt(
            player.position.x,
            0,
            -20
        );
    }

    renderer.render(scene, camera);
}

console.log("4. Starting Game Loop");

animate();
