/*
 * A*
 * Shivam Sh | https://github.com/shivam-sh
 * 
 * A demonstration of the A* pathfinding algorithm
 */

// Grid Options
let percentFilled = 40;
let nodeHeight = 30;
let nodeWidth = 30;

function heuristic(node) {
	// Calculate the theoretical shortest distance to the finish
	let distance = dist(
		node.column * nodeWidth,
		node.row * nodeHeight,
		finish.column * nodeWidth,
		finish.row * nodeHeight
	);

	// Return a slight underestimate of the actual distance to the finish
	// (Returning an overestimate would reduce the chances of finding the shortest path greatly)
	return (distance + (distance * percentFilled) / 100) * 0.85;
}

// GLOBAL VARIABLES
let queue = [];
let closed = [];

let grid;
let columns;
let rows;

let start;
let finish;

function setup() {
	// Code to create an adaptive canvas
	let canvasDiv = document.getElementById("canvas");
	let width = canvasDiv.offsetWidth;
	let height = canvasDiv.offsetHeight;
	let canvas = createCanvas(width, height);
	canvas.parent("canvas");
	background(0, 0, 0);

	// Setup values for grid
	columns = floor(width / nodeWidth);
	rows = floor(height / nodeHeight);

	// Create 2D grid
	grid = new Array(columns);
	for (let i = 0; i < columns; i++) {
		grid[i] = new Array(rows);
	}

	// Create storage for nodes
	queue = [];
	closed = [];

	// Fill the grid with nodes based on the % that should be open
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			if (Math.random() * 100 > percentFilled) {
				grid[x][y] = new MapNode(
					x,
					y,
					nodeWidth,
					nodeHeight,
					states.OPEN
				);
			} else {
				grid[x][y] = new MapNode(
					x,
					y,
					nodeWidth,
					nodeHeight,
					states.BLOCKED
				);
			}
		}
	}

	// Set/init start and end points
	start = grid[floor(columns / 10)][floor(rows / 10)];
	finish =
		grid[columns - 1 - floor(columns / 10)][rows - 1 - floor(rows / 10)];
	start.setState(states.START);
	finish.setState(states.FINISH);

	start.g = 0;
	start.h = heuristic(start);
	start.f = start.g + start.h;

	// Add the start node to the queue
	queue.push(start);

	// Output the base grid
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			grid[x][y].show();
		}
	}
}

function draw() {
	if (queue.length > 0) {
		// Run main search loop
		let currentNode = queue[0];
		let newNodes = currentNode.getConnections(grid);

		// Check if done
		if (currentNode == finish && start.state != states.SUCCESS) {
			while (currentNode.cameFrom != undefined) {
				currentNode.setState(states.SUCCESS);
				currentNode.show();
				currentNode = currentNode.cameFrom;
			}
			start.setState(states.SUCCESS);
			start.show();
		} else if (start.state != states.SUCCESS) {
			// Remove current node from queue
			if (currentNode.state != states.START) {
				currentNode.setState(states.CLOSED);
				currentNode.show();
			}
			closed.push(currentNode);
			queue.shift();

			// Insert each connection into the queue according to its f value
			newNodes.forEach((node) => {
				// Calculate the distance to this node (from the start)
				let tempG =
					currentNode.g +
					dist(
						currentNode.column * nodeWidth,
						currentNode.row * nodeHeight,
						node.column * nodeWidth,
						node.row * nodeHeight
					);

				// Save this path if it is faster than any previous
				if (tempG < node.g) {
					node.cameFrom = currentNode;
					node.g = tempG;
					node.h = heuristic(node);
					node.f = node.g + node.h;
				}

				// Add the node to the queue and sort
				queue.push(node);
				queue.sort((a, b) => a.f - b.f);
				node.setState(states.QUEUED);
				node.show();
			});
		}
	} else if (start.state != states.SUCCESS && start.state != states.FAILED) {
		// Search failed
		for (let x = 0; x < columns; x++) {
			for (let y = 0; y < rows; y++) {
				if (grid[x][y].state == states.CLOSED) {
					grid[x][y].setState(states.FAILED);
					grid[x][y].show();
				}
			}
		}
	}
}

// Reload the sketch if clicked
function mousePressed() {
	setup();
}

// Enter fullscreen if the canvas is on its display page and 'f' is pressed
function keyPressed() {
	let canvasDiv = document.getElementById("canvas");
	let width = canvasDiv.offsetWidth;
	
	if (keyCode == 70 && width == window.innerWidth) {
		let fs = fullscreen();
		fullscreen(!fs);
	}
}

// Remake the canvas if it is resized
function windowResized() {
	let canvasDiv = document.getElementById("canvas");
	let width = canvasDiv.offsetWidth;
	let height = canvasDiv.offsetHeight;
	let canvas = createCanvas(width, height);
	canvas.parent("canvas");

	background(0);

	// Output the grid
	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			grid[x][y].show();
		}
	}
}
