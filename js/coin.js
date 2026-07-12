import * as THREE from "three";
import { player } from "./player.js";

export const coins = [];
const lanes = [-2.5, 0, 2.5];

export let coinCount = 0;

export function createCoins(scene) {

    for (let i = 0; i < 8; i++) {

        const coin = new THREE.Mesh(

            new THREE.CylinderGeometry(0.4, 0.4, 0.15, 24),

            new THREE.MeshLambertMaterial({
                color: 0xffd700
            })

        );

        coin.rotation.z = Math.PI / 2;

        coin.position.set(
            lanes[Math.floor(Math.random() * 3)],
            0.7,
            -20 - (i * 20)
        );

        scene.add(coin);

        coins.push(coin);

    }

}

export function updateCoins() {

    coins.forEach(coin => {

        coin.rotation.y += 0.15;

        coin.position.z += 0.30;

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

            Math.abs(coin.position.x - player.position.x) < 1 &&
            Math.abs(coin.position.z - player.position.z) < 2

        ) {

            coinCount++;

            coin.position.z = -180;

            coin.position.x =
                lanes[Math.floor(Math.random() * 3)];

        }

    });

}
