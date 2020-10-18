/*
 * Terra - terrain.js
 * Shivam Sh | https://github.com/shivam-sh
 *
 * This file manages and optimizes the generation of terrain
 */

let terrainCache;
let cachedPosition;

// Create an array of an appropriate size to store cached terrain values
function initCache(position, span, depth, scale) {
	// Set size of arrays according to span and depth (render distance)
	terrainCache = new Array(span);
	for (let i = 0; i < terrainCache.length; i++) {
		terrainCache[i] = new Array(depth);
	}

	// Save the position that the current terrain represents
	cachedPosition = createVector(
		floor(position.x / scale) * scale,
		floor(position.y / scale) * scale,
		floor(position.z / scale) * scale
	);

	let xStart = cachedPosition.x - (span * scale) / 2;
	let zStart = cachedPosition.z - (depth * scale) / 2;

	for (let i = 0; i < terrainCache.length; i++) {
		for (let j = 0; j < terrainCache[0].length; j++) {
			let x = xStart + i * scale;
			let z = zStart + j * scale;

			terrainCache[i][j] = createVector(x, heightAt(x, z), z);
		}
	}
}

// Update the cache to represent the current terrain
async function updateCache(position, span, depth, scale) {
	// Store the current position
	currentPosition = createVector(
		floor(position.x / scale) * scale,
		floor(position.y / scale) * scale,
		floor(position.z / scale) * scale
	);

	// Calculate how many units the terrain has changed since the last time
	let deltaX = (currentPosition.x - cachedPosition.x) / scale;
	let deltaZ = (currentPosition.z - cachedPosition.z) / scale;

	// Calculate where the terrain should be drawn from
	let xStart = currentPosition.x - (span * scale) / 2;
	let zStart = currentPosition.z - (depth * scale) / 2;
	
	
	// Redraw the terrain if the person moved in the +x direction
	if (deltaX > 0) {
		for (let i = 0; i < terrainCache.length; i++) {
			for (let j = 0; j < terrainCache[0].length; j++) {				
				// Generate new terrain where needed and used the cache where already rendered
				if (i < terrainCache.length - deltaX) {
					terrainCache[i][j] = terrainCache[i + deltaX][j].copy();
				} else {
					let x = xStart + i * scale;
					let z = zStart + j * scale;
					
					terrainCache[i][j] = createVector(x, heightAt(x, z), z);
				}	
			}			
		}
	} 
	
	// Redraw the terrain if the person moved in the -x direction
	else if(deltaX < 0) {
		for (let i = terrainCache.length - 1; i >= 0; i--) {
			for (let j = 0; j < terrainCache[i].length; j++) {
				// Generate new terrain where needed and used the cache where already rendered
				if (i >= -deltaX) {
					terrainCache[i][j] = terrainCache[i + deltaX][j].copy();
				} else {
					let x = xStart + i * scale;
					let z = zStart + j * scale;
					
					terrainCache[i][j] = createVector(x, heightAt(x, z), z);
				}
			}
		}
	}
	
	// Redraw the terrain if the person moved in the +z direction
	if (deltaZ > 0) {
		for (let i = 0; i < terrainCache.length; i++) {
			for (let j = 0; j < terrainCache[0].length; j++) {
				// Generate new terrain where needed and used the cache where already rendered
				if (j < terrainCache[0].length - deltaZ) {
					terrainCache[i][j] = terrainCache[i][j + deltaZ].copy();
				} else {
					let x = xStart + i * scale;
					let z = zStart + j * scale;
					
					terrainCache[i][j] = createVector(x, heightAt(x, z), z);
				}
			}	
		}
	} 
	// Redraw the terrain if the person moved in the -z direction
	else if(deltaZ < 0) {
		for (let i = 0; i < terrainCache.length; i++) {
			for (let j = terrainCache[0].length - 1; j >= 0; j--) {
				// Generate new terrain where needed and used the cache where already rendered
				if (j >= -deltaZ) {
					terrainCache[i][j] = terrainCache[i][j + deltaZ].copy();
				} else {
					let x = xStart + i * scale;
					let z = zStart + j * scale;
				
					terrainCache[i][j] = createVector(x, heightAt(x, z), z);
				}
			}
		}
	}

	// Update the cached position to represent the updated terrain
	cachedPosition = createVector(currentPosition.x, currentPosition.y, currentPosition.z);

	return true;
}

// Draw the cached version of what the terrain is
function drawTerrainFromCache() {
	// Set the lighting as well as material colour
	ambientLight(200, 200, 200);
	ambientMaterial(190, 100, 100);
	stroke(255);

	// Start from the back and draw each row moving forwards
	for (let i = 0; i < terrainCache.length - 1; i++) {
		beginShape(TRIANGLE_STRIP);
		for (let j = 0; j < terrainCache[i].length - 1; j++) {
			/*
			 * Draw each vertex in this order to make a triangle strip
			 *
			 *  1-------2
			 *  |     / |
			 *  |   /   |
			 *  | /     |
			 *  3-------4
			 *  5-------6
			 *  |     / |
			 *  |   /   |
			 *  | /     |
			 *  7-------8 ...
			 */
			vertex(
				terrainCache[i][j].x,
				terrainCache[i][j].y,
				terrainCache[i][j].z
			);
			vertex(
				terrainCache[i + 1][j].x,
				terrainCache[i + 1][j].y,
				terrainCache[i + 1][j].z
			);
			vertex(
				terrainCache[i][j + 1].x,
				terrainCache[i][j + 1].y,
				terrainCache[i][j + 1].z
			);
			vertex(
				terrainCache[i + 1][j + 1].x,
				terrainCache[i + 1][j + 1].y,
				terrainCache[i + 1][j + 1].z
			);
		}
		endShape();
	}
}
