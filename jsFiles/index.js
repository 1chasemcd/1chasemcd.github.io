window.addEventListener('resize', function(event){setup()});
window.addEventListener("load", function() {setup()}, false);

function setup() {
  var topNav = document.getElementById("topnav");
  var content = document.getElementById("content");

  content.style.marginTop = topNav.offsetHeight + 16 + "px";

  database.ref("/routes").on("value", function(snapshot) {
    for (var i = 0; i < snapshot.numChildren(); i++) {
      var route = snapshot.child("" + i);
      addHTMLRoute(route.child("name").val(), route.child("setter").val(), route.child("grade").val());
    }
  });
}

function addHTMLRoute(route, setter, grade) {
  var div = document.createElement("div");
  var routeHeading = document.createElement("h3");
  var setterHeading = document.createElement("h4");
  var gradeHeading = document.createElement("h4");

  var routeText = document.createTextNode(route);
  var setterText = document.createTextNode("Setter: " + setter);
  var gradeText = document.createTextNode("Grade: " + grade);

  routeHeading.appendChild(routeText);
  setterHeading.appendChild(setterText);
  gradeHeading.appendChild(gradeText);

  div.appendChild(routeHeading);
  div.appendChild(setterHeading);
  div.appendChild(gradeHeading);

  content.appendChild(div);
  div.classList.add("route");
  div.setAttribute("onclick", "openRoute()");
}

function openRoute() {
  location.href='viewroute.html';
}

function openNew() {
  location.href='newroute.html';
}
