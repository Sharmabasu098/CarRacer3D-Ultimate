import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { player } from "./player.js";

export const trafficCars = [];

export let trafficSpeed = 0.10;

const loader = new GLTFLoader();

const trafficModels = [
    "./assets/models/police.glb",
    "./assets/models/sedan.glb",
    "./assets/models/sedan-sports.glb",
    "./assets/models/suv.glb",
    "./assets/models/taxi.glb",
    "./assets/models/truck.glb",
    "./assets/models/van.glb"
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

                car.scale.set(2, 2, 2);

                car.position.x =
                    lanes[
                        Math.floor(Math.random() * lanes.length)
                    ];

                car.position.y = 0;
                car.position.z = -20 - (i * 18);

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
