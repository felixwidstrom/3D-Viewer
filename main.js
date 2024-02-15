import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, object;
let boundary = new THREE.Box3(), size = new THREE.Vector3(0,0,0), distance;

Initialize();
setTimeout(() => { Animate(); }, 500);

function Initialize() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.margin = "0";
    renderer.domElement.style.padding = "0";
    document.querySelector("main").appendChild(renderer.domElement);

    let dirlight = new THREE.DirectionalLight(0xF1DAA4, 1, 100);
    dirlight.castShadow = true;
    scene.add(dirlight);

    let amblight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(amblight);    

    window.addEventListener('resize', onWindowResize);  
    
    LoadOBJ("models/template.obj");
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function LoadOBJ(path) {
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

function Animate() {
	requestAnimationFrame(Animate);
	renderer.render(scene, camera);
}

document.querySelector("#import").oninput = () => {
    let file = document.querySelector("#import").files[0];
    let reader = new FileReader();

    reader.addEventListener("load", () => {
        LoadOBJ(reader.result);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

let inputs = document.querySelectorAll("input");
inputs[1].onchange = () => {
    object.position.x = inputs[1].value;
}
inputs[2].onchange = () => {
    object.position.y = inputs[2].value - size.y/2;
}
inputs[3].onchange = () => {
    object.position.z = inputs[3].value;
}
inputs[4].onchange = () => {
    object.rotation.x = (inputs[4].value)*Math.PI/180;
}
inputs[5].onchange = () => {
    object.rotation.y = (inputs[5].value)*Math.PI/180;
}
inputs[6].onchange = () => {
    object.rotation.z = (inputs[6].value)*Math.PI/180;
}
inputs[7].onchange = () => {
    object.scale.x = inputs[7].value;
}
inputs[8].onchange = () => {
    object.scale.y = inputs[8].value;
}
inputs[9].onchange = () => {
    object.scale.z = inputs[9].value;
}
inputs[10].onchange = () => {
    camera.fov = inputs[10].value;
    camera.updateProjectionMatrix();
}
inputs[11].onchange = () => {
    camera.far = inputs[11].value;
    camera.updateProjectionMatrix();
}
inputs[12].onchange = () => {
    camera.position.z = inputs[12].value + distance;
}
inputs[13].onclick = () => {
    boundary.setFromObject(object);
    size.subVectors(boundary.max, boundary.min);
    distance = (Math.max(size.x, size.y, size.z)*2)/Math.tan((45*Math.PI)/180);
    camera.position.z = distance;
}
inputs[14].onclick = () => {
    inputs[1].value = 0;
    object.position.x = 0;
    inputs[2].value = 0;
    object.position.y = -size.y/2;
    inputs[3].value = 0;
    object.position.z = 0;
    inputs[4].value = 0;
    object.rotation.x = 0;
    inputs[5].value = 0;
    object.rotation.y = 0;
    inputs[6].value = 0;
    object.rotation.z = 0;
    inputs[7].value = 1;
    object.scale.x = 1;
    inputs[8].value = 1;
    object.scale.y = 1;
    inputs[9].value = 1;
    object.scale.z = 1;
    inputs[10].value = 45;
    camera.fov = 45;
    inputs[11].value = 1000;
    camera.far = 1000;
    camera.position.z = distance;
    camera.updateProjectionMatrix();
}