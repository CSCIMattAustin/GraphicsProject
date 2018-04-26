"use strict";

var canvas;
var engine;
var scene;
var health =100;
var score =0;
var WangBucks = 50;
var towerCount=0;
document.addEventListener("DOMContentLoaded", startBabylonJs, false);


document.ready

function startBabylonJs(){
    
    $('body').append('<button id="button" style="position: absolute; right: 10px; top: 300px; z-index: 400;">Click Me!</button>');

    
    $('body button').click(function (){
        newTowerSonic(20, 2, 10);
    });

    if(BABYLON.Engine.isSupported()){
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);
        
        window.addEventListener("resize", function(){
            engine.resize();
        });
        scene = new BABYLON.Scene(engine);
        
        // canvas.addEventListener('click', function (event){
        //     console.log('event.x: ', event.clientX);
        //     console.log('event.y: ', event.clientY);
        // });
        
        

        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var button = BABYLON.GUI.Button.CreateSimpleButton("btn1", 'Click Me');
        button.width = "60px";
        button.height = "40px";
        button.color = "white";
        button.top = '45%';
        button.left = '0.5%';
        button.background = "green";
        // button.onPointerClickObservable.add(function () {
        //     alert('hi');
        // })

        advancedTexture.addControl(button);


        //scene.ambientColor = new BABYLON.Color3(1, 1, 1);
        //var cam  = new BABYLON.FreeCamera("freecam", new BABYLON.Vector3(0,2, -10), scene);
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        
        
        
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.renderingGroupId = 0;
        
        var cam = new BABYLON.ArcRotateCamera("arcCam", 1, 0.8, 75, new BABYLON.Vector3(0,0,0), scene);
        cam.attachControl(canvas);
        cam.upperRadiusLimit = 250;
        cam.checkCollisions = true;
        
        var stats1="Stats";
        var stats2 = "Health: " + health;
        var stats3 = "Score: " + score;
        var output = new BABYLON.MeshBuilder.CreatePlane("output", {width:35, height:9}, scene);
        output.position.x=15;
        output.position.z=70;
        output.position.y=25;
        output.parent = cam;
        function newTowerSonic(x,y,z){
            var home = BABYLON.SceneLoader.ImportMesh("", "textures/", "sonic-the-hedgehog.babylon", scene, function (newMeshes) {
                for(var i = 0; i < 15; i++){
                    var sonic=newMeshes[i];
                    
                    sonic.position = new BABYLON.Vector3(x,y,z);
                    var light = new BABYLON.PointLight("pLight",
                    new BABYLON.Vector3(x, y+9, z));
                    light.diffuse = BABYLON.Color3.Red();
                    light.intensity = .8;
                }
                /*
                Sonic.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
                shadowGenerator.getShadowMap().renderList.push(Sonic);
                Sonic.position=newBABYLON.Vector3(0,0,0);
                E	scene.beginAnimation(Sonic, 73, 100, true, 0.8);*/
                // Set the target of the camera to the first imported mesh                                                                             
                //camera.target = newMeshes[0];                                                                                        
            });
            towerCount +=1;
            WangBucks -= 50;
        }
        newTowerSonic(50,1,50);
        //newTowerSonic(100,1,50);
        //home.x=1000;
        
        var textureResolution = 512;
        var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:512, height:180}, scene);   
        var textureContext = textureGround.getContext();
        
        var materialGround = new BABYLON.StandardMaterial("Mat", scene);    			
        /*textureGround.bumpTexture = new BABYLON.Texture("uganda.jpg", scene);
        textureGround.specularTexture = new BABYLON.Texture("uganda.jpg", scene);
        textureGround.emissiveTexture = new BABYLON.Texture("uganda.jpg", scene);
        textureGround.ambientTexture = new BABYLON.Texture("uganda.jpg", scene);*/
        materialGround.diffuseTexture = textureGround;
        output.material = materialGround;
        
        //Add text to dynamic texture
        var font = "bold 20px monospace";
        
        //	textureGround.drawText(stats1, 20, 70, font, "green", textureGround, true, true);
        function updateStats(h, s, d){
            health=h;
            score=s;
            WangBucks = d;
            var stats1="Stats";
            var stats2 = "Health: " + h;
            var stats3 = "Score: " + s;
            var stats4 = " $" + WangBucks;
            textureGround.drawText(stats2+"   " +stats3 + stats4, 20, 50, font,
            "white", "red", true, true);
        }
        updateStats(health, score, WangBucks);

        function changeColor(cube, vec){
            var t = new BABYLON.StandardMaterial("myMaterial", scene);
            t.duffuseColor = vec;
            cube.material = t;
            
        }
        var base = BABYLON.Mesh.CreateSphere("base", 16, 25, scene);
        var im = new BABYLON.StandardMaterial("textures/void.jpg", scene);
        base.material = im;
        //im.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        im.bumpTexture = new BABYLON.Texture("textures/void.jpg", scene);
        im.specularTexture = new BABYLON.Texture("textures/void.jpg", scene);
        im.emissiveTexture = new BABYLON.Texture("textures/void.jpg", scene);
        im.ambientTexture = new BABYLON.Texture("textures/void.jpg", scene);
        //im.diffuseTexture.hasAlpha = true;
        base.position.y += 6;
        base.position.x -= 50;
        base.position.z += 50;
        
        var numCube = 30;
        var cone = BABYLON.MeshBuilder.CreateCylinder("cone", {subdivision:4,arc:1,height:.1,diameter: 50, tessellation: 50}, scene);
        cone.position.x += 0;
        cone.position.y = 1 ;
        cone.position.z+=0;
        cone.alpha=0;
        var tex1 = new BABYLON.StandardMaterial("myMaterial", scene);
        tex1.bumpTexture = new BABYLON.Texture("textures/ground.png", scene);
        tex1.specularTexture = new BABYLON.Texture("textures/ground.png", scene);
        tex1.emissiveTexture = new BABYLON.Texture("textures/ground.png", scene);
        tex1.ambientTexture = new BABYLON.Texture("textures/ground.png", scene);
        tex1.aplha=0.;
        cone.material = tex1;
        
        var bigCube = BABYLON.Mesh.CreateBox("bigCube", 12, scene);
        bigCube.position.y += 6;
        bigCube.position.x += 50;
        bigCube.position.z -= 50;
        var tex = new BABYLON.StandardMaterial("myMaterial", scene);
        tex.bumpTexture = new BABYLON.Texture("textures/index.jpg", scene);
        tex.specularTexture = new BABYLON.Texture("textures/index.jpg", scene);
        tex.emissiveTexture = new BABYLON.Texture("textures/index.jpg", scene);
        tex.ambientTexture = new BABYLON.Texture("textures/index.jpg", scene);
        bigCube.material = tex;
        
        
        var cubes = [];
        
        for(var i = 0; i < numCube; i++){
            var newHealth = Math.floor(Math.random() * 10);
            var size, y, damage;
            if (newHealth < 5){
                size=2;
                y = 1;
                damage=1;
            }
            else if (newHealth >=5){
                size=5;
                y=2.5;
                damage=3;
            }
            var cube = BABYLON.Mesh.CreateBox("", size, scene);
            var tex = new BABYLON.StandardMaterial("myMaterial", scene);
            tex.bumpTexture = new BABYLON.Texture("uganda.jpg", scene);
            tex.specularTexture = new BABYLON.Texture("uganda.jpg", scene);
            tex.emissiveTexture = new BABYLON.Texture("uganda.jpg", scene);
            tex.ambientTexture = new BABYLON.Texture("uganda.jpg", scene);
            cube.material=tex;
            cube.position.y += y;
            cube.position.x += 50;
            cube.position.z -= 50;
            cube.damage=damage;
            cube.health = newHealth;
            
            cubes.push(cube);
        }
        
        var makeCtr = 0;
        var makeID = setInterval(function (){
            move(cubes[makeCtr]);
            ouch(cubes[makeCtr], makeCtr);
            makeCtr++;
            if(makeCtr === numCube)
            clearInterval(makeID);
        }, 1500);
        
        
        
        function move (cube){
            if(cube.health >0){
                var moveCtr = 0;
                var moveid = setInterval(function(){
                    cube.position.x -= 1;
                    cube.position.z += 1;
                    moveCtr++;
                    if(moveCtr === 100 && cube.intersectsMesh(base, true)){
                        clearInterval(moveid);
                        updateStats(health-cube.damage,score, WangBucks);
                    }
                    else if(moveCtr == 100 && cube.intersectsMesh(base, false)){
                        clearInterval(moveid);
                    }
                }, 200);
            }
        }
        
        function ouch (cube, num){
            var pain = setInterval(function(){
                if(cube.intersectsMesh(cone, true)){
                    cube.health -= towerCount;
                    if(cube.health < 1){
                        updateStats(health,score+1, WangBucks+10);
                        cube.position = new BABYLON.Vector3(50,-100,-50);
                        clearInterval(pain);
                    }
                    //console.log("cube " + num + " says ouch");
                }
            }, 3000);
        }
        
        
        //cube.position.y += 5;
        cube.checkCollisions = true;
        
        
        
        var ground = BABYLON.Mesh.CreateGround("floor", 500, 500, 100, scene);
        ground.checkCollisions = true;
        //ground.material = im;
        var tex2 = new BABYLON.StandardMaterial("myMaterial", scene);
        tex1.bumpTexture = new BABYLON.Texture("textures/ground.jpg", scene);
        tex2.specularTexture = new BABYLON.Texture("textures/ground.jpg", scene);
        tex2.emissiveTexture = new BABYLON.Texture("textures/ground.jpg", scene);
        tex2.ambientTexture = new BABYLON.Texture("textures/ground.jpg", scene);
        
        var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
        
        
        myMaterial.specularColor = new BABYLON.Color3(0., 0., 0.);
        myMaterial.emissiveColor = new BABYLON.Color3(0., 0, 0.);
        myMaterial.ambientColor = new BABYLON.Color3(0., 0., 0.);
        ground.material = tex2;
        //var light = new BABYLON.PointLight("pLight", new BABYLON.Vector3(5, 1, -10));
        //light.diffuse = BABYLON.Color3.Red();
        //light.intensity = .8;
        var hemi = new BABYLON.HemisphericLight("hLight", BABYLON.Vector3.Zero(), scene);
        //hemi.diffuse = BABYLON.Color3.Green();
        hemi.intensity=0.9;
        engine.runRenderLoop(function(){
            //    cube.rotation.x += 0.01;
            //  cube.rotation.y += 0.01;
            
            scene.render();
        });
        
    }
    
}