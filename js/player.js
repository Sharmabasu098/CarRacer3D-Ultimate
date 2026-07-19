import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export let player;
export let nitroFlame;

const lanes = [-2.5, 0, 2.5];
let currentLane = 1;
let targetTilt = 0;

export function createPlayer(scene) {

    const loader = new GLTFLoader();

    loader.load(

        "./assets/models/race.glb",

        (gltf) => {

            player = gltf.scene;

            player.scale.set(0.7, 0.7, 0.7);
            player.position.set(0, 0, 4);
            player.rotation.y = Math.PI; 
            
// =========================
// Nitro Glow
// =========================

const glowGeometry = new THREE.SphereGeometry(0.12, 16, 16);

const glowMaterial = new THREE.MeshBasicMaterial({

    color: 0x33ccff,
    transparent: true,
    opacity: 0.85

});

nitroFlame = new THREE.Mesh(
    glowGeometry,
    glowMaterial
);

nitroFlame.position.set(0, 0.18, 1.0);

nitroFlame.visible = false;

player.add(nitroFlame);

// =========================

            scene.add(player);

        },

        undefined,

        (error) => {

            console.error("Model Load Error:", error);

        }

    );

}

export function moveLane(direction) {

    currentLane += direction;

    if (currentLane < 0) currentLane = 0;
    if (currentLane > 2) currentLane = 2;

    if (direction < 0) {

        targetTilt = 0.25;

    } else if (direction > 0) {

        targetTilt = -0.25;

    }

}

export function updatePlayer() {

    if (!player) return;

    // Smooth lane movement
    player.position.x +=
        (lanes[currentLane] - player.position.x) * 0.20;

    // Smooth tilt
    player.rotation.z +=
        (targetTilt - player.rotation.z) * 0.15;

    targetTilt *= 0.90;

}
