/* 
 * Orbit
 * Shivam Sh | https://github.com/shivam-sh
 * 
 * A simple simulation to practice working with vectors in p5.js
 * This code is a customized version of the gravitational orbit example created by Dan Schiffman
 */

// Options
var numOrbiting = 5;

function setup() {
	// Get the "sketch" element from the webpage and set it as the output
	let canvasDiv = document.getElementById("sketch");
	let width = canvasDiv.offsetWidth;
	let height = canvasDiv.offsetHeight;
	let canvas = createCanvas(width, height);
	canvas.parent("sketch");

	// Set the background colour
	background(0, 0, 0);

	// Declare elements to hold the components (one attractor and many orbiters)
	attractor = new Attractor(0, 0, 1000);
	orbiters = [numOrbiting];

	// Fill the orbiters array with randomized objects
	for (let i = 0; i < numOrbiting; i++) {
		orbiters[i] = new Orbiter(
			random(-width / 2, width / 2),
			random(-height / 2, height / 2),
			random(-30, -30),
			random(height / 10, height / 3)
		);
	}
}

function draw() {
	// Set the centre of the page to (0,0) and fade the previous outputs to black
	translate(width / 2, height / 2);
	background(0, 0, 0, 30);

	// Update the physics for all the orbiters
	for (let i = 0; i < numOrbiting; i++) {
		attractor.attract(orbiters[i]);
		orbiters[i].update();
	}

	// Draw all the orbiters and the attractor to the canvas
	for (let i = 0; i < numOrbiting; i++) {
		orbiters[i].show();
	}
	attractor.show();
}

// Reset the simulation on mousepress
function mousePressed() {
	setup();
}

function keyPressed() {
	// Get the current width of the canvas
	let canvasDiv = document.getElementById("sketch");
	let width = canvasDiv.offsetWidth;

	// If the canvas fills the screen allow fullscreen to be toggled witf 'f'
	if (keyCode == 70 && width == window.innerWidth) {
		let fs = fullscreen();
		fullscreen(!fs);
	}
}

// Resize the canvas if the page is resized
function windowResized() {
	let canvasDiv = document.getElementById("sketch");
	let width = canvasDiv.offsetWidth;
	let height = canvasDiv.offsetHeight;
	let canvas = createCanvas(width, height);
	canvas.parent("sketch");
	background(0, 0, 0);
}
