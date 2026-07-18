import * as THREE from "three";

export let laneLines = [];
export let trees = [];

export function createRoad(scene) {

    // Ground
    const ground = new THREE.Mesh(

        new THREE.PlaneGeometry(200, 200),

        new THREE.MeshLambertMaterial({
            color: 0x3fa34d
        })

    );

    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Road
    const road = new THREE.Mesh(

        new THREE.PlaneGeometry(8, 200),

        new THREE.MeshLambertMaterial({
            color: 0x333333
        })

    );

    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.01;

    scene.add(road);

    // Road Edge Lines
const edgeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00
});

const leftEdge = new THREE.Mesh(
    new THREE.PlaneGeometry(0.15, 200),
    edgeMaterial
);

leftEdge.rotation.x = -Math.PI / 2;
leftEdge.position.set(-4, 0.03, 0);
scene.add(leftEdge);

const rightEdge = new THREE.Mesh(
    new THREE.PlaneGeometry(0.15, 200),
    edgeMaterial
);

rightEdge.rotation.x = -Math.PI / 2;
rightEdge.position.set(4, 0.03, 0);
scene.add(rightEdge);

    // Lane Lines
    const laneMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

    laneLines = [];

    for (let i = 0; i < 40; i++) {

        const line = new THREE.Mesh(

            new THREE.PlaneGeometry(0.2, 2),

            laneMaterial

        );

        line.rotation.x = -Math.PI / 2;

        line.position.set(
            0,
            0.02,
            -i * 5
        );

        scene.add(line);

        laneLines.push(line);

    }

    // Trees
    for (let i = 0; i < 25; i++) {

        createTree(scene, -8, -i * 10);
        createTree(scene, 8, -i * 10);

    }

}

export function updateRoad() {

    laneLines.forEach(line => {

        line.position.z += 0.5;

        if (line.position.z > 10) {

            line.position.z = -190;

        }

    });

    trees.forEach(tree => {

        tree.position.z += 0.5;

        if (tree.position.z > 10) {

            tree.position.z = -190;

        }

    });

}

function createTree(scene, x, z) {

    const trunk = new THREE.Mesh(

        new THREE.CylinderGeometry(0.15, 0.2, 1),

        new THREE.MeshLambertMaterial({
            color: 0x8b4513
        })

    );

    trunk.position.set(x, 0.5, z);

    scene.add(trunk);

    const leaves = new THREE.Mesh(

        new THREE.SphereGeometry(0.7, 10, 10),

        new THREE.MeshLambertMaterial({
            color: 0x228B22
        })

    );

    leaves.position.set(x, 1.4, z);

    scene.add(leaves);

    trees.push(trunk);
    trees.push(leaves);

}
