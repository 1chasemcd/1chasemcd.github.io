window.onload = function() {
  var canvas = document.getElementById("viewcanvas");
  if (window.innerWidth * (943/700) > window.innerHeight - 120 - 151) {
    canvas.width = (window.innerHeight - 120 - 151) * (700/943);
    canvas.height = window.innerHeight - 120 - 151;

  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * (943/700);
  }
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("img");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  var ypos = 135 + canvas.height

  if (ypos > window.innerHeight - 120) {
    document.getElementById("inroute").style.top = window.innerHeight - 120 + "px";

  } else {
    document.getElementById("inroute").style.top = 135 + canvas.height + "px";
  }
}
