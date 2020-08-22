/*
 * Orbit - orbiter.js
 * Shivam Sh | https://github.com/shivam-sh
 * 
 * This file creates and manages an orbiter object
 * which updates its position according to the forces applied to it
 */

// Options
let showVectors = false

class Orbiter {

    // Create an orbiter based on position and mass
    constructor(x, y, z, m) {
        this.pos = createVector(x, y, z)
        this.vel = p5.Vector.random3D()
        this.vel.mult(5)
        this.acc = createVector(0, 0, 0)
        this.mass = m
        this.rad = sqrt(m)
        this.size = 0;
    }

    // Take in a force and apply it to the orbiter
    applyForce(f) {
        this.acc.set(f.div(this.mass))
    }

    // Update the position and velocity of the object based on the forces applied to it
    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
    }

    // Draw an ellipse to represent the position of the orbiter
    show() {
        // Modify the radius of the orbiter according to its z position
        var distanceBasedRadius = this.rad * map(this.pos.z, -500, 500, 1, 4)

        // Draw the actual orbiter
        fill(255)
        strokeWeight(2)
        stroke(255)
        ellipse(this.pos.x, this.pos.y, distanceBasedRadius)

        // Draw vectors to represent the object's velocity/ acceleration
        if (showVectors) {
            strokeWeight(4)
            
            stroke(50, 50, 200)
            line(this.pos.x, this.pos.y, this.pos.x + this.vel.x, this.pos.y + this.vel.y)
            stroke(200, 50, 50)
            line(this.pos.x, this.pos.y, this.pos.x + this.acc.x, this.pos.y + this.acc.y)
            stroke(200)
        }
    }
}