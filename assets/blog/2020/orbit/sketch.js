// A simple simulation to practice working with vectors in p5.js
// This code is a customized version of the gravitational orbit example created by Dan Schiffman

var numOrbiting = 10;

function setup() {

  let canvasDiv = document.getElementById('sketch');
  let width = canvasDiv.offsetWidth;
  let height = canvasDiv.offsetHeight;
  let canvas = createCanvas(width, height);
  canvas.parent('sketch');
  
  background(0, 0, 0);
  
  attractor = new Attractor(0, 0, 1000);
  orbiters = [numOrbiting];
  
  for (let i = 0; i < numOrbiting; i++) {
    orbiters[i] = new Orbiter(random(-width/2, width/2), random(-height/2, height/2), random(-30, -30), random(height/10, height/3));
  }
}

function draw() {
  translate(width/2, height/2); 

  background(0, 0, 0, 30);
  
  for (let i = 0; i < numOrbiting; i++) {
    attractor.attract(orbiters[i]);
    orbiters[i].update();
  }
  
  for (let i = 0; i < numOrbiting; i++) {
    if (orbiters[i].pos.z >= 0) {
      orbiters[i].show();
      attractor.show();
    } else {
      attractor.show();
      orbiters[i].show();
    }
  }
}

function windowResized() {
  let canvasDiv = document.getElementById('sketch');
  let width = canvasDiv.offsetWidth;
  let height = canvasDiv.offsetHeight;
  let canvas = createCanvas(width, height);
  canvas.parent('sketch');
  
  background(0, 0, 0);
  
  attractor.pos(createVector(0, 0))
  
}

function mousePressed() {
  let canvasDiv = document.getElementById('sketch');
  let width = canvasDiv.offsetWidth;
  let height = canvasDiv.offsetHeight;
  
  if (width == window.innerWidth && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}