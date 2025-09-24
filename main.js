import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js';

let scene, camera, renderer, object;
let boundary = new THREE.Box3(), size = new THREE.Vector3(0,0,0), distance;

initialize();
setTimeout(() => { animate(); }, 500);

function initialize() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.margin = "0";
    renderer.domElement.style.padding = "0";
    document.querySelector("main").appendChild(renderer.domElement);

    let dirlight = new THREE.DirectionalLight(0xFFFFFF, 1, 100);
    dirlight.castShadow = true;
    scene.add(dirlight);

    let amblight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(amblight);    

    window.addEventListener('resize', onWindowResize);  

    loadOBJ("models/template.obj");
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadOBJ(path) {
    if (object != undefined) {
        scene.remove(object);
    }

    let loader = new OBJLoader();
    loader.load(
        path, 
        (obj) => { 
            object = obj;
            scene.add(obj);
            boundary.setFromObject(obj);
            size.subVectors(boundary.max, boundary.min);
            distance = (Math.max(size.x, size.y, size.z)*2)/Math.tan((45*Math.PI)/180);
            obj.position.y = -size.y/2;
            camera.position.z = distance;
        }, 
        (xhr) => {},
        (err) => { console.error("Could not load " + path); }
    );
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

document.querySelector("#import").oninput = () => {
    let file = document.querySelector("#import").files[0];
    let reader = new FileReader();

    reader.addEventListener("load", () => {
        loadOBJ(reader.result);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

const controls = {
    movement: {
        x: document.querySelector("input[name='move-x']"),
        y: document.querySelector("input[name='move-y']"),
        z: document.querySelector("input[name='move-z']")
    },
    rotation: {
        x: document.querySelector("input[name='rotate-x']"),
        y: document.querySelector("input[name='rotate-y']"),
        z: document.querySelector("input[name='rotate-z']"),
        xNumber: document.querySelector("input[name='rotate-x-number']"),
        yNumber: document.querySelector("input[name='rotate-y-number']"),
        zNumber: document.querySelector("input[name='rotate-z-number']")
    },
    scale: {
        x: document.querySelector("input[name='scale-x']"),
        y: document.querySelector("input[name='scale-y']"),
        z: document.querySelector("input[name='scale-z']")
    },
    camera: {
        fov: document.querySelector("input[name='camera-fov']"),
        cutoff: document.querySelector("input[name='camera-cutoff']"),
        position: document.querySelector("input[name='camera-position']")
    },
    reset: document.querySelector("input[name='reset']")
};

controls.reset.onclick = () => {
    controls.movement.x.value = 0;
    object.position.x = 0;
    controls.movement.y.value = 0;
    object.position.y = (-size.y)/2;
    controls.movement.z.value = 0;
    object.position.z = 0;
    controls.rotation.x.value = 0;
    controls.rotation.xNumber.value = 0;
    object.rotation.x = 0;
    controls.rotation.y.value = 0;
    controls.rotation.yNumber.value = 0;
    object.rotation.y = 0;
    controls.rotation.z.value = 0;
    controls.rotation.zNumber.value = 0;
    object.rotation.z = 0;
    controls.scale.x.value = 1;
    object.scale.x = 1;
    controls.scale.y.value = 1;
    object.scale.y = 1;
    controls.scale.z.value = 1;
    object.scale.z = 1;
    controls.camera.fov.value = 45;
    camera.fov = 45;
    controls.camera.cutoff.value = 1000;
    camera.far = 1000;
    controls.camera.position.value = 0;
    camera.position.z = distance;
    camera.updateProjectionMatrix();
}

controls.movement.x.oninput = () => {
    object.position.x = controls.movement.x.value;
}
controls.movement.y.oninput = () => {
    object.position.y = controls.movement.y.value - size.y/2;
}
controls.movement.z.oninput = () => {
    object.position.z = controls.movement.z.value;
}
controls.rotation.x.oninput = () => {
    object.rotation.x = (controls.rotation.x.value)*Math.PI/180;
    controls.rotation.xNumber.value = controls.rotation.x.value;
}
controls.rotation.xNumber.oninput = () => {
    object.rotation.x = (controls.rotation.xNumber.value)*Math.PI/180;
    controls.rotation.x.value = controls.rotation.xNumber.value;
}
controls.rotation.y.oninput = () => {
    object.rotation.y = (controls.rotation.y.value)*Math.PI/180;
    controls.rotation.yNumber.value = controls.rotation.y.value;
}
controls.rotation.yNumber.oninput = () => {
    object.rotation.y = (controls.rotation.yNumber.value)*Math.PI/180;
    controls.rotation.y.value = controls.rotation.yNumber.value;
}
controls.rotation.z.oninput = () => {
    object.rotation.z = (controls.rotation.z.value)*Math.PI/180;
    controls.rotation.zNumber.value = controls.rotation.z.value;
}
controls.rotation.zNumber.oninput = () => {
    object.rotation.z = (controls.rotation.zNumber.value)*Math.PI/180;
    controls.rotation.z.value = controls.rotation.zNumber.value;
}
controls.scale.x.oninput = () => {
    object.scale.x = controls.scale.x.value;
}
controls.scale.y.oninput = () => {
    object.scale.y = controls.scale.y.value;
}
controls.scale.z.oninput = () => {
    object.scale.z = controls.scale.z.value;
}
controls.camera.fov.oninput = () => {
    camera.fov = controls.camera.fov.value;
    camera.updateProjectionMatrix();
}
controls.camera.cutoff.oninput = () => {
    camera.far = controls.camera.cutoff.value;
    camera.updateProjectionMatrix();
}
controls.camera.position.oninput = () => {
    camera.position.z = controls.camera.position.value + distance;
}