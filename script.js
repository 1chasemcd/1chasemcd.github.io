function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  var i = 0;
  xmlhttp.onreadystatechange = function() {
    addContent(this);
  };

  xmlhttp.open("GET", "data.xml", true);
}

function addContent(xml) {
  var xmlDoc = xml.responseXML;
  document.write(xmlDoc.getElementsByTagName("wall")[0].childNodes[0].nodeValue);
}

function openRoute() {
    location.href='viewroute.html';
}
