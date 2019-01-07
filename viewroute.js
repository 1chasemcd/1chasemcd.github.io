window.addEventListener('resize', function(event){setup()});
window.addEventListener("load", function() {setup()}, false);

function setup() {
  //Locate HTML elements
  var topNav = document.getElementById("topnav");
  var canvas = document.getElementById("viewcanvas");
  var img = document.getElementById("img");
  var pullup = document.getElementById("pullup");
  var inroute = document.getElementById("inroute");
  var lowDiv = document.getElementById("bottom");

  // Setup canvas
  canvas.style.marginTop = topNav.offsetHeight - 17 + "px";
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth * (943/700);
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Code for sticky bottom tab
  var stickyY = inroute.offsetTop - window.innerHeight;
  if (window.innerHeight > canvas.height + topNav.offsetHeight){
    pullup.classList.add("pullupmove");
    pullup.classList.remove("pullupfixed");
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
  location.href='index.html';
}

// Slowly scroll to bottom on tab click.
function scrollToBottom() {
  window.scrollBy(0,10);
  if (window.pageYOffset < document.body.scrollHeight
    - window.innerHeight) {
    scrolldelay = setTimeout(scrollToBottom, 5);
  }
}
