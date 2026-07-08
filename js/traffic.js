import * as THREE from "three";

export const trafficCars = [];

export function createTraffic(scene) {

    for (let i = 0; i < 5; i++) {

        const car = new THREE.Mesh(

            new THREE.BoxGeometry(1.5, 1, 3),

            new THREE.MeshLambertMaterial({

                color: Math.random() * 0xffffff

            })

        );

        const lanes = [-2.5, 0, 2.5];

        car.position.x =
            lanes[
                Math.floor(
                    Math.random() * lanes.length
                )
            ];

        car.position.y = 0.5;
        car.position.z = -20 - (i * 15);

        scene.add(car);

        trafficCars.push(car);

    }

}

export function updateTraffic() {

    trafficCars.forEach(car => {

        car.position.z += 0.30;

        if (car.position.z > 12) {

            const lanes = [-2.5, 0, 2.5];

            car.position.x =
                lanes[
                    Math.floor(
                        Math.random() * lanes.length
                    )
                ];

            car.position.z = -80;

        }

    });

}
