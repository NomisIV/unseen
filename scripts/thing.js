class Thing {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.s = new p5.Oscillator(200);
        this.s.start();
    }

    draw() {
        translate(this.x, this.y);
        rectMode(CENTER);
        rect(0, 0, 20, 20);
        translate(-this.x, -this.y);
    }

    play(vol, bal) {
        this.s.amp(vol, 1 / 60);
        this.s.pan(bal);
    }
}