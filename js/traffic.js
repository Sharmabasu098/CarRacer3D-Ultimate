import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { player } from "./player.js";

export const trafficCars = [];

export let trafficSpeed = 0.10;

const loader = new GLTFLoader();

const trafficModels = [
    "./assets/models/sedan.glb",
    "./assets/models/sedan.glb",
    "./assets/models/sedan.glb",
    "./assets/models/sedan.glb",
    "./assets/models/sedan.glb",

    "./assets/models/sedan-sports.glb",
    "./assets/models/sedan-sports.glb",
    "./assets/models/sedan-sports.glb",

    "./assets/models/suv.glb",
    "./assets/models/suv.glb"
];

const lanes = [-2.5, 0, 2.5];

function randomCarColor(car) {

    const colors = [
        0xffffff, // White
        0x111111, // Black
        0xc0c0c0, // Silver
        0xff0000, // Red
        0x0066ff, // Blue
        0xffff00, // Yellow
        0x228b22  // Green
    ];

    const color =
        colors[Math.floor(Math.random() * colors.length)];

    car.traverse((child) => {

        if (child.isMesh) {

            child.material = child.material.clone();

            child.material.color.setHex(color);

            child.material.roughness = 0.35;
            child.material.metalness = 0.6;

        }

    });

}

export function createTraffic(scene) {

    for (let i = 0; i < 10; i++) {

        const random = Math.random();

let randomModel;

if (random < 0.50) {

    randomModel = "./assets/models/sedan.glb";

} else if (random < 0.80) {

    randomModel = "./assets/models/sedan-sports.glb";

} else {

    randomModel = "./assets/models/suv.glb";

}

        loader.load(

            randomModel,
            
(gltf) => {

    const car = gltf.scene;

    randomCarColor(car);

    switch (randomModel) {

        case "./assets/models/suv.glb":
            car.scale.set(1.2, 1.2, 1.2);
            break;

        case "./assets/models/sedan.glb":
            car.scale.set(1.1, 1.1, 1.1);
            break;

        case "./assets/models/sedan-sports.glb":
            car.scale.set(1.0, 1.0, 1.0);
            break;
    
    }

    car.position.x =
        lanes[
            Math.floor(Math.random() * lanes.length)
        ];

    car.position.y = 0.25;
    car.rotation.y = Math.PI;
    car.position.z = -40 - (i * 20);
    car.userData.speed = 0.08 + Math.random() * 0.08;

    scene.add(car);

    trafficCars.push(car);

},
            
            
            undefined,

            (error) => {

                console.error("Traffic Model Error:", error);

            }

        );

    }

}

export function updateTraffic() {

    trafficCars.forEach(car => {

        // Forward movement (random speed)
        car.position.z += car.userData.speed + trafficSpeed;

        // Random lane change
        if (Math.random() < 0.002) {

            const newLane =
                lanes[
                    Math.floor(Math.random() * lanes.length)
                ];

            car.userData.targetLane = newLane;

        }

        // Smooth lane movement
        if (car.userData.targetLane !== undefined) {

            car.position.x +=
                (car.userData.targetLane - car.position.x) * 0.05;

            if (
                Math.abs(
                    car.position.x - car.userData.targetLane
                ) < 0.05
            ) {

                car.position.x = car.userData.targetLane;

                delete car.userData.targetLane;

            }

        }

        // Respawn car
        if (car.position.z > 12) {

            car.position.z = -120;

            car.position.x =
                lanes[
                    Math.floor(Math.random() * lanes.length)
                ];

            // New random speed
            car.userData.speed = 0.08 + Math.random() * 0.08;

        }

    });

}

export function checkCollision() {

    if (!player) return false;

    for (const car of trafficCars) {

        if (
            Math.abs(car.position.x - player.position.x) < 0.8 &&
            Math.abs(car.position.z - player.position.z) < 1.2
        ) {
            return true;
        }

    }

    return false;

}

export function increaseTrafficSpeed() {

    if (trafficSpeed < 0.8) {

        trafficSpeed += 0.02;

    }

}

