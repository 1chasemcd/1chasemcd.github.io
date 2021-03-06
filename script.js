// Prefer camera resolution nearest to 1280x720.
var constraints = { video: true};

let video = document.querySelector('video');
video.setAttribute("playsinline", true);

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.