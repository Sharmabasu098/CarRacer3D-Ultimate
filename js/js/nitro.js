export let nitro = 100;
export let nitroActive = false;

const nitroBar =
    document.getElementById("nitroBar");

const nitroBtn =
    document.getElementById("nitroBtn");

nitroBtn.addEventListener("touchstart", () => {

    if (nitro > 20) {

        nitroActive = true;

    }

});

nitroBtn.addEventListener("touchend", () => {

    nitroActive = false;

});

export function updateNitro() {

    if (nitroActive) {

        nitro -= 0.6;

        if (nitro <= 0) {

            nitro = 0;
            nitroActive = false;

        }

    } else {

        nitro += 0.25;

        if (nitro > 100) nitro = 100;

    }

    nitroBar.style.width = nitro + "%";

}
