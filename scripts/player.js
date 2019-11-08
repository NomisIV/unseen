class Player {
    constructor(x, y, a) {
        // Coordinates
        this.x = x;
        this.y = y;

        // Angle
        this.a = a;
    }

    move(dy, dx, da) {
        this.x += dx;
        this.y += dy;
        this.a += da;
    }

    atPos(x, y) {
        return (this.x == x && this.y == y);
    }

    draw() {
        translate(this.x, this.y);
        rotate(this.a);
        rect(0, 0, 20, 20);
        line(0, 0, 0, 20); // front
        rotate(-this.a);
        translate(-this.x, -this.y);
    }

    die() {

    }
}
