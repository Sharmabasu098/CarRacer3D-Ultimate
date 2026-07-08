import * as THREE from "three";

export let laneLines = [];

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

    // Lane Lines
    const laneMaterial =
        new THREE.MeshBasicMaterial({
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

}

export function updateRoad() {

    laneLines.forEach(line => {

        line.position.z += 0.5;

        if (line.position.z > 10) {

            line.position.z = -190;

        }

    });

}
