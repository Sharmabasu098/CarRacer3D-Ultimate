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

export function createTraffic(scene) {

    for (let i = 0; i < 5; i++) {

        const randomModel =
            trafficModels[
                Math.floor(Math.random() * trafficModels.length)
            ];

        loader.load(

            randomModel,
            
 (gltf) => {

     const car = gltf.scene;

     switch (randomModel) {

        case "./assets/models/truck.glb":
            car.scale.set(0.9, 0.9, 0.9);
            break;

        case "./assets/models/van.glb":
            car.scale.set(1.0, 1.0, 1.0);
            break;

        case "./assets/models/suv.glb":
            car.scale.set(1.2, 1.2, 1.2);
            break;

        case "./assets/models/taxi.glb":
            car.scale.set(1.2, 1.2, 1.2);
            break;

        case "./assets/models/sedan.glb":
            car.scale.set(1.1, 1.1, 1.1);
            break;

        case "./assets/models/sedan-sports.glb":
            car.scale.set(1.0, 1.0, 1.0);
            break;

        case "./assets/models/police.glb":
            car.scale.set(1.1, 1.1, 1.1);
            break;

    }

    car.position.x =
        lanes[
            Math.floor(Math.random() * lanes.length)
        ];

    car.position.y = 0.25;
    car.rotation.y = Math.PI;
    car.position.z = -40 - (i * 25);

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

        car.position.z += trafficSpeed;

        if (car.position.z > 12) {

            car.position.z = -120;

            car.position.x =
                lanes[
                    Math.floor(Math.random() * lanes.length)
                ];

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

