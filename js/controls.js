import { moveLane } from "./player.js";

export function setupControls() {

    window.addEventListener("touchstart", (e) => {

        if (e.touches[0].clientX < window.innerWidth / 2) {

            moveLane(-1);

        } else {

            moveLane(1);

        }

    });

}
