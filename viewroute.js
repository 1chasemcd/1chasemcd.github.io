window.onload = function() {
  var canvas = document.getElementById("viewcanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth * (943/700);
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("img");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  var pullup = document.getElementById("pullup");
  var inroute = document.getElementById("inroute");
  var stickyY = inroute.offsetTop - window.innerHeight;
  window.onscroll = function() {
    if (window.pageYOffset > stickyY) {
      pullup.classList.add("pullupmove");
      pullup.classList.remove("pullupfixed");
      document.body.style.backgroundColor = "red";
    } else {
      pullup.classList.remove("pullupmove");
      pullup.classList.add("pullupfixed");
      document.body.style.backgroundColor = "black";
    }
  }
}

function openIndex() {
  location.href='index.html';
}

function scrollToBottom() {
  window.scroll({
    top: document.body.scrollHeight - window.innerHeight,
    left: 0,
    behavior: 'smooth'
  });
}
