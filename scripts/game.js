/* ======== CONSTANTS ======== */
const debug = true;
const step = 3; // Visual movement speed

/* ======== GAME OBJECTS ======== */
const keys = {};
const sounds = [];
const p = new Player(50, 50, 0);

/* ======== RUNTIME VARIABLES ======== */
let mute = false;

/* ======== SETUP ======== */
function setup() {
    createCanvas(windowWidth, windowHeight); // Create a canvas the size of the window
    stroke(255);
    rectMode(CENTER);

    // Add sound at [500, 500] with frequency 200Hz with 500ms beeps.
    sounds.push(new Thing(500, 500, 200, 500));
}

/* ======== GAME LOOP ======== */
function draw() {
    background(0);

    // Movement
    if (keys.w) p.move(-Math.sin(p.a) * step, Math.cos(p.a) * step, 0);
    if (keys.s) p.move(Math.sin(p.a) * step, -Math.cos(p.a) * step, 0);
    if (keys.a) p.a -= PI / 64;
    if (keys.d) p.a += PI / 64;
    // p.a = ((p.a + PI) % 2) - PI;

    // Draw objects
    p.draw();

    // Play sounds
    sounds.forEach(s => {
        s.draw();
        s.play();
    });
}

/* ======== KEYBOARD INPUT ======== */
function keyPressed() {
    // Toggle sound with space
    if (key == " ") {
        if (mute) sounds.forEach(s => s.s.stop());
        else sounds.forEach(s => s.s.start());
        mute = !mute;
    }
    // else pass on to keys
    else keys[key] = true;
}

function keyReleased() {
    keys[key] = false;
}

/* ======== WINDOW RESIZE ======== */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
