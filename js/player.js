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

            // Player Settings
            player.scale.set(0.7, 0.7, 0.7);
            player.position.set(0, 0, 4);
            player.rotation.y = Math.PI;

            // =========================
            // Nitro Flames
            // =========================

            nitroFlame = new THREE.Group();

            const flameMaterial = new THREE.MeshBasicMaterial({

                color: 0x33ccff,
                transparent: true,
                opacity: 0.9

            });

            // Left Flame
            const leftFlame = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.35, 12),
    new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 1
    })
);

leftFlame.rotation.x = Math.PI;
leftFlame.position.set(-0.12, 0.12, 0.95);

nitroFlame.add(leftFlame);
            
            // Right Flame
            const rightFlame = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.35, 12),
    new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 1
    })
);

rightFlame.rotation.x = Math.PI;
rightFlame.position.set(0.12, 0.12, 0.95);

nitroFlame.add(rightFlame);


            // Center Glow
            const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.10, 16, 16),
    new THREE.MeshBasicMaterial({
        color: 0x66ddff,
        transparent: true,
        opacity: 0.9
    })
);

glow.position.set(0, 0.12, 0.90);

nitroFlame.add(glow);
            
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

    // Smooth Lane Movement
    player.position.x +=
        (lanes[currentLane] - player.position.x) * 0.20;

    // Smooth Tilt
    player.rotation.z +=
        (targetTilt - player.rotation.z) * 0.15;

    targetTilt *= 0.90;

}
