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

            player = gltf.scene;

            // Car Size
            player.scale.set(0.8, 0.8, 0.8);

            // Car Position
            player.position.set(0, 0.1, 4);

            // Car Direction
            player.rotation.y = Math.PI;

            scene.add(player);

        },

        undefined,

        (error) => {

            console.error("Car model
