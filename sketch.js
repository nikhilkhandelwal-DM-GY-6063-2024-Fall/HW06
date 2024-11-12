let table;
let maxSeverity = 0;
let rotationAngle = -0.2; // Adjust angle for rotation if needed
let nycMap;

function preload() {
  // Load the data and the NYC map image
  table = loadTable('crashes.csv', 'csv', 'header');
  nycMap = loadImage('nyc_map.png'); // Replace with the actual path to your NYC map image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Calculate the maximum severity to normalize circle sizes
  for (let i = 0; i < table.getRowCount(); i++) {
    let personsInjured = table.getNum(i, 'PERSONS_INJURED');
    let personsKilled = table.getNum(i, 'PERSONS_KILLED');
    let severity = personsInjured + personsKilled;
    if (severity > maxSeverity) {
      maxSeverity = severity;
    }
  }

  noLoop();
}

function draw() {
  background(255);

  // Display the NYC map as the background
  image(nycMap, 0, 0, width, height);

  // Translate to the center of the canvas for rotation
  translate(width / 2, height / 2);
  rotate(rotationAngle);

  // Iterate through each row in the table
  for (let i = 0; i < table.getRowCount(); i++) {
    let latitude = table.getNum(i, 'LATITUDE');
    let longitude = table.getNum(i, 'LONGITUDE');
    let personsInjured = table.getNum(i, 'PERSONS_INJURED');
    let personsKilled = table.getNum(i, 'PERSONS_KILLED');

    // Map latitude and longitude to canvas coordinates based on the map bounds
    // Adjust these bounds to fit your NYC map
    let x = map(longitude, -74.1, -73.7, -width / 2, width / 2); // Adjust for NYC longitude range
    let y = map(latitude, 40.5, 40.9, height / 2, -height / 2);    // Adjust for NYC latitude range

    // Calculate severity and map it to circle size and color intensity
    let severity = personsInjured + personsKilled;
    let size = map(severity, 0, maxSeverity, 2, 50); // Adjust max size as needed
    let col = color(255, 0, 0, map(severity, 0, maxSeverity, 50, 255)); // Adjust transparency

    // Draw the circle at the mapped position
    fill(col);
    noStroke();
    ellipse(x, y, size, size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
