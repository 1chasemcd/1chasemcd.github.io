/* eslint no-console:0 consistent-return:0 */
"use strict";
var resolutionUniformLocation, cameraPosUniformLocation, cameraAngleUniformLocation;
var cameraPos = new Vector(0, 0, 30);
var cameraAngle = new Vector(Math.PI, 0);
var velocity = new Vector();
var on = false;
var then = 0;
var delta = 0;
var prevTouchX, prevTouchY;
var startDiv = document.getElementById('start');
var arrow = document.getElementById('arrow');

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

canvas.requestFullScreen = canvas.requestFullScreen ||
                           canvas.webkitRequestFullScreen;

function drawScene(now) {
  if (now != null)
  {
    delta = now - then;
  }
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

  if (now != null)
  {
    then = now;
    requestAnimationFrame(drawScene);
  }
}

function lockChange() {
  if (document.pointerLockElement === canvas ||
  document.mozPointerLockElement === canvas) {
    document.addEventListener("mousemove", mouseMoved, false);
  } else {
    document.removeEventListener("mousemove", mouseMoved, false);

  }
}

function fullScreen() {
  canvas.requestFullScreen();
  canvas.requestPointerLock();
}

function mouseMoved(e)
{
   angleChange(e.movementX / 400, e.movementY / 400);
}

function touchMoved(e)
{
  e.preventDefault();

  for (var i = 0; i < e.touches.length; i++) {
    if (e.touches[i].target.id != 'arrow') {
      var x = -e.touches[i].clientX;
      var y = -e.touches[i].clientY;
      angleChange((x - prevTouchX) / 700, (y - prevTouchY) / 700);

      prevTouchX = x;
      prevTouchY = y;
      return;
    }
  }
}

function touchStarted(e) {
  console.log(e);
  for (var i = 0; i < e.touches.length; i++) {
    if (e.touches[i].target.id == 'arrow') {
      velocity = cameraAngle.toVec();
      on = true;
    }
    else {
      prevTouchX = -e.touches[i].clientX;
      prevTouchY = -e.touches[i].clientY;
    }
  }
}

function touchEnded(e)
{
  if (e.target.id == 'arrow') {
    on = false;
  }
}

function angleChange(x, y)
{
  cameraAngle.x -= x;

   if (cameraAngle.y >= Math.PI / 2 - 0.001 && y > 0)
   {
     cameraAngle.y = Math.PI / 2 - 0.001;
   }
   else if (cameraAngle.y <= -Math.PI / 2 + 0.001 && y < 0)
   {
     cameraAngle.y = -Math.PI / 2 + 0.001;
   }
   else
   {
     cameraAngle.y += y;
   }
}

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
drawScene();

function start(e) {
  var touchScreen = e instanceof TouchEvent;
  document.removeEventListener('click', start, false);
  document.removeEventListener('touchstart', start, false);

  if (touchScreen == true) {
    touchStarted(e);
    startDiv.style.display = 'none';
    arrow.style.display = 'block';
    document.addEventListener("touchstart", touchStarted, false);
    document.addEventListener("touchmove", touchMoved, {passive: false});
    document.addEventListener("touchend", touchEnded, false);

  } else {
    // Hook pointer lock state change events for different browsers
    document.addEventListener('pointerlockchange', lockChange, false);
    document.addEventListener('mozpointerlockchange', lockChange, false);

    fullScreen();
    document.addEventListener('click', fullScreen, false);
  }

  requestAnimationFrame(drawScene);
}

document.addEventListener("touchstart", start, false);
document.addEventListener("click", start, false);
