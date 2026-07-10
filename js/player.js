import * as THREE from "three";
import { resetControls } from "./controls.js";

export let player;

const lanes = [-2.5, 0, 2.5];
let currentLane = 1;

export function createPlayer(scene) {

    player = new THREE.Mesh(

        new THREE.BoxGeometry(1.5, 1, 3),

        new THREE.MeshLambertMaterial({
            color: 0xff0000
        })

    );

    player.position.set(0, 0.5, 4);

    scene.add(player);

}

export function moveLane(direction) {

    currentLane += direction;

    if (currentLane < 0) currentLane = 0;
    if (currentLane > 2) currentLane = 2;

}

export function updatePlayer() {

    player.position.x +=
        (lanes[currentLane] - player.position.x) * 0.20;

}
