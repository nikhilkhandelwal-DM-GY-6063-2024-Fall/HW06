let data = [];

function preload() {
  table = loadTable('/Users/nikhilkhandelwal/Downloads/Motor_Vehicle_Collisions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);

  // Extracting necessary columns from the dataset
  let boroughs = table.getColumn('BOROUGH');
  let injuries = table.getColumn('NUMBER OF PERSONS INJURED');
  
  // Convert injuries to numbers
  injuries = injuries.map(x => parseInt(x) || 0);

  // Visualize the data
  noStroke();
  let boroughColors = {
    'MANHATTAN': color(255, 0, 0, 150),
    'BROOKLYN': color(0, 255, 0, 150),
    'QUEENS': color(0, 0, 255, 150),
    'BRONX': color(255, 255, 0, 150),
    'STATEN ISLAND': color(255, 0, 255, 150),
    '': color(200, 200, 200, 50)  // Unknown/No data
  };

  // Display circles based on data
  for (let i = 0; i < boroughs.length; i++) {
    let x = random(width);
    let y = random(height);
    let size = map(injuries[i], 0, max(injuries), 5, 50);

    fill(boroughColors[boroughs[i]]);
    ellipse(x, y, size, size);
  }
}

function draw() {
  // Visualization is static; no need for continuous drawing
}
