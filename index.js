import * as THREE from 'three';
import { Color, DoubleSide, Material } from 'three';
import {OrbitControls} from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";
// import {GLTFLoader} from "https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js";
// import { TextureLoader } from 'three';
import { AxesHelper,PlaneGeometry,MeshLambertMaterial, Mesh,WireframeGeometry,LineSegments, Vector3} from 'three';


//create a scene
const scene = new THREE.Scene();
scene.background = new Color('black');
//create a camera
//1. angle; 2. size 3. how close; 4. how far
const camera = new THREE.PerspectiveCamera(90, innerWidth/innerHeight, 0.1,1000);
camera.position.set(1,-1,10);
camera.lookAt( 0, 0, 0 );


//create a renderer
const renderer = new THREE.WebGLRenderer();

//light
const light = new THREE.AmbientLight('white',1);
scene.add(light);


renderer.setSize(0.5*innerWidth, 0.5*innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);


//axis
var axes = new AxesHelper(30);
scene.add(axes);
// camera.lookAt(mesh);
//plane geometry
var planeGeometry = new PlaneGeometry(48,48);
var planeMeterial = new MeshLambertMaterial({color:0x222222});
var plane = new Mesh(planeGeometry, planeMeterial);
plane.position.set(0,0,0);
scene.add(plane);


//mouse control
    var controls;
    controls = new OrbitControls(camera, renderer.domElement);





//window size auto-ajustment
window.addEventListener('resize',onWindowResize);
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();//暂时不清楚干嘛用
    renderer.setSize(window.innerWidth,window.innerHeight);
}

//lines

////红线x
////绿线y
////蓝线z



const geometry3 = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.

//vertex 8 in total
var topWidth = 8;
var topLength = 14;
var bottomWidth = 12;
var bottomLength = 14;
var bottomDistance = 2;
var height = 12;
// var top
// var BL,BR,BL2,BR2,TL,TR,TL2,TR2;
var BL = new Vector3( 0, bottomDistance, 0 );
var BR = new Vector3(bottomLength,bottomDistance,0);
var BL2 = new Vector3(0,bottomDistance+bottomWidth,0);
var BR2 = new Vector3(bottomLength,bottomDistance+bottomWidth,0);
var TL = new Vector3(0,0,height);
var TR = new Vector3(topLength,0,height);//8,10,24
var TL2 = new Vector3(0,topWidth,height);
var TR2 = new Vector3(topLength,topWidth,height);//12,18
const vertices = new Float32Array([
    // BL.x,BL.y,BL.z,
    // BR.x,BR.y,BR.z,
    // BL2.x,BR2.y,BR2.z,

    //left 
    BL.x,BL.y,BL.z,//1
    TL.x,TL.y,TL.z,//2
    BL2.x,BL2.y,BL2.z,//3

    TL.x,TL.y,TL.z,//4
    BL2.x,BL2.y,BL2.z,//5
    TL2.x,TL2.y,TL2.z,//6

    //right
    BR.x,BR.y,BR.z,//7
    TR.x,TR.y,TR.z,//8
    BR2.x,BR2.y,BR2.z,//9

    TR.x,TR.y,TR.z,//10
    BR2.x,BR2.y,BR2.z,//11
    TR2.x,TR2.y,TR2.z,//12

    //front
    BL2.x,BL2.y,BL2.z,//13
    BR2.x,BR2.y,BR2.z,//14
    TL2.x,TL2.y,TL2.z,//15

    BR2.x,BR2.y,BR2.z,//16
    TL2.x,TL2.y,TL2.z,//17
    TR2.x,TR2.y,TR2.z,//18


    //back
    BL.x,BL.y,BL.z,//19
    BR.x,BR.y,BR.z,//20
    TL.x,TL.y,TL.z,//21

    BR.x,BR.y,BR.z,//22
    TL.x,TL.y,TL.z,//23
    TR.x,TR.y,TR.z,//24
] );
console.log(vertices);


// itemSize = 3 because there are 3 values (components) per vertex
// geometry3.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material3 = new THREE.MeshLambertMaterial( { color: 0x585858 ,side:THREE.DoubleSide} );



var attribute = new THREE.BufferAttribute(vertices,3);

geometry3.attributes.position = attribute;
geometry3.computeFaceNormals();
geometry3.computeVertexNormals();
 geometry3.attributes.position.needsUpdate = true;
 console.log(geometry3);
 const mesh3 = new THREE.Mesh( geometry3, material3 );
 console.log(mesh3);

var wireFrame = new WireframeGeometry(geometry3);
console.log(wireFrame);
var line = new LineSegments(wireFrame);
console.log(line);



 scene.add(line);
scene.add(mesh3);
//mesh3.geometry.attributes.position.setXYZ( 0, 10, 1, 1 );




// geometry3.attributes.position.setXYZ( 0, 0, 5, 5 );
// mesh3.geometry.attributes.position.setXYZ( 0, 5, 5, 5 );
const width = document.getElementById("topwidth");
var a = "haha";
width.onchange = function(){
    console.log(width.value);
    a = "papa";
    // geometry3.attributes.position.needsUpdate = true;
    // geometry3.attributes.position.setXYZ( 8, width.value, 5, 5 );
    // geometry3.attributes.position.setXYZ( 1, width.value, 3, 3 );
}

const length = document.getElementById("toplength");
length.onchange = function(){
    console.log(a);
    console.log(length.value);
    a = "papa";
    geometry3.attributes.position.needsUpdate = true;
    geometry3.attributes.position.setXYZ( 7,length.value,0,height );
    geometry3.attributes.position.setXYZ( 9, length.value,0,height );
    geometry3.attributes.position.setXYZ( 23, length.value,0,height );
    geometry3.attributes.position.setXYZ( 11,length.value,topWidth,height );
    geometry3.attributes.position.setXYZ( 17,length.value,topWidth,height );
    scene.remove(line);
     wireFrame = new WireframeGeometry(geometry3);
    line = new LineSegments(wireFrame);



 scene.add(line);
    // mesh3.geometry.position.set
    
}


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
}
animate();





//gui control
const gui = new dat.GUI();
const cameraFolder = gui.addFolder("camera angle/摄像机距离");
cameraFolder.add(camera.position,"x",-5,5);
cameraFolder.add(camera.position,"y",-5,5);
cameraFolder.add(camera.position,"z",0,10);
cameraFolder.open();
const rotationFolder = gui.addFolder("camera rotation/摄像机角度");
rotationFolder.add(camera.rotation,"x",0,Math.PI*2);
rotationFolder.add(camera.rotation,"y",0,Math.PI*2);
rotationFolder.add(camera.rotation,"z",0,Math.PI*2);
rotationFolder.open();
const bufferFolder = gui.addFolder("测试");
// bufferFolder.add(setX,"first",0,10);

bufferFolder.open();


