import { nitroFlame } from "./player.js";

export let nitroActive = false;

let nitroTime = 0;
const NITRO_DURATION = 3000;

export function activateNitro() {

    nitroActive = true;
    nitroTime = performance.now();

    if (nitroFlame) {
        nitroFlame.visible = true;
    }

}

export function updateNitro() {

    if (!nitroActive) return;

    const elapsed = performance.now() - nitroTime;

    if (nitroFlame) {
        const t = performance.now() * 0.02;

nitroFlame.children.forEach((part, index) => {

    const s =
        1 + Math.sin(t + index) * 0.15;

    part.scale.set(s, s, s);

});

    if (elapsed >= NITRO_DURATION) {

        nitroActive = false;

        if (nitroFlame) {

            nitroFlame.visible = false;
            nitroFlame.scale.set(1, 1, 1);

        }

    }

}

export function isNitroActive() {

    return nitroActive;

}
