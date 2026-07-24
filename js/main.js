import * as THREE from "three";

import { scene, camera, renderer } from "./js/scene.js";
import { createRoad, updateRoad } from "./js/road.js";
import { createPlayer, updatePlayer, player, nitroFlame } from "./js/player.js";
import { setupControls } from "./js/controls.js";
import { createTraffic, updateTraffic } from "./js/traffic.js";

console.log("✅ main.js Loaded");

// --------------------
// Lights
// --------------------

scene.add(new THREE.AmbientLight(0xffffff, 1));

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(10, 20, 10);
scene.add(sun);

console.log("✅ Lights Added");

// --------------------
// Create World
// --------------------

try {

    createRoad(scene);
    console.log("✅ Road Created");

    createPlayer(scene);
    console.log("✅ Player Loading");

    createTraffic(scene);
    console.log("✅ Traffic Created");

    setupControls();
    console.log("✅ Controls Ready");

} catch (err) {

    console.error("❌ World Creation Error:", err);

}

// --------------------
// Game Loop
// --------------------

function animate() {

    requestAnimationFrame(animate);

    try {

        updateRoad();

        updatePlayer();

        updateTraffic();

        if (nitroFlame) {

            nitroFlame.visible = false;

        }

        if (player) {

            camera.position.x = player.position.x;

            camera.lookAt(
                player.position.x,
                0,
                -20
            );

        }

        renderer.render(scene, camera);

    } catch (err) {

        console.error("❌ Animate Error:", err);

    }

}

console.log("✅ Starting Game Loop");

animate();
