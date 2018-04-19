"use strict";

var canvas;
var engine;
var scene;

document.addEventListener("DOMContentLoaded", startBabylonJs, false);

function startBabylonJs(){
    if(BABYLON.Engine.isSupported()){
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);
        
        window.addEventListener("resize", function(){
            engine.resize();
        });
        
        scene = new BABYLON.Scene(engine);
        //scene.ambientColor = new BABYLON.Color3(1, 1, 1);
        //var cam  = new BABYLON.FreeCamera("freecam", new BABYLON.Vector3(0,2, -10), scene);
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.disableLighting = true;
	skybox.material = skyboxMaterial;

	  /*var skull = BABYLON.SceneLoader.ImportMesh("", "textures/", "skull.babylon", scene, function (newMeshes) {
                // Set the target of the camera to the first imported mesh
                //camera.target = newMeshes[0];
          });
	skull.setPositionWithLocalVector(new BABYLON.Vector3(6,-50,50));
	//skybox.infiniteDistance = true;

	//skyboxMaterial.disableLighting = true;*/

	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skybox.renderingGroupId = 0;

        var cam = new BABYLON.ArcRotateCamera("arcCam", 1, 0.8, 75, new BABYLON.Vector3(0,0,0), scene);
        cam.attachControl(canvas);
	cam.upperRadiusLimit = 300;
        cam.checkCollisions = true;
        //cam.applyGravity = true;
        
        // var assetManager = new BABYLON.AssetsManager(scene);
        // var knucklesTask = assetManager.addMeshTask("knucklesTask", "", "./", "Knuckles.obj");
        
        // knucklesTask.onSuccess = function(task){
        //     task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        // }
        
        // knucklesTask.onError = function (task, message, exception){
        //     console.log(message, exception);
        // }
        
        // var simpleMesh = new BABYLON.Mesh("myMesh", scene);
        
        // var plane = BABYLON.MeshBuilder.CreatePlane("plane", {}, scene);
        // plane.applyToMesh(simpleMesh);
        
        var base = BABYLON.Mesh.CreateSphere("base", 16, 25, scene);
        var im = new BABYLON.StandardMaterial("space.jpeg", scene);
        base.material = im;
        //im.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        im.bumpTexture = new BABYLON.Texture("space.jpeg", scene);
        im.specularTexture = new BABYLON.Texture("space.jpeg", scene);
        im.emissiveTexture = new BABYLON.Texture("space.jpeg", scene);
        im.ambientTexture = new BABYLON.Texture("space.jpeg", scene);
        //im.diffuseTexture.hasAlpha = true;
        base.position.y += 6;
        base.position.x -= 50;
        base.position.z += 50;
        
        var numCube = 30;
        var cone = BABYLON.MeshBuilder.CreateCylinder("cone", {subdivision:4,arc:1,height:.1,diameter: 100, tessellation: 50}, scene);
	cone.position.x += 10;
	cone.position.y = 0 ;
	cone.position.z+=10;
	
        var bigCube = BABYLON.Mesh.CreateBox("bigCube", 12, scene);
        bigCube.position.y += 6;
        bigCube.position.x += 50;
        bigCube.position.z -= 50;
        var tex = new BABYLON.StandardMaterial("myMaterial", scene);
        tex.bumpTexture = new BABYLON.Texture("world.png", scene);
        tex.specularTexture = new BABYLON.Texture("world.png", scene);
        tex.emissiveTexture = new BABYLON.Texture("world.png", scene);
        tex.ambientTexture = new BABYLON.Texture("world.png", scene);
        bigCube.material = tex;

        
        var cubes = [];

        for(var i = 0; i < numCube; i++){
            var cube = BABYLON.Mesh.CreateBox("", 2, scene);
            var tex = new BABYLON.StandardMaterial("myMaterial", scene);
            tex.bumpTexture = new BABYLON.Texture("uganda.jpg", scene);
            tex.specularTexture = new BABYLON.Texture("uganda.jpg", scene);
            tex.emissiveTexture = new BABYLON.Texture("uganda.jpg", scene);
            tex.ambientTexture = new BABYLON.Texture("uganda.jpg", scene);
            cube.material=tex;
            cube.position.y += 1;
            cube.position.x += 50;
            cube.position.z -= 50;
            cubes.push(cube);
        }
        
        var makeCtr = 0;
        var makeID = setInterval(function (){
            move(cubes[makeCtr]);
	    ouch(cubes[makeCtr], makeCtr);
            makeCtr++;
            console.log('counter', makeCtr);
            if(makeCtr === numCube)
		clearInterval(makeID);
        }, 1500);
	
        
        
        function move (cube){
            var moveCtr = 0;
            var moveid = setInterval(function(){
                cube.position.x -= 1;
                cube.position.z += 1;
                moveCtr++;
                if(moveCtr === 100){
                    clearInterval(moveid);
                }
            }, 300);
        }

	function ouch (cube, num){
	    setInterval(function(){
		if(cube.intersectsMesh(cone, true)){
		    console.log("cube " + num + " says ouch");
		}
	    }, 1000);
	}
        
        
        //cube.position.y += 5;
        cube.checkCollisions = true;
        
        
        
        var ground = BABYLON.Mesh.CreateGround("floor", 500, 500, 100, scene);
        ground.checkCollisions = true;
	//ground.material = im;
	var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
			     
			     
	myMaterial.specularColor = new BABYLON.Color3(0.5, 0., 0.);
	myMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);
	myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
	ground.material = myMaterial;
	//var light = new BABYLON.PointLight("pLight", new BABYLON.Vector3(5, 1, -10));
        //light.diffuse = BABYLON.Color3.White();
//	light.intensity = .2;
	var hemi = new BABYLON.HemisphericLight("hLight", BABYLON.Vector3.Zero(), scene);
	engine.runRenderLoop(function(){
            //    cube.rotation.x += 0.01;
            //  cube.rotation.y += 0.01;
            
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

