export let moveLeft = false;
export let moveRight = false;

export function setupControls() {

    window.addEventListener("touchstart", (e) => {

        if (e.touches[0].clientX < window.innerWidth / 2) {

            moveLeft = true;

        } else {

            moveRight = true;

        }

    });

    window.addEventListener("touchend", () => {

        moveLeft = false;
        moveRight = false;

    });

}
