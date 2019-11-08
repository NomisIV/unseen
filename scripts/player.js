class Player {
    constructor(x, y, a) {
        this.x = x;
        this.y = y;
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
        rectMode(CENTER);
        rect(0, 0, 20, 20);
        line(0, 0, 0, 20); // front
        rotate(-this.a);
        translate(-this.x, -this.y);
    }

    die() {

    }
}