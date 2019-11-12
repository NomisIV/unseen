class Thing {
    constructor(x, y, tone, beep) {
        // Coordinates
        this.x = x;
        this.y = y;

        // Angle and Distance from player
        this.a;
        this.d;

        // Sound
        setInterval(() => {
            this.playing = !this.playing;
        }, beep);
        this.hasPlayed = false;

        this.s = new p5.Oscillator(tone);
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
            line(0, 0, cos(this.a) * 20, 0);
            rotate(-p.a);
            translate(-p.x, -p.y);
            stroke(255);
        }
    }

    play() {
        // Update angle and distance
        this.d = sqrt(pow(p.x - this.x, 2) + pow(p.y - this.y, 2));
        this.a = p.a - Math.atan2(p.y - this.y, p.x - this.x) - PI;

        // Calculate volume and panning from angle and distance
        // Decrease volume behind the player
        const rotationFactor =
            this.a < PI / 2 && this.a > -PI / 2 ? 1 : -cos(this.a) / 4 + 0.75;
        console.log(this.a, rotationFactor);
        const vol = (10 / this.d) * rotationFactor;
        const pan = -cos(this.a);

        // Set volume and panning
        this.s.amp(vol, 1 / 60);
        this.s.pan(pan);

        // Beep
        if (this.playing && !this.hasPlayed) this.s.start();
        else if (!this.playing && this.hasPlayed) this.s.stop();
        this.hasPlayed = this.playing;
    }
}
