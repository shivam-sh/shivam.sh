let showVectors = false

class Orbiter {
    constructor(x, y, z, m) {
        this.pos = createVector(x, y, z)
        this.vel = p5.Vector.random3D()
        this.vel.mult(5)
        this.acc = createVector(0, 0, 0)
        this.mass = m
        this.rad = sqrt(m)
        this.size = 0;
    }

    applyForce(f) {
        this.acc.set(f.div(this.mass))
    }

    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
    }

    show() {
        var distanceBasedRadius = this.rad * map(this.pos.z, -500, 500, 1, 4)
        fill(255)
        strokeWeight(2)
        stroke(255)
        ellipse(this.pos.x, this.pos.y, distanceBasedRadius)

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