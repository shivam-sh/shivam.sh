const Sketch = (p) => {
  var numOrbiting = 6;

  let canvas;
  let attractor;
  let orbiters;

  p.setup = () => {
    // Get the "sketch" element from the webpage and set it as the output
    canvas = p.createCanvas(700, 460);
    p.windowResized();

    // Set the background colour
    p.background(0, 0, 0);

    // Declare elements to hold the components (one attractor and many orbiters)
    attractor = new Attractor(0, 0, 1000);
    orbiters = [numOrbiting];

    // Fill the orbiters array with randomized objects
    for (let i = 0; i < numOrbiting; i++) {
      orbiters[i] = new Orbiter(
        p.random(-canvas.width / 2, canvas.width / 2),
        p.random(-canvas.height / 2, canvas.height / 2),
        p.random(-30, -30),
        p.random(canvas.height / 10, canvas.height / 3)
      );
    }
  };

  p.draw = () => {
    // Set the centre of the page to (0,0) and fade the previous outputs to black
    p.translate(canvas.width / 2, canvas.height / 2);
    p.background(0, 0, 0, 30);

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
  };

  // Reset the simulation on mousepress
  p.mousePressed = () => {
    p.setup();
  };

  // Resize the canvas if the page is resized
  p.windowResized = () => {
    if (p.windowWidth > 800) {
      p.resizeCanvas(700, 460);
    } else {
      p.resizeCanvas(p.windowWidth - 72, 460);
    }
    p.background(0, 0, 0);
  };

  class Attractor {
    // Create an attractor based on position and mass
    constructor(x, y, m) {
      this.pos = p.createVector(x, y);
      this.mass = m;
      this.rad = p.sqrt(m);
    }

    // Take in an orbiter and apply a force to it
    attract(orbiter) {
      let force = p.createVector(
        this.pos.x - orbiter.pos.x,
        this.pos.y - orbiter.pos.y,
        this.pos.z - orbiter.pos.z
      );
      let distancesq = p.map(force.magSq(), 0, 50000, 250, 25000);
      let G = 10;
      let strength = G * ((this.mass * orbiter.mass) / distancesq);
      force.setMag(strength);
      orbiter.applyForce(force);
    }

    // Draw an ellipse to represent the attractor
    show() {
      p.fill(255);
      p.stroke(255);
      p.ellipse(this.pos.x, this.pos.y, this.rad * 2);
    }
  }

  let showVectors = false;

  class Orbiter {
    // Create an orbiter based on position and mass
    constructor(x, y, z, m) {
      this.pos = p.createVector(x, y, z);
      this.vel = p.createVector(p.random(), p.random(), p.random());
      this.vel.normalize();
      this.vel.mult(5);
      this.acc = p.createVector(0, 0, 0);
      this.mass = m;
      this.rad = p.sqrt(m);
      this.size = 0;
    }

    // Take in a force and apply it to the orbiter
    applyForce(f) {
      this.acc.set(f.div(this.mass));
    }

    // Update the position and velocity of the object based on the forces applied to it
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    }

    // Draw an ellipse to represent the position of the orbiter
    show() {
      // Modify the radius of the orbiter according to its z position
      var distanceBasedRadius = this.rad * p.map(this.pos.z, -500, 500, 0, 4);

      // Draw the actual orbiter
      p.fill(255);
      p.strokeWeight(2);
      p.stroke(255);
      p.ellipse(this.pos.x, this.pos.y, distanceBasedRadius);

      // Draw vectors to represent the object's velocity/ acceleration
      if (showVectors) {
        p.strokeWeight(4);

        p.stroke(50, 50, 200);
        p.line(
          this.pos.x,
          this.pos.y,
          this.pos.x + this.vel.x,
          this.pos.y + this.vel.y
        );
        p.stroke(200, 50, 50);
        p.line(
          this.pos.x,
          this.pos.y,
          this.pos.x + this.acc.x,
          this.pos.y + this.acc.y
        );
        p.stroke(200);
      }
    }
  }
};
export default Sketch;
