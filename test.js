"use strict";

var canvas;
var engine;
var scene;

document.addEventListener("DOMContentLoaded", startBabylonJs, false);

function startBabylonJs(){

    if(BABYLON.Engine.isSupported()){
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);

        scene = new BABYLON.Scene(engine);

        var cam  = new BABYLON.FreeCamera("freecam", new BABYLON.Vector3(0,0, -10), scene);
        cam.attachControl(canvas);
        
        // var simpleMesh = new BABYLON.Mesh("myMesh", scene);

        // var plane = BABYLON.MeshBuilder.CreatePlane("plane", {}, scene);
        // plane.applyToMesh(simpleMesh);

        var cube = BABYLON.Mesh.CreateBox("cube", 2, scene);

        var light = new BABYLON.PointLight("pLight", new BABYLON.Vector3(5, 10, -5));

        engine.runRenderLoop(function(){
            scene.render();
        });

    }

}
 
function CreatePlace(size){
    var indices = [];
    var positions= [];
    var normals = [];
    var uvs = [];

    size = size || 1;

    //Vertices
    var halfSize = size / 2.0;
    positions.push(-halfSize, -halfSize, 0);
    normals.push(0, 0, -1.0);
    uvs.push(0.0, 0.0);


    positions.push(halfSize, -halfSize, 0);
    normals.push(0, 0, -1.0);
    uvs.push(1.0, 0.0);

    positions.push(halfSize, halfSize, 0);
    normals.push(0,0, -1.0);
    uvs.push(1.0, 1.0);


    //Indicies
    indices.push(0);
    indices.push(1);
    indices.push(2);

    indices.push(0);
    indices.push(2);
    indices.push(3);

    var vertexData = new BABYLON.VertexData();

    vertexData.indices = indices;
    vertexData.positions = positions;
    vertexData.normals = normals;
    vertexData.uvs = uvs;

    return vertexData;


}


// var createScene = function (){
//     //Creates basic scene
//     var scene = new BABYLON.Scene(engine);


//     var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);


//     camera.setTarger(new BABYLON.Vector3.Zero());

//     camera.attachControl(canvas, false);

//     var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

//     light.intensity = 0.7;

//     var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

//     sphere.position.y = 1;

//     var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

//     return scene;


// }