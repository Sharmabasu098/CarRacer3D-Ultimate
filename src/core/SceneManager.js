import * as THREE from "three";

export default class SceneManager {

    constructor() {

        this.scene = new THREE.Scene();

        // Background Color
        this.scene.background = new THREE.Color(0x87CEEB);

        // Fog
        this.scene.fog = new THREE.Fog(0x87CEEB, 30, 120);

    }

    getScene() {

        return this.scene;

    }

}
