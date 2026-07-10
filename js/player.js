import * as THREE from "three";

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

export function updatePlayer(moveLeft, moveRight) {

    const speed = 0.15;

    if (moveLeft && player.position.x > -2.8) {

        player.position.x -= speed;

    }

    if (moveRight && player.position.x < 2.8) {

        player.position.x += speed;

    }

}
