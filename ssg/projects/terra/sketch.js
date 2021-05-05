
const Sketch = (p) => {
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

  p.setup = () => {
    p.createCanvas(700, 460, p.WEBGL);

    // Create a position vector and a camera to keep track of the person's location and view
    pos = p.createVector(0, 0, 0);
    camera = p.createCamera();

    // Initialize the terrain cache
    initCache(pos, tSpan, tDepth, tScale);

    p.windowResized();
  };

  p.draw = () => {
    // Draw a dark background
    p.background(50);
    // Place tha camera at the current location with an appropriate height
    camera.setPosition(pos.x + xOffset, cHeight, pos.z + zOffset);

    // Update and draw the terrain
    updateCache(pos, tSpan, tDepth, tScale);
    drawTerrainFromCache();

    // Check to see if any keys were pressed
    keyCheck();

    // Move the camera over the terrain
    pos.z -= cSpeed;
  };

  p.windowResized = () => {
    if (p.windowWidth > 800) {
      p.resizeCanvas(700, 460);
    }
    else {
      p.resizeCanvas(p.windowWidth - 72, 460);
    }

    camera.tilt(p.PI / 6);
  }

  let terrainCache;
  let cachedPosition;
  let currentPosition;

  // Create an array of an appropriate size to store cached terrain values
  function initCache(position, span, depth, scale) {
    // Set size of arrays according to span and depth (render distance)
    terrainCache = new Array(span);
    for (let i = 0; i < terrainCache.length; i++) {
      terrainCache[i] = new Array(depth);
    }

    // Save the position that the current terrain represents
    cachedPosition = p.createVector(
      p.floor(position.x / scale) * scale,
      p.floor(position.y / scale) * scale,
      p.floor(position.z / scale) * scale
    );

    let xStart = cachedPosition.x - (span * scale) / 2;
    let zStart = cachedPosition.z - (depth * scale) / 2;

    for (let i = 0; i < terrainCache.length; i++) {
      for (let j = 0; j < terrainCache[0].length; j++) {
        let x = xStart + i * scale;
        let z = zStart + j * scale;

        terrainCache[i][j] = p.createVector(x, heightAt(x, z), z);
      }
    }
  }

  // Update the cache to represent the current terrain
  async function updateCache(position, span, depth, scale) {
    // Store the current position
    currentPosition = p.createVector(
      p.floor(position.x / scale) * scale,
      p.floor(position.y / scale) * scale,
      p.floor(position.z / scale) * scale
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

            terrainCache[i][j] = p.createVector(x, heightAt(x, z), z);
          }
        }
      }
    }

    // Redraw the terrain if the person moved in the -x direction
    else if (deltaX < 0) {
      for (let i = terrainCache.length - 1; i >= 0; i--) {
        for (let j = 0; j < terrainCache[i].length; j++) {
          // Generate new terrain where needed and used the cache where already rendered
          if (i >= -deltaX) {
            terrainCache[i][j] = terrainCache[i + deltaX][j].copy();
          } else {
            let x = xStart + i * scale;
            let z = zStart + j * scale;

            terrainCache[i][j] = p.createVector(x, heightAt(x, z), z);
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

            terrainCache[i][j] = p.createVector(x, heightAt(x, z), z);
          }
        }
      }
    }
    // Redraw the terrain if the person moved in the -z direction
    else if (deltaZ < 0) {
      for (let i = 0; i < terrainCache.length; i++) {
        for (let j = terrainCache[0].length - 1; j >= 0; j--) {
          // Generate new terrain where needed and used the cache where already rendered
          if (j >= -deltaZ) {
            terrainCache[i][j] = terrainCache[i][j + deltaZ].copy();
          } else {
            let x = xStart + i * scale;
            let z = zStart + j * scale;

            terrainCache[i][j] = p.createVector(x, heightAt(x, z), z);
          }
        }
      }
    }

    // Update the cached position to represent the updated terrain
    cachedPosition = p.createVector(
      currentPosition.x,
      currentPosition.y,
      currentPosition.z
    );

    return true;
  }

  // Draw the cached version of what the terrain is
  function drawTerrainFromCache() {
    // Set the lighting as well as material colour
    p.ambientLight(200, 200, 200);
    p.ambientMaterial(190, 100, 100);
    p.stroke(255);

    // Start from the back and draw each row moving forwards
    for (let i = 0; i < terrainCache.length - 1; i++) {
      p.beginShape(p.TRIANGLE_STRIP);
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
        p.vertex(
          terrainCache[i][j].x,
          terrainCache[i][j].y,
          terrainCache[i][j].z
        );
        p.vertex(
          terrainCache[i + 1][j].x,
          terrainCache[i + 1][j].y,
          terrainCache[i + 1][j].z
        );
        p.vertex(
          terrainCache[i][j + 1].x,
          terrainCache[i][j + 1].y,
          terrainCache[i][j + 1].z
        );
        p.vertex(
          terrainCache[i + 1][j + 1].x,
          terrainCache[i + 1][j + 1].y,
          terrainCache[i + 1][j + 1].z
        );
      }
      p.endShape();
    }
  }

  // Check for what the height at any (x, z) value should be (across the horizontal plane)
  function heightAt(x, z) {
    // Map the (x,z) coordinates to the much more dense perlin noise space
    return -(
      (tHeight *
        p.noise(
          (x + 100000) / (tScale * smoothness),
          (z + 100000) / (tScale * smoothness)
        )) **
      2
    );
  }

  // Check if any of the movement/ camera keys are pressed
  function keyCheck() {
    // Check if the W A S D keys are pressed, and move the person accordingly
    if (p.keyIsDown(87)) pos.z -= cSpeed;
    if (p.keyIsDown(65)) pos.x -= cSpeed;
    if (p.keyIsDown(83)) pos.z += 2 * cSpeed;
    if (p.keyIsDown(68)) pos.x += cSpeed;

    // Check if the ↑ ↓ ← → keys are pressed, and move the camera accordingly
    if (p.keyIsDown(38)) camera.tilt(- p.PI / 60);
    if (p.keyIsDown(37)) camera.pan(p.PI / 60);
    if (p.keyIsDown(40)) camera.tilt(p.PI / 60);
    if (p.keyIsDown(39)) camera.pan(- p.PI / 60);
  }
};
export default Sketch;
