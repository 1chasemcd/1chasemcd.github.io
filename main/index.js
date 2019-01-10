window.addEventListener('resize', function(event){setup()});
window.addEventListener("load", function() {setup()}, false);

function setup() {
  var topNav = document.getElementById("topnav");
  var content = document.getElementById("content");

  content.style.marginTop = topNav.offsetHeight + 16 + "px";
}

function openRoute() {
  location.href='../viewroute/viewroute.html';
}

function openNew() {
  location.href='../newroute/newroute.html';
}
