import * as THREE from "three";

export default class Renderer {

    constructor() {

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.body.appendChild(this.renderer.domElement);

    }

    getRenderer() {

        return this.renderer;

    }

    resize() {

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }

}
