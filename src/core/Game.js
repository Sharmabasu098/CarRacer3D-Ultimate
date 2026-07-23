import SceneManager from "./SceneManager.js";
import Renderer from "./Renderer.js";
import Clock from "./Clock.js";

export default class Game {

    constructor() {

        this.sceneManager = new SceneManager();
        this.renderer = new Renderer();
        this.clock = new Clock();

        this.scene = this.sceneManager.getScene();
        this.camera = this.sceneManager.getCamera();

        this.animate = this.animate.bind(this);

    }

    start() {

        this.animate();

    }

    animate() {

        requestAnimationFrame(this.animate);

        const delta = this.clock.getDelta();

        // Future Update Systems
        // Player
        // Traffic
        // Road
        // Coins
        // Camera
        // UI
        // Audio

        this.renderer.render(this.scene, this.camera);

    }

}
