x1"use strict";

var canvas;
var gl;
var points;
var vertices = [];
var offset = 0.8;
 function path(){
    vertices.push(vec2(-offset,1));
    vertices.push(vec2(1,-offset));
    vertices.push(vec2(offset,-1));
    vertices.push(vec2(-offset,1));
    vertices.push(vec2(-1,offset));
    vertices.push(vec2(offset,-1));
    vertices.push(vec2(-1,1));
    vertices.push(vec2(-offset,1));
    vertices.push(vec2(-1,offset));
    vertices.push(vec2(1, -1));
    vertices.push(vec2(1, -offset));
    vertices.push(vec2(offset,-1));
 }
window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    canvas.width = window.innerWidth * .85;
    canvas.height = window.innerHeight * .85;
    document.getElementById("gl-canvas").style.opacity = "0.3";
    gl = W ebGLUtils.setupWebGL( canvas );
    if (  !gl ) { alert( "WebGL isn't available" );
	 $('#roundInfo').attr('float', 'right');		 
    } 
     
    $('# roundInfo').click(function () {
	    alert('you click on round info'); 
	} );
      
    $('#playerInfo').click(function () {
	      alert('you clicked on player info');
	});  
    
    $('#playPause').click(function () {
	    alert('you clicked the play/pause area');
	});
    
    $('#tower1').click(function () {
	    alert('you clicked tower1');
	});
    
    $('#tower2').click(function () {
	    alert('you clicked tower2');
	});
    
    $('#tower3').click(function () {
	    alert('you clicked tower3');
	}) 
    //  Configure WebGL
    //
    path();
    gl.viewport( 0, 0, canvas.width, canvas.height );
    
//  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

// Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    // Associate out shader variables with our data buffer

      var vPosition = gl.getAttribLocation( program, "vPosition" );
      gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
      gl.enableVertexAttribArray( vPosition );
    
    render();
    
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0,vertices.length);
}
