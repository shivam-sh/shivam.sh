/*
 * Orbit - attractor.js
 * Shivam Sh | https://github.com/shivam-sh
 * 
 * This file creates and manages an attractor object
 * which influences the orbiters that surround it
 */

class Attractor {
    // Create an attractor based on position and mass
    constructor(x, y, m) {
        this.pos = createVector(x, y);
        this.mass = m
        this.rad = sqrt(m)
    }

    // Take in an orbiter and apply a force to it
    attract(orbiter) {
        let force = p5.Vector.sub(this.pos, orbiter.pos)
        let distancesq = map(force.magSq(), 0, 50000, 250, 25000)
        let G = 10
        let strength = G * (this.mass * orbiter.mass / distancesq)
        force.setMag(strength)
        orbiter.applyForce(force)
    }

    // Draw an ellipse to represent the attractor
    show() {
        fill(255)
        stroke(255)
        ellipse(this.pos.x, this.pos.y, this.rad * 2)
    }
}