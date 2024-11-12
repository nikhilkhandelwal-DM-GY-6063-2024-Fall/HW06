let table;
let boroughColors;
let circles = [];

function preload() {
  table = loadTable('./crashes.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  boroughColors = {
    "MANHATTAN": color(255, 99, 71, 150),
    "QUEENS": color(135, 206, 250, 150),
    "BROOKLYN": color(60, 179, 113, 150),
    "BRONX": color(255, 215, 0, 150),
    "STATEN ISLAND": color(218, 112, 214, 150)
  };
  
  //Create circles
  for (let r = 0; r < table.getRowCount(); r++) {
    let borough = table.getString(r, 'BOROUGH');
    let lat = table.getNum(r, 'LATITUDE');
    let long = table.getNum(r, 'LONGITUDE');
    let injuries = table.getNum(r, 'PERSONS_INJURED');
    let fatalities = table.getNum(r, 'PERSONS_KILLED');
    let severity = injuries + fatalities;
    
    if (!borough || isNaN(lat) || isNaN(long)) continue;

    // Map latitude and longitude to screen coordinates
    let x = map(long, -74.1, -73.7, 50, width - 50);
    let y = map(lat, 40.5, 40.9, height - 50, 50);
    
    let circleSize = map(severity, 0, 10, 3, 30);
    circles.push(new CrashCircle(x, y, circleSize, boroughColors[borough], borough, injuries, fatalities, severity));
  }
}

function draw() {
  background(255, 255, 255);

  textAlign(LEFT);
  textSize(24);
  fill(50);
  text("NYC Motor Vehicle Collisions by Borough", 60, 40);
  textSize(14);
  fill(100);
  text("Circle size represents crash severity (Injuries + Fatalities)", 60, 65);

  textSize(12);
  fill(50);
  text("Data points represent locations of motor vehicle collisions", 60, 90);
  text("Hover over points to view details", 60, 110);

  displayLegend();

  for (let c of circles) {
    c.display();
  }

  for (let c of circles) {
    c.checkHover();
  }
}

// Function to display a compact legend
function displayLegend() {
  textSize(12);
  textAlign(LEFT);
  let legendX = width - 160;
  let legendY = height - 120;
  fill(50);
  text("Borough Legend:", legendX, legendY - 10);
  
  for (const [borough, color] of Object.entries(boroughColors)) {
    fill(color);
    noStroke();
    ellipse(legendX + 10, legendY, 10, 10);
    fill(50);
    noStroke();
    text(borough, legendX + 30, legendY + 5);
    legendY += 20;
  }
}

// CrashCircle class with borders and improved tooltip on hover
class CrashCircle {
  constructor(x, y, size, color, borough, injuries, fatalities, severity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.borough = borough;
    this.injuries = injuries;
    this.fatalities = fatalities;
    this.severity = severity;
  }

  display() {
    stroke(255, 200);
    strokeWeight(0.5);
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  checkHover() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.size / 2) {
      fill(255);
      stroke(0);
      strokeWeight(1);
      rect(mouseX + 15, mouseY - 5, 150, 70, 5);
      fill(0);
      noStroke();
      textSize(12);
      text(`Borough: ${this.borough}`, mouseX + 20, mouseY + 10);
      text(`Injuries: ${this.injuries}`, mouseX + 20, mouseY + 25);
      text(`Fatalities: ${this.fatalities}`, mouseX + 20, mouseY + 40);
      text(`Severity: ${this.severity}`, mouseX + 20, mouseY + 55);
    }
  }
}
