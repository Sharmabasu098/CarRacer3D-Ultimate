import * as THREE from "three";

import { scene, camera, renderer } from "./scene.js";
import { createRoad, updateRoad } from "./road.js";
import { createPlayer, updatePlayer, player } from "./player.js";
import { setupControls } from "./controls.js";
import {
    createTraffic,
    updateTraffic,
    checkCollision,
    increaseTrafficSpeed
} from "./traffic.js";

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

// Score
let gameOver = false;
let score = 0;
let lastSpeedLevel = 0;

const scoreElement =
    document.getElementById("score");

const gameOverElement =
    document.getElementById("gameOver");

const restartBtn =
    document.getElementById("restartBtn");

restartBtn.addEventListener("click", () => {

    location.reload();

});

// Animation
function animate() {

    requestAnimationFrame(animate);

    if (gameOver) {

        renderer.render(scene, camera);
        return;

    }

    updateRoad();

    updatePlayer();

    updateTraffic();

    score += 0.05;

    scoreElement.textContent =
        "Score: " + Math.floor(score);

    const level = Math.floor(score / 100);

    if (level > lastSpeedLevel) {

        lastSpeedLevel = level;
        increaseTrafficSpeed();

    }

    if (checkCollision()) {

        gameOver = true;
        gameOverElement.style.display = "block";
        return;

    }

    if (player) {

        camera.position.x = player.position.x;
        camera.lookAt(player.position.x, 0, -20);

    }

    renderer.render(scene, camera);

}

animate();
