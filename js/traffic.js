import * as THREE from â€œthreeâ€; import { GLTFLoader } from
â€œthree/addons/loaders/GLTFLoader.jsâ€; import { player } from
â€œ./player.jsâ€;

export const trafficCars = []; export let trafficSpeed = 0.10;

const loader = new GLTFLoader();

const lanes = [-2.5,0,2.5];

function pickRandomModel(){

    const r = Math.random();

    if(r < 0.50) return "./assets/models/sedan.glb";
    if(r < 0.80) return "./assets/models/sedan-sports.glb";

    return "./assets/models/suv.glb";

}

function randomCarColor(car){

    const colors=[
        0xffffff,
        0x111111,
        0xc0c0c0,
        0xff0000,
        0x0066ff,
        0xffff00,
        0x228b22
    ];

    const color = colors[Math.floor(Math.random()*colors.length)];

    car.traverse(child=>{

        if(child.isMesh){

            child.material = child.material.clone();
            child.material.color.setHex(color);
            child.material.roughness = 0.35;
            child.material.metalness = 0.6;

        }

    });

}

export function createTraffic(scene){

    for(let i=0;i<5;i++){

        const model = pickRandomModel();

        loader.load(model,(gltf)=>{

            const car = gltf.scene;

            randomCarColor(car);

            if(model.includes("suv")) car.scale.set(1.2,1.2,1.2);
            else if(model.includes("sedan-sports")) car.scale.set(1.0,1.0,1.0);
            else car.scale.set(1.1,1.1,1.1);

            car.position.x = lanes[Math.floor(Math.random()*3)];
            car.position.y = 0.25;
            car.position.z = -40-(i*25);
            car.rotation.y = Math.PI;

            car.userData.speed = 0.08 + Math.random()*0.08;

            scene.add(car);
            trafficCars.push(car);

        });

    }

}

export function updateTraffic(extraSpeed=0){

    trafficCars.forEach(car=>{

        car.position.z += trafficSpeed + car.userData.speed + extraSpeed;

        for(const other of trafficCars){

            if(car===other) continue;

            if(Math.abs(car.position.x-other.position.x)<0.1 &&
               other.position.z>car.position.z &&
               other.position.z-car.position.z<5){

                const free = lanes.find(l=>
                    !trafficCars.some(c=>
                        c!==car &&
                        Math.abs(c.position.x-l)<0.1 &&
                        Math.abs(c.position.z-car.position.z)<6
                    )
                );

                if(free!==undefined){
                    car.position.x = free;
                }

            }

        }

        if(car.position.z>12){

            car.position.z=-120-Math.random()*40;
            car.position.x=lanes[Math.floor(Math.random()*3)];
            car.userData.speed=0.08+Math.random()*0.08;
            randomCarColor(car);

        }

    });

}

export function checkCollision(){

    if(!player) return false;

    for(const car of trafficCars){

        if(
            Math.abs(car.position.x-player.position.x)<0.8 &&
            Math.abs(car.position.z-player.position.z)<1.2
        ){
            return true;
        }

    }

    return false;

}

export function increaseTrafficSpeed(){

    if(trafficSpeed<0.8){
        trafficSpeed+=0.02;
    }

}
