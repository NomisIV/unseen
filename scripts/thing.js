class Thing {
    constructor(x, y) {
        // Coordinates
        this.x = x;
        this.y = y;

        // Angle and Distance from player
        this.a;
        this.d;

        // Sound
        this.s = new p5.Oscillator(200);
        this.s.start();
    }

    draw() {
        rect(this.x, this.y, 20, 20);

        if (debug) {
            // Draw line from player to sound source
            line(this.x, this.y, p.x, p.y);

            // Draw panning of the sound on player
            translate(p.x, p.y);
            rotate(p.a);
            stroke(255, 0, 0);
            line(0, 0, cos(p.a - this.a) * 20, 0);
            rotate(-p.a);
            translate(-p.x, -p.y);
            stroke(255);
        }
    }

    play() {
        // Update angle and distance
        this.d = sqrt(pow(p.x - this.x, 2) + pow(p.y - this.y, 2));
        this.a = Math.atan2(p.y - this.y, p.x - this.x) - PI;

        // Calculate volume and panning from angle and distance
        const vol = 10 / this.d;
        const pan = -cos(p.a - this.a);

        // Set volume and panning
        this.s.amp(vol, 1 / 60);
        this.s.pan(pan);
    }
}
