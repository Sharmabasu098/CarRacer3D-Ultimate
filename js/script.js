import * as THREE from "three";

import { scene, camera, renderer } from "./scene.js";
import { createRoad, updateRoad } from "./road.js";
import { createPlayer, updatePlayer, player } from "./player.js";
import { setupControls, moveLeft, moveRight } from "./controls.js";
import { createTraffic, updateTraffic } from "./traffic.js";

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(10, 20, 10);
scene.add(sun);

// Create Game
createRoad(scene);
createPlayer(scene);
createTraffic(scene);
setupControls();

// Animation
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

animate();
