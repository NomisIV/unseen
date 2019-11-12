class Player {
    constructor(x, y, a) {
        // Coordinates
        this.x = x;
        this.y = y;

        // Angle
        this.a = a;
    }

    move(dx, dy, da) {
        this.x += dx;
        this.y += dy;
        this.a += da;
    }

    atPos(x, y) {
        return this.x == x && this.y == y;
    }

    draw() {
        translate(this.x, this.y); // Positive y-direction is down in p5
        rotate(this.a);
        rect(0, 0, 20, 20);
        line(0, 0, 0, 20); // front
        rotate(-this.a);
        translate(-this.x, -this.y);
    }

    die() {}
}
