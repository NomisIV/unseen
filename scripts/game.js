const keys = {};
let p;
let o;
const step = 3;

function setup() {
    createCanvas(windowWidth, windowHeight);
    p = new Player(50, 50, 0);
    o = new Thing(500, 500);
    stroke(255);
}


function draw() {
    background(0);

    // Movement
    if (keys.w) p.move(Math.cos(p.a) * step, -Math.sin(p.a) * step, 0);
    if (keys.s) p.move(-Math.cos(p.a) * step, Math.sin(p.a) * step, 0);
    if (keys.a) p.a -= PI / 64;
    if (keys.d) p.a += PI / 64;
    if (keys[" "]) o.s.stop();

    p.draw();
    o.draw();

    const d = sqrt(pow(p.x - o.x, 2) + pow(p.y - o.y, 2));
    const a = Math.atan((p.y - o.y) / (p.x - o.x));

    // Line from player position to the object, using d and a
    line(p.x, p.y, cos(a) * d + p.x, sin(a) * d + p.y);

    // Draw balance
    translate(p.x, p.y);
    rotate(p.a);
    stroke(255, 0, 0);
    line(0, 0, cos(p.a - a) * 20, 0);
    rotate(-p.a);
    translate(-p.x, -p.y);
    stroke(255);

    o.play(10 / d, -cos(p.a - a));

    if (frameCount % 30 == 0 && !keys[" "]) {
        o.s.start();
    } else if (frameCount % 30 == 15) {
        o.s.stop();
    }
}

function keyPressed() { keys[key] = true; }
function keyReleased() { keys[key] = false; }