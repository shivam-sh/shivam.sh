/*
 * Terra
 * Shivam Sh | https://github.com/shivam-sh
 *
 * A terrain generator/3D world
 * made using WEBGL and p5.js
 */

// Camera Options
let cSpeed = 50;
let cHeight = -3000;
let xOffset = 0;
let zOffset = 3000;

// Terrain Options
let tScale = 300;
let smoothness = 20;
let tSpan = 40;
let tDepth = 30;
let tHeight = 65;

// Global Variables
let pos;
let camera;

function setup() {
	// Create the canvas to enable output to the webpage
	let canvasDiv = document.getElementById("canvas");
	let width = canvasDiv.offsetWidth;
	let height = canvasDiv.offsetHeight;
	let canvas = createCanvas(width, height, WEBGL);
	canvas.parent("canvas");

	// Create a position vector and a camera to keep track of the person's location and view
	pos = createVector(0, 0, 0);
	camera = createCamera();

	// Initialize the terrain cache
	initCache(pos, tSpan, tDepth, tScale);

	// Tilt the camera downwards
	camera.tilt(PI / 6);
}

function draw() {
	// Draw a dark background
	background(50);
	// Place tha camera at the current location with an appropriate height
	camera.setPosition(pos.x + xOffset, cHeight, pos.z + zOffset);

	// Update and draw the terrain
	updateCache(pos, tSpan, tDepth, tScale);
	drawTerrainFromCache();

	// Check to see if any keys were pressed
	keyCheck();

	// Move the camera over the terrain
	pos.z -= cSpeed;
}

// Check for what the height at any (x, z) value should be (across the horizontal plane)
function heightAt(x, z) {
	// Map the (x,z) coordinates to the much more dense perlin noise space
	return -(
		(tHeight *
			noise(
				(x + 100000) / (tScale * smoothness),
				(z + 100000) / (tScale * smoothness)
			)) **
		2
	);
}

// Check if any of the movement/ camera keys are pressed
function keyCheck() {
	// Check if the W A S D keys are pressed, and move the person accordingly
	if (keyIsDown(87)) pos.z -= cSpeed;
	if (keyIsDown(65)) pos.x -= cSpeed;
	if (keyIsDown(83)) pos.z += 2 * cSpeed;
	if (keyIsDown(68)) pos.x += cSpeed;

	// Check if the ↑ ↓ ← → keys are pressed, and move the camera accordingly
	if (keyIsDown(38)) camera.tilt(-PI / 60);
	if (keyIsDown(37)) camera.pan(PI / 60);
	if (keyIsDown(40)) camera.tilt(PI / 60);
	if (keyIsDown(39)) camera.pan(-PI / 60);
}
