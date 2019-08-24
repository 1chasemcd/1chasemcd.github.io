/* eslint no-console:0 consistent-return:0 */
"use strict";
var resolutionUniformLocation, cameraPosUniformLocation, cameraAngleUniformLocation;
var cameraPos = new Vector(0, 0, 30);
var cameraAngle = new Vector(Math.PI, 0);
var velocity = new Vector();
var on = false;
var then = 0;
var delta = 0;

function drawScene(now)
{
  delta = now - then;
  resize(canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (on)
  {
    cameraPos.add(velocity);
  }

  // Set up uniforms
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform3f(cameraPosUniformLocation, cameraPos.x, cameraPos.y, cameraPos.z);

  var cameraAngleVec = cameraAngle.toVec();
  gl.uniform3f(cameraAngleUniformLocation, cameraAngleVec.x,cameraAngleVec.y, cameraAngleVec.z);

  // Draw
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);

  then = now;
  requestAnimationFrame(drawScene);
}

function lockChange() {
 if (document.pointerLockElement === canvas ||
     document.mozPointerLockElement === canvas) {
   document.addEventListener("mousemove", mouseMoved, false);
 } else {
   document.removeEventListener("mousemove", mouseMoved, false);
 }
}

function mouseMoved(e)
{
  cameraAngle.x -= e.movementX / 400;

   if (cameraAngle.y >= Math.PI / 4 && e.movementY > 0)
   {
     cameraAngle.y = Math.PI / 4;
   }
   else if (cameraAngle.y <= -Math.PI / 4 && e.movementY < 0)
   {
     cameraAngle.y = -Math.PI / 4;
   }
   else
   {
     cameraAngle.y += e.movementY / 400;
   }
}

// Get A WebGL context
var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl");
if (!gl) {
  console.log("error: No webgl")
}

canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;

// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChange, false);
document.addEventListener('mozpointerlockchange', lockChange, false);

canvas.onclick = function() {
  canvas.webkitRequestFullScreen();
  canvas.requestPointerLock();
};

document.onkeydown = function(e) {
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    var char = String.fromCharCode(charCode);
    if (char == 'W' || char == 'w')
    {
      velocity = cameraAngle.toVec();
      on = true;
    }
    else if (char == 'a' || char == 'A')
    {
      var tempVel = new Vector(Math.PI / 2)
      tempVel.add(new Vector(cameraAngle.x, 0))
      velocity = tempVel.toVec().mult(0.5);
      on = true;
    }
    else if (char == 's' || char == 'S')
    {
      velocity = cameraAngle.toVec().mult(-1);
      on = true;
    }
    else if (char == 'd' || char == 'D')
    {
      var tempVel = new Vector(-Math.PI / 2)
      tempVel.add(cameraAngle)
      velocity = tempVel.toVec().mult(0.5);
      on = true;
    }
};

document.onkeyup = function(e) {
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    var char = String.fromCharCode(charCode);

    if (char == 'w' || char == 'W'|| char == 'a' || char == 'A' || char == 's' || char == 'S' || char == 'd' || char == 'D')
    {
      velocity.set(0, 0, 0);
      on = false;
    }
};

main();
requestAnimationFrame(drawScene);
