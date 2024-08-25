const birdDuration = 2000; 

let birdPosition = 40; 
let birdOut = false; 
let lastMinute = -1; 
let birdStartTime = 0; 
let pendulumAngle = 0;

function setup() {
  createCanvas(500, 600);
  angleMode(DEGREES);
}

/**
 * The main draw loop for rendering the scene.
 * Handles the drawing of the clock, pendulum, bird, and background.
 */
function draw() {
  background('#C9BEB5');
  noStroke();
  translate(width / 2, height / 2 - 20);

  // Calculate weight offset based on frame count to simulate swinging
  let weightOffset = sin(frameCount * (360 / 240)) * 30;

  // Draw the pendulum's support strings and weights
  stroke('#805C22');
  strokeWeight(4);
  line(-50, 30, -50, 180 + weightOffset);
  line(50, 30, 50, 180 - weightOffset);

  // Draw pendulum weights
  noStroke();
  fill('#C36738');
  ellipse(-50, 210 + weightOffset, 30, 100);
  ellipse(50, 210 - weightOffset, 30, 100);

  // Draw the clock house
  fill("#CC7E45");
  rect(-110, -130, 220, 140);
  fill("#E8DBD2");
  rect(-110, -60, 220, 150);
  fill("#CFC9C4");
  rect(-110, -30, 220, 10);
  rect(-110, 10, 220, 10);
  rect(-110, 50, 220, 10);

  // Draw the roof
  fill("#CC7E45");
  triangle(-110, -130, 110, -130, 0, -210);

  // Draw the clock face background
  noStroke();
  fill("#28211D");
  rect(-25, -160, 50, 60, 23, 23);

  // Handle the yellow bird's movement based on the current time
  let currentMinute = minute();
  if (currentMinute !== lastMinute) {
    birdOut = true;
    birdStartTime = millis();
    lastMinute = currentMinute;
  }

  // Update bird position based on its state (in or out)
  if (birdOut) {
    birdPosition = lerp(birdPosition, 0, 0.1);
    if (millis() - birdStartTime >= birdDuration) {
      birdOut = false;
    }
  } else {
    birdPosition = lerp(birdPosition, 40, 0.1);
  }

  // Draw the bird and other elements
  drawBird(birdPosition - 135);
  drawGradient(0, -30, 160);
  pendulumAngle = sin(frameCount * (360 / 240)) * 30;
  drawPendulum(0, 110, pendulumAngle);

  // Draw the clock base and trees
  noStroke();
  fill("#672500");
  quad(-90, 110, -70, 130, 70, 130, 90, 110);
  fill("#8B420E");
  quad(-135, 80, -110, 110, 110, 110, 135, 80);
  noStroke();
  fill("#1C7F34");
  triangle(80, 20, 60, 40, 100, 40);
  triangle(80, 35, 55, 58, 105, 58);
  triangle(80, 45, 50, 80, 110, 80);
  fill("#145B25");
  triangle(100, 10, 85, 40, 115, 40);
  triangle(100, 30, 80, 60, 120, 60);
  triangle(100, 47, 75, 80, 125, 80);
}

/**
 * Draws a pendulum at the specified position with a given angle.
 *
 * The x-coordinate of the pendulum's pivot.
 * The y-coordinate of the pendulum's pivot.
 * The angle of the pendulum's swing.
 */
function drawPendulum(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);

  stroke('#805C22');
  strokeWeight(4);
  line(0, 0, 0, 100);

  noStroke();
  fill('#AE8D55');
  ellipse(0, 100, 50, 50);
  fill('#CFAE76');
  ellipse(0, 100, 40, 40);
  pop();
}

/**
 * Draws a gradient circle as the clock face.
 *
 * The x, y-coordinate of the circle's center.
 * The diameter of the gradient circle.
 */
function drawGradient(x, y, diameter) {
  let innerColor = color('#F0DCBB');
  let outerColor = color('#E6BE85');

  noStroke();
  fill("#CC7E45");
  triangle(-65, -160, 65, -160, 0, -210);
  fill("#8B420E");
  quad(-130, -70, -150, -100, 0, -230, 0, -190);
  quad(130, -70, 150, -100, 0, -230, 0, -190);
  strokeWeight(3);
  fill("#CFBDAE");
  ellipse(0, -30, 180);
  fill("#EDDBBD");
  ellipse(0, -30, 160);

  for (let r = diameter; r > 0; r -= 1) {
    let inter = map(r, 0, diameter, 0, 1);
    let c = lerpColor(innerColor, outerColor, inter);
    fill(c);
    noStroke();
    ellipse(x, y, r, r);
  }
  noStroke();

  fill(0);
  textAlign(CENTER, CENTER);
  strokeWeight(2);

  const romanNumerals = [
    "XII",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
  ];
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, 360) - 90;
    let x = cos(angle) * 70;
    let y = sin(angle) * 70 - 30;
    push();
    translate(x, y);
    rotate(i * 30);
    textAlign(CENTER, CENTER);
    text(romanNumerals[i], 0, 0);
    pop();
  }

  let hr = hour() % 12;
  let mn = minute();
  let sc = second();

  let hourAngle = map(hr + mn / 60, 0, 12, 0, 360) - 90;
  let minuteAngle = map(mn, 0, 60, 0, 360) - 90;
  let secondAngle = map(sc, 0, 60, 0, 360) - 90;

  strokeWeight(5);
  stroke('#D2632A');
  line(0, -30, cos(hourAngle) * 40, sin(hourAngle) * 40 - 30);
  stroke(0);
  strokeWeight(3);
  line(0, -30, cos(minuteAngle) * 60, sin(minuteAngle) * 60 - 30);
  strokeWeight(2);
  line(0, -30, cos(secondAngle) * 70, sin(secondAngle) * 70 - 30);
}

/**
 * Draws the yellow bird in the clock.
 *
 The y-coordinate of the bird's position.
 */
function drawBird(y) {
  push();
  translate(0, y);

  noStroke();
  fill(255, 200, 0);
  ellipse(0, 5, 30, 20);  // Body

  fill(255, 200, 0);
  ellipse(0, -5, 20, 20);  // Head

  fill(0);
  ellipse(-7, -8, 3, 3);  // Left eye
  ellipse(7, -8, 3, 3);   // Right eye

  fill(255, 100, 0);
  triangle(0, -10, -5, -5, 5, -5);  // Beak

  fill(255, 180, 0);
  ellipse(-15, 0, 10, 8);  // Left wing
  ellipse(15, 0, 10, 8);   // Right wing

  pop();
  noStroke();
  swingingBirdAngle = sin(frameCount * (360 / 180)) * 30;

  drawSwingingBird(-90, 50, swingingBirdAngle);
}

/**
 * Draws a swinging bird at the specified position with a given angle.
 *
 * The x, y-coordinate of the bird's pivot.
 * The angle of the bird's swing.
 */
function drawSwingingBird(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);

  fill("#87CEEB");
  arc(0, 0, 50, 60, 0, 180);
  circle(12.5, 0, 25);

  fill("yellow");
  ellipse(14, -3, 10, 10);
  fill(0, 0, 0);
  ellipse(14, -3, 6, 6);
  line(50, 60, 70, 70);

  fill(255, 165, 0);
  triangle(35, 0, 22, 5, 22, -9);
  pop();
}
