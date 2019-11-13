/* ======== CONSTANTS ======== */
const debug = true;
const step = 3; // Visual movement speed
const screens = ["start", "game"];

/* ======== GAME OBJECTS ======== */
const keys = {};
const sounds = [];

let title, start, p;

/* ======== GAME FUNCTIONS ======== */
function showScreen(s) {
    screen = s;
    for (const screen of screens) {
        console.log(screen);
        if (screen == s) {
            document.getElementById(screen).style.display = "flex";
            document.getElementById(screen).style.opacity = 1;
        } else {
            document.getElementById(screen).style.display = "none";
            document.getElementById(screen).style.opacity = 0;
        }
    }
    setup();
}

/* ======== RUNTIME VARIABLES ======== */
let mute = false;
let screen = "start";
// if (debug) screen = "game";

/* ======== SETUP ======== */
function setup() {
    let c = createCanvas(windowWidth, windowHeight); // Create a canvas the size of the window
    c.parent("game");
    fill(255);
    stroke(255);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    // Init game objects
    switch (screen) {
    case "start":
        break;
    case "game":
        p = new Player(50, 50, 0);
        // Add sound at [500, 500] with frequency 200Hz with 500ms beeps.
        sounds.push(new Thing(500, 500, 200, 500));
        break;
    }
}

/* ======== GAME LOOP ======== */
function draw() {
    switch (screen) {
    case "start":
        background(255, 0, 0);

        break;
    case "game":
        background(0);
        // Game loop
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
        break;
    }
    // background(0);
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
