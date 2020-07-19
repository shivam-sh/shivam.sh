class Attractor {
    constructor(x, y, m) {
        this.pos = createVector(x, y);
        this.mass = m
        this.rad = sqrt(m)
    }

    attract(orbiter) {
        let force = p5.Vector.sub(this.pos, orbiter.pos)
        let distancesq = map(force.magSq(), 0, 50000, 250, 25000)
        let G = 10
        let strength = G * (this.mass * orbiter.mass / distancesq)
        force.setMag(strength)
        orbiter.applyForce(force)
    }

    show() {
        fill(255)
        stroke(255)
        ellipse(this.pos.x, this.pos.y, this.rad * 2)
    }
}