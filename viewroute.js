window.onload = function() {
  var canvas = document.getElementById("routeCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth * (900/750);
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("img");
  img.style.width = "100px";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  document.getElementById("inRoute").style.height =
    (window.innerHeight - (window.innerWidth * (900/750)) - 133) + "px";

  document.getElementById("spacer").style.height =
    (((window.innerHeight - (window.innerWidth * (900/750)) - 133) - 268) / 2) + "px";
}
