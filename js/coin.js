import * as THREE from "three";
import { player } from "./player.js";

export const coins = [];
const lanes = [-2.5, 0, 2.5];

export let coinCount = 0;

export function createCoins(scene) {

    for (let i = 0; i < 8; i++) {

        const coin = new THREE.Mesh(

            new THREE.CylinderGeometry(0.75, 0.75, 0.18, 48),

            new THREE.MeshStandardMaterial({
                color: 0xffd700,
                metalness: 1,
                roughness: 0.15
            })

        );

        
export function updateCoins() {

    coins.forEach(coin => {

        // Rotate Coin
        coin.rotation.x += 0.15;

        // Move Coin
        coin.position.z += 0.15;

        if (coin.position.z > 12) {

            coin.position.z = -180;

            coin.position.x =
                lanes[Math.floor(Math.random() * 3)];

        }

    });

}

export function collectCoins() {

    coins.forEach(coin => {

        if (

            Math.abs(coin.position.x - player.position.x) < 2 &&
            Math.abs(coin.position.z - player.position.z) < 3

        ) {

            coinCount++;

            // Respawn Coin
            coin.position.z = -180 - Math.random() * 40;

            coin.position.x =
                lanes[Math.floor(Math.random() * 3)];

        }

    });

}
