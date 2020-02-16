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
        rect(this.x, height - this.y, 20, 20);

        if (debug) {
            // Draw line from player to sound source
            line(this.x, height - this.y, p.x, height - p.y);

            // Draw panning of the sound on player
            translate(p.x, height - p.y);
            rotate(p.a);
            stroke(255, 0, 0);
            line(0, 0, -sin(this.a) * 20, 0);
            rotate(-p.a);
            translate(-p.x, p.y - height);
            stroke(255);
        }
    }

    play() {
        // Update angle and distance
        this.d = sqrt(pow(p.x - this.x, 2) + pow(p.y - this.y, 2));
        this.a = p.a + (Math.atan2(this.y - p.y, this.x - p.x) - PI / 2);
        this.a = restrictAngle(this.a);

        // Calculate volume and panning from angle and distance
        // Decrease volume behind the player using rotationFactor
        const rotationFactor =
            this.a < PI / 2 && this.a > -PI / 2
                ? 1
                : -cos(2 * this.a) / 4 + 0.75;
        console.log(this.a, rotationFactor);
        const vol = (1 - this.d / 500) * rotationFactor;
        const pan = -sin(this.a);

        // Set volume and panning
        this.s.amp(vol, 1 / 60);
        this.s.pan(pan);

        // Beep
        // Start sound if it should play, but haven't yet started and isnt muted
        if (this.playing && !this.hasPlayed && !mute) this.s.start();
        // stop sound if it should not play, but haven't yet stopped
        else if (!this.playing && this.hasPlayed) this.s.stop();
        this.hasPlayed = this.playing;
    }
}
