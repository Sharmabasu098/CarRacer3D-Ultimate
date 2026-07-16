import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export let player;

const lanes = [-2.5, 0, 2.5];
let currentLane = 1;

export function createPlayer(scene) {

    const loader = new GLTFLoader();

    loader.load(

        "./assets/models/race.glb",

        (gltf) => {

            player = gltf.scene;

            player.scale.set(1, 1, 1);
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

}

export function updatePlayer() {

    if (!player) return;

    player.position.x +=
        (lanes[currentLane] - player.position.x) * 0.20;

}
