import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export let nitroFlame;

export let player;

const lanes = [-2.5, 0, 2.5];
let currentLane = 1;
let targetTilt = 0;

export function createPlayer(scene) {
    
const flameGeo = new THREE.ConeGeometry(0.12, 0.45, 12);

const flameMat = new THREE.MeshBasicMaterial({
    color: 0x00ccff
});

nitroFlame = new THREE.Mesh(flameGeo, flameMat);

nitroFlame.rotation.x = Math.PI;

nitroFlame.position.set(0, 0.18, 0.85);

nitroFlame.visible = false;

player.add(nitroFlame);

    const loader = new GLTFLoader();

    loader.load(

        "./assets/models/race.glb",

        (gltf) => {

            player = gltf.scene;

            player.scale.set(0.7, 0.7, 0.7);
            player.position.set(0, 0, 4);
            player.rotation.y = Math.PI;

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

    player.position.x +=
        (lanes[currentLane] - player.position.x) * 0.20;

    player.rotation.z +=
        (targetTilt - player.rotation.z) * 0.15;

    targetTilt *= 0.90;

}
