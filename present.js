/*
  Present.js — Jan Lehnardt <jan@apache.org>
  Adds slides to your site.
*/
function tags(name) { return document.getElementsByTagName(name); }
function tag(name) { return tags(name)[0]; }
function css(elm, styles) { for(var style in styles) { elm.style[style] = styles[style]; }}
function inArray(needle, haystack) { return haystack.indexOf(needle) !== -1; }
function start() {
  // make all white
  var canvas = document.createElement("div");
  css(canvas, {
    width: "100%",
    height: "100%",
    position: "fixed",
    left: "0px",
    top: "0px",
    "background-color": "white",
    "font-size": "5em",
    "text-align": "center",
    "padding-top": "2.5em",
  });

  var body = tag("body");
  css(body, {overflow: "hidden"});
  body.appendChild(canvas);

  // grep all h*s.
  var slides = [];
  slides.push(tag("title"));
  // what's not to hate about NodeLists not being real arrays?
  for(var idx = 0; idx < body.childNodes.length; idx++) {
    var child = body.childNodes[idx];
    if(inArray(child.localName, ["h1", "h2", "h3", "h4", "h5", "h6"])) {
      // if it's a headline, make it a slide
      slides.push(child);
    }
  }

  var current = 0;
  function setCurrent(current) {
    canvas.innerHTML = slides[current].innerHTML;
  }

  // init first slide
  setCurrent(current);

  // setting up events
  document.onkeydown = function(event) {
    var keyCode = event.keyCode;

    // get outta here
    if(keyCode == 27) {
      var loc = window.location;
      loc.href = loc.href.replace(loc.hash, "");
      return; // outta here for realz
    }

    // spacebar, right arrow, advance
    if(keyCode == 39 || keyCode == 32) {
      current = current + 1;
    }
    // left arrow, go back
    if(keyCode == 37) {
      current = current - 1;
    }

    // make a loop, make a loop!
    if(current == slides.length) {
      current = 0;
    }
    if(current < 0) {
      current = slides.length - 1;
    }
    setCurrent(current); // jump!
  }
}

// give any link the hash target "#present"
// to have it start the presentation onclick
var hrefs = tags("a");
for(var idx = 0; idx < hrefs.length; idx++) {
  if(hrefs[idx].href.match(/#present/)) {
    hrefs[idx].onclick = start;
    break; // skip other hrefs
  }
}

if(window.location.hash == "#present") {
  start();
}
