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

    // Add sound at [500, 500]
    sounds.push(new Thing(500, 500));
}

/* ======== GAME LOOP ======== */
function draw() {
    background(0);

    // Movement
    if (keys.w) p.move(Math.cos(p.a) * step, -Math.sin(p.a) * step, 0);
    if (keys.s) p.move(-Math.cos(p.a) * step, Math.sin(p.a) * step, 0);
    if (keys.a) p.a -= PI / 64;
    if (keys.d) p.a += PI / 64;

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
    if (key == " ") {  // Toggle sound with space
        if (mute) sounds.forEach(s => s.s.stop());
        else sounds.forEach(s => s.s.start());
        mute = !mute;
    }
    else keys[key] = true; // else pass on to keys
}

function keyReleased() { keys[key] = false; }
