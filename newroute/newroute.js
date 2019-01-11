window.addEventListener('resize', function(event){onChange()});
window.addEventListener('orientationchange', function(event){onChange()});
window.addEventListener("load", function() {onLoad()}, false);

var topNav;
var canvas;
var img;
var pullup;
var inroute;
var form;
var lowDiv;
var wall;

function onLoad() {
  //Locate HTML elements
  topNav = document.getElementById("topnav");
  canvas = document.getElementById("viewcanvas");
  img = document.getElementById("img");
  pullup = document.getElementById("pullup");
  inroute = document.getElementById("inroute");
  form = document.getElementById("routeform");
  lowDiv = document.getElementById("bottom");

  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth * (943/700);
  wall = new Wall(canvas, img);

  // Code for form submit
  form.onsubmit = function() {
    var name = form.elements["name"].value;
    var setter = form.elements["setter"].value;
    var grade = form.elements["grade"].value;
    var holds = wall.holds;

    openIndex();

    // Return false to prevent the default form behavior
    return false;
  }

  onChange();
}

function onChange() {
  // Setup canvas
  canvas.style.marginTop = topNav.offsetHeight - 17 + "px";
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth * (943/700);
  wall.changeCanvas(canvas);

  canvas.addEventListener('click', function(event) {
    var x = (event.pageX - canvas.offsetLeft) / canvas.width,
        y = (event.pageY - canvas.offsetTop) / canvas.height;

    wall.update(x, y);
    wall.draw();
  });

  // Code for sticky bottom tab
  var stickyY = inroute.offsetTop - window.innerHeight;
  if (window.innerHeight > canvas.height + topNav.offsetHeight){
    pullup.classList.add("pullupmove");
    pullup.classList.remove("pullupfixed");
  } else {
    pullup.classList.remove("pullupmove");
    pullup.classList.add("pullupfixed");
  }
  window.onscroll = function() {
    if (window.pageYOffset > stickyY) {
      pullup.classList.add("pullupmove");
      pullup.classList.remove("pullupfixed");
    } else {
      pullup.classList.remove("pullupmove");
      pullup.classList.add("pullupfixed");
    }
  }

// Code for bottom spacefiller div
  if (window.innerHeight > canvas.height + topNav.offsetHeight){
    lowDiv.style.height = window.innerHeight -
    (inroute.offsetTop + inroute.offsetHeight) + "px";
  } else {
    lowDiv.style.height = "0px";
  }
}

// Return to the main page.
function openIndex() {
  location.href='../main/index.html';
}

// Slowly scroll to bottom on tab click.
function scrollToBottom() {
  window.scrollBy(0,10);
  if (window.pageYOffset < document.body.scrollHeight
    - window.innerHeight) {
    scrolldelay = setTimeout(scrollToBottom, 5);
  }
}
