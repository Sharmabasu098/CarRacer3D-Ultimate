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

                new THREE.ConeGeometry(0.06, 0.30, 10),

                flameMaterial.clone()

            );

            leftFlame.rotation.x = -Math.PI / 2;
            leftFlame.position.set(-0.35, 0.45, -1.20);

            nitroFlame.add(leftFlame);

            // Right Flame
            const rightFlame = new THREE.Mesh(

                new THREE.ConeGeometry(0.06, 0.30, 10),

                flameMaterial.clone()

            );

            rightFlame.rotation.x = -Math.PI / 2;
            rightFlame.position.set(0.35, 0.45, -1.20);

            nitroFlame.add(rightFlame);

            // Center Glow
            const glow = new THREE.Mesh(

                new THREE.SphereGeometry(0.08, 12, 12),

                new THREE.MeshBasicMaterial({

                    color: 0x66ddff,
                    transparent: true,
                    opacity: 0.8

                })

            );

            glow.position.set(0, 0.45, -1.10);

            nitroFlame.add(glow);

            nitroFlame.visible = true;

            player.add(nitroFlame);

            // =========================

            const box = new THREE.BoxHelper(player, 0xff0000);
scene.add(box);

const axes = new THREE.AxesHelper(2);
player.add(axes);

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
