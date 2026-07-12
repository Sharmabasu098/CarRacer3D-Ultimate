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

// Start Screen
let gameStarted = false;

const startScreen =
    document.getElementById("startScreen");

const startBtn =
    document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    gameStarted = true;

    startScreen.style.display = "none";

});

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

const countdown =
    document.getElementById("countdown");

startBtn.addEventListener("click", () => {

    startBtn.style.display = "none";

    let count = 3;

    countdown.textContent = count;

    const timer = setInterval(() => {

        count--;

        if (count > 0) {

            countdown.textContent = count;

        } else if (count === 0) {

            countdown.textContent = "GO!";

        } else {

            clearInterval(timer);

            startScreen.style.display = "none";

            gameStarted = true;

        }

    }, 1000);

});

// Animation
function animate() {

    requestAnimationFrame(animate);
    if (!gameStarted) {

    renderer.render(scene, camera);

    return;

    }

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
