import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js';
//import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/MTLLoader.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';

let scene, camera, controls, renderer, object;

Initialize();
setTimeout(() => { Animate(); }, 500);

function Initialize() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.x = 100;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.margin = "0";
    renderer.domElement.style.padding = "0";
    document.querySelector("main").appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI/2;
    controls.maxPolarAngle = Math.PI/2;
    controls.update();

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
    while (scene.children.length > 2) {
        scene.remove(scene.children[scene.children.length-1]);
    }

    let loader = new OBJLoader();
    loader.load(
        path, 
        (obj) => { 
            obj.scale.set(1, 1, 1);
            object = obj; 
            scene.add(obj);
        }, 
        (xhr) => {},
        (err) => { console.error("Could not load " + path); }
    );
}

/*function LoadOBJMTL(path, url) {
    var mtlLoader = new MTLLoader();
    mtlLoader.load("models/" + url, function( materials ) {
        materials.preload();
        let loader = new OBJLoader();
        loader.setMaterials(materials);
        loader.load(
            "models/" + path, 
            (obj) => { 
                object = obj; 
                scene.add(obj);
            }, 
            (xhr) => {},
            (err) => { console.error("Could not load " + path); }
        );
    });
}*/

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
inputs[0].onchange = () => {
    object.position.x = inputs[0].value;
}
inputs[1].onchange = () => {
    object.position.y = inputs[1].value;
}
inputs[2].onchange = () => {
    object.position.z = inputs[2].value;
}
inputs[3].onchange = () => {
    object.rotation.x = (inputs[3].value)*Math.PI/180;
}
inputs[4].onchange = () => {
    object.rotation.y = (inputs[4].value)*Math.PI/180;
}
inputs[5].onchange = () => {
    object.rotation.z = (inputs[5].value)*Math.PI/180;
}
inputs[6].onchange = () => {
    object.scale.x = inputs[6].value;
}
inputs[7].onchange = () => {
    object.scale.y = inputs[7].value;
}
inputs[8].onchange = () => {
    object.scale.z = inputs[8].value;
}
inputs[9].onchange = () => {
    camera.fov = inputs[9].value;
    camera.updateProjectionMatrix();
}
inputs[10].onchange = () => {
    camera.far = inputs[10].value;
}
inputs[11].onchange = () => {
    camera.position.x = inputs[11].value;
}