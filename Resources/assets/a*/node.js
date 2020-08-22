/*
 * A* - node.js
 * Shivam Sh | https://github.com/shivam-sh
 *
 * This file creates and manages a node object to be used by the A* pathfinding algorithm
 */

// Create an object to contain the possible states of a node
const states = {
	OPEN: "open",
	BLOCKED: "blocked",
	START: "start-node",
	GOAL: "goal-node",
	QUEUED: "queued",
	CLOSED: "closed",
	SUCCESS: "success",
	FAILED: "failed",
};

class MapNode {
	// Create a new node based on size, location, and state
	constructor(c, r, w, h, state) {
		// f, g, and h values
		this.f = Infinity;
		this.g = Infinity;
		this.h = Infinity;

		// Array to store all connections
		this.connected = [];

		// Reference to previous node
		this.cameFrom = undefined;

		// Data for visuals
		this.column = c;
		this.row = r;
		this.width = w;
		this.height = h;
		this.state = state;
	}

	// Draws the visual representation of a node
	show() {
		// Choose the colour based on the current state
		switch (this.state) {
			case states.OPEN:
				fill(255, 255, 255);
				break;
			case states.BLOCKED:
				fill(50, 50, 50);
				break;
			case states.START:
				fill(100, 100, 250);
				break;
			case states.FINISH:
				fill(100, 100, 250);
				break;
			case states.QUEUED:
				fill(255, 200, 100);
				break;
			case states.CLOSED:
				fill(150, 150, 150);
				break;
			case states.SUCCESS:
				fill(50, 200, 50);
				break;
			case states.FAILED:
				fill(200, 100, 100);
				break;
		}
		strokeWeight(1);
		stroke(0, 0, 0, 20);

		// Get infomation about the current canvas
		let canvasDiv = document.getElementById("canvas");
		let canvasWidth = canvasDiv.offsetWidth;
		let canvasHeight = canvasDiv.offsetHeight;

		// Resize the grid based on the current canvas size
		this.width = nodeWidth;
		this.height = nodeHeight;
		if (columns * this.width > canvasWidth) {
			let scale = (columns * nodeWidth) / canvasWidth;
			this.width /= scale;
			this.height /= scale;
		}
		if (rows * this.height > canvasHeight) {
			this.width = nodeWidth;
			this.height = nodeHeight;

			let scale = (rows * nodeHeight) / canvasHeight;
			this.width /= scale;
			this.height /= scale;
		}

		// Centre the grid on the canvas and draw the node
		let xOffset = (canvasWidth - this.width * columns) / 2;
		let yOffset = (canvasHeight - this.height * rows) / 2;
		rect(
			this.column * this.width + xOffset,
			this.row * this.height + yOffset,
			this.width,
			this.height
		);
	}

	// Returns an array with a list of connected nodes
	getConnections(grid) {
		// If the connections aren't already initialized, do so now
		if (!this.connected == []) {
			// Check/add the node to the top-left
			if (
				this.row != 0 &&
				this.column != 0 &&
				(grid[this.column - 1][this.row - 1].state == states.OPEN ||
					grid[this.column - 1][this.row - 1].state == states.FINISH)
			) {
				this.connected.push(grid[this.column - 1][this.row - 1]);
			}

			// Check/add the node to the top
			if (
				this.row != 0 &&
				(grid[this.column][this.row - 1].state == states.OPEN ||
					grid[this.column][this.row - 1].state == states.FINISH)
			) {
				this.connected.push(grid[this.column][this.row - 1]);
			}

			// Check/add the node to the top-right
			if (
				this.row != 0 &&
				this.column != grid.length - 1 &&
				(grid[this.column + 1][this.row - 1].state == states.OPEN ||
					grid[this.column + 1][this.row - 1].state == states.FINISH)
			) {
				this.connected.push(grid[this.column + 1][this.row - 1]);
			}

			// Check/add the node to the left
			if (
				this.column != 0 &&
				(grid[this.column - 1][this.row].state == states.OPEN ||
					grid[this.column - 1][this.row].state == states.FINISH)
			) {
				this.connected.push(grid[this.column - 1][this.row]);
			}

			// Check/add the node to the right
			if (
				this.column != grid.length - 1 &&
				(grid[this.column + 1][this.row].state == states.OPEN ||
					grid[this.column + 1][this.row].state == states.FINISH)
			) {
				this.connected.push(grid[this.column + 1][this.row]);
			}

			// Check/add the node to the bottom-left
			if (
				this.row != grid[0].length - 1 &&
				this.column != 0 &&
				(grid[this.column - 1][this.row + 1].state == states.OPEN ||
					grid[this.column - 1][this.row + 1].state == states.FINISH)
			) {
				this.connected.push(grid[this.column - 1][this.row + 1]);
			}

			// Check/add the node to the bottom
			if (
				this.row != grid[0].length - 1 &&
				(grid[this.column][this.row + 1].state == states.OPEN ||
					grid[this.column][this.row + 1].state == states.FINISH)
			) {
				this.connected.push(grid[this.column][this.row + 1]);
			}

			// Check/add the node to the bottom-right
			if (
				this.row != grid[0].length - 1 &&
				this.column != grid.length - 1 &&
				(grid[this.column + 1][this.row + 1].state == states.OPEN ||
					grid[this.column + 1][this.row + 1].state == states.FINISH)
			) {
				this.connected.push(grid[this.column + 1][this.row + 1]);
			}

			// Return the array of connected nodes
			return this.connected;
		} else {
			// Return the previously connected nodes
			return this.connected;
		}
	}

	// Changes the state of the node
	setState(state) {
		this.state = state;
	}

	// Sets the cameFrom variable to a new node
	setCameFrom(node) {
		this.cameFrom = node;
	}
}
