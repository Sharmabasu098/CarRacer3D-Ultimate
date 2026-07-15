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

        console.log("Car Loaded Successfully");

        player = gltf.scene;

        player.scale.set(3, 3, 3);
        player.position.set(0, 0, 4);
        player.rotation.y = Math.PI;

        scene.add(player);

    },

    undefined,

    (error) => {

        console.error(error);

    }
);
