// Setup Canvas and Variables
let rings = [];
let numRings = 50;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Generate rings with random properties
    for (let i = 0; i < numRings; i++) {
        rings.push({
            x: random(width),
            y: random(height),
            size: random(20, 100),
            growthRate: random(0.2, 1.5),
            color: color(random(100, 255), random(100, 255), random(50, 200), 150)
        });
    }
}

function draw() {
    background(20, 30, 50, 50);  // Dark background to reflect Gatsby’s themes
    
    // Display rings growing over time
    for (let ring of rings) {
        fill(ring.color);
        noStroke();
        ellipse(ring.x, ring.y, ring.size);
        ring.size += ring.growthRate;

        // Reset ring size when it grows too large
        if (ring.size > max(width, height) / 2) {
            ring.size = random(20, 100);
            ring.x = random(width);
            ring.y = random(height);
        }
    }

    // Interactive Element: Show a “light” moving with mouse
    fill(255, 223, 0, 150);
    noStroke();
    ellipse(mouseX, mouseY, 50);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
