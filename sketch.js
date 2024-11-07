let airQualityData;

function preload() {
  // Load the dataset; update with the correct path or URL if needed.
  airQualityData = loadTable("Beijing_Air_Quality.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  background(255);
}

function draw() {
  // Extract data points for visualization
  let pmValues = airQualityData.getColumn("PM2.5");
  let tempValues = airQualityData.getColumn("Temperature");

  // Normalize data for scaling
  let pmMax = max(pmValues);
  let tempMax = max(tempValues);

  for (let i = 0; i < pmValues.length; i++) {
    // Map data values to screen coordinates or other visual properties
    let pmMapped = map(pmValues[i], 0, pmMax, 0, width);
    let tempMapped = map(tempValues[i], 0, tempMax, 0, height);

    // Color mapping based on temperature
    let colorVal = map(tempValues[i], 0, tempMax, 100, 255);

    fill(colorVal, 50, 255 - colorVal, 150);
    noStroke();

    // Draw circles to represent PM levels, sized by PM value
    ellipse(pmMapped, tempMapped, map(pmValues[i], 0, pmMax, 5, 25));
  }
}
