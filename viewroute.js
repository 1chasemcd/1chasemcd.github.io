window.onload = function() {
  // Setup canvas
  var canvas = document.getElementById("viewcanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth * (943/700);
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("img");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Code for sticky bottom tab
  var pullup = document.getElementById("pullup");
  var inroute = document.getElementById("inroute");
  var stickyY = inroute.offsetTop - window.innerHeight;
  window.onscroll = function() {
    if (window.pageYOffset > stickyY) {
      pullup.classList.add("pullupmove");
      pullup.classList.remove("pullupfixed");
    } else {
      pullup.classList.remove("pullupmove");
      pullup.classList.add("pullupfixed");
    }
  }
}

// Return to the main page.
function openIndex() {
  location.href='index.html';
}

// Slowly scroll to bottom on tab click.
function scrollToBottom() {
  window.scroll({
    top: document.body.scrollHeight - window.innerHeight,
    left: 0,
    behavior: 'smooth'
  });
}
