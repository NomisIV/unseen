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

/* ======== GLOBAL FUNCTIONS ======== */
function restrictAngle(a) {
    if (a < -PI) a += 2 * PI;
    if (a > PI) a -= 2 * PI;
    return a;
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

            // Movement
            if (keys.w || keys.ArrowUp)
                p.move(Math.sin(p.a) * step, Math.cos(p.a) * step, 0);
            if (keys.s || keys.ArrowDown)
                p.move(-Math.sin(p.a) * step, -Math.cos(p.a) * step, 0);
            if (keys.a || keys.ArrowLeft) p.a -= PI / 64;
            if (keys.d || keys.ArrowRight) p.a += PI / 64;
            p.a = restrictAngle(p.a);
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
}

/* ======== KEYBOARD INPUT ======== */
function keyPressed() {
    // Toggle sound with space
    if (key == " ") {
        if (mute) sounds.forEach(s => s.s.stop());
        mute = !mute;
    }
    // else pass on to keys
    else keys[key] = true;
    console.log(key);
}

function keyReleased() {
    keys[key] = false;
}

/* ======== WINDOW RESIZE ======== */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
