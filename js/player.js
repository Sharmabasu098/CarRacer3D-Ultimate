import * as THREE from â€œthreeâ€; import { GLTFLoader } from
â€œthree/addons/loaders/GLTFLoader.jsâ€;

export let player; export let nitroFlame;

const lanes = [-2.5, 0, 2.5]; let currentLane = 1; let targetTilt = 0;

export function createPlayer(scene) { const loader = new GLTFLoader();
loader.load(â€œ./assets/models/race.glbâ€,(gltf)=>{ player=gltf.scene;
player.scale.set(0.7,0.7,0.7); player.position.set(0,0,4);
player.rotation.y=Math.PI;

    nitroFlame=new THREE.Group();

    const mat=new THREE.MeshBasicMaterial({
      color:0x33ccff,
      transparent:true,
      opacity:0.9
    });

    const left=new THREE.Mesh(new THREE.ConeGeometry(0.06,0.30,10),mat.clone());
    left.rotation.x=Math.PI;
    left.position.set(-0.12,0.15,1.0);
    nitroFlame.add(left);

    const right=new THREE.Mesh(new THREE.ConeGeometry(0.06,0.30,10),mat.clone());
    right.rotation.x=Math.PI;
    right.position.set(0.12,0.15,1.0);
    nitroFlame.add(right);

    nitroFlame.visible=false;
    player.add(nitroFlame);

    scene.add(player);

},undefined,(e)=>console.error(e)); }

export function moveLane(direction){ currentLane+=direction;
if(currentLane<0)currentLane=0; if(currentLane>2)currentLane=2;
if(direction<0)targetTilt=0.25; else if(direction>0)targetTilt=-0.25; }

export function updatePlayer(){ if(!player)return;
player.position.x+=(lanes[currentLane]-player.position.x)0.20;
player.rotation.z+=(targetTilt-player.rotation.z)0.15; targetTilt*=0.90;
                              }
