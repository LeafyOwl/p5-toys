let birdPosition = 40; // Initial position of the bird (hidden)
let birdOut = false; // Whether the bird is out or not
let lastMinute = -1; // To track the last minute
let birdStartTime = 0; // Time when the bird started popping out
const birdDuration = 2000; // Duration for which the bird stays out (2 seconds)
const swingDuration = 3000; // Duration of one complete swing cycle (4 seconds)
let pendulumAngle = 0; // Angle for the pendulum
let pendulumSpeed = 90; // Swing speed (90 degrees per second)

function setup() {
  createCanvas(500, 600);
  angleMode(DEGREES);
}

function draw() {
  background('#C9BEB5'); // Brown background like wood for the cuckoo clock
  noStroke();
  translate(width / 2, height / 2 - 20);

  let weightOffset = sin(frameCount * (360 / 240)) * 30; // Swing vertically in opposite directions
  stroke('#805C22');
  strokeWeight(4);
  line(-50, 30, -50, 180 + weightOffset);
  line(50, 30, 50, 180 - weightOffset);
  noStroke();
  fill('#C36738');
  ellipse(-50, 210 + weightOffset, 30, 100); // Left weight moving up and down
  ellipse(50, 210 - weightOffset, 30, 100); // Right weight moving oppositely
  fill("#CC7E45");
  rect(-110, -130, 220, 140);
  fill("#E8DBD2");
  rect(-110, -60, 220, 150);
  fill("#CFC9C4");
  rect(-110, -30, 220, 10);
  rect(-110, 10, 220, 10);
  rect(-110, 50, 220, 10);
  fill("#CC7E45");
  triangle(-110, -130, 110, -130, 0, -210);

  noStroke();
  fill("#28211D");
  rect(-25, -160, 50, 60, 23, 23); // Cuckoo door

  // Bird logic
  let currentMinute = minute();
  if (currentMinute !== lastMinute) {
    birdOut = true; // Bird pops out at the start of each minute
    birdStartTime = millis(); // Record the time when the bird started popping out
    lastMinute = currentMinute;
  }

  // Animate bird
  if (birdOut) {
    // Move bird out
    birdPosition = lerp(birdPosition, 0, 0.1);
    if (millis() - birdStartTime >= birdDuration) {
      birdOut = false; // Stop the bird animation after the duration
    }
  } else {
    // Move bird back in
    birdPosition = lerp(birdPosition, 40, 0.1);
  }

  // Draw the detailed bird

  drawBird(birdPosition - 135);
  drawGradient(0, -30, 160);
  pendulumAngle = sin(frameCount * (360 / 240)) * 30; // Swing back and forth with 4 seconds per full cycle
  drawPendulum(0, 110, pendulumAngle); // Draw the pendulum under the clock

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

function drawPendulum(x, y, angle) {
  push();
  translate(x, y); // Move to pendulum's position
  rotate(angle); // Rotate for the swinging motion

  stroke('#805C22');
  strokeWeight(4);
  line(0, 0, 0, 100); // Pendulum rod

  noStroke();
  fill('#AE8D55');
  ellipse(0, 100, 50, 50); // Pendulum bob
  fill('#CFAE76');
  ellipse(0, 100, 40, 40); // Pendulum bob
  pop();
}

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
  ellipse(0, -30, 180); // Main clock face
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
  stroke('#D2632A')
  line(0, -30, cos(hourAngle) * 40, sin(hourAngle) * 40 - 30); // Hour hand
  stroke(0);
  strokeWeight(3);
  line(0, -30, cos(minuteAngle) * 60, sin(minuteAngle) * 60 - 30); // Minute hand
  strokeWeight(2);
  line(0, -30, cos(secondAngle) * 70, sin(secondAngle) * 70 - 30); // Second hand


  pop();
}

function drawBird(y) {
  push(); // Save the current drawing state
  translate(0, y); // Move to the bird's position

  // Body
  noStroke();
  fill(255, 200, 0);
  ellipse(0, 5, 30, 20);

  // head
  fill(255, 200, 0); // 
  ellipse(0, -5, 20, 20);

  // eye
  fill(0);
  ellipse(-7, -8, 3, 3);
  ellipse(7, -8, 3, 3);

  // beak
  fill(255, 100, 0);
  triangle(0, -10, -5, -5, 5, -5);

  // wings
  fill(255, 180, 0);
  ellipse(-15, 0, 10, 8);
  ellipse(15, 0, 10, 8);

  pop(); // Restore the previous drawing state
  noStroke();
  swingingBirdAngle = sin(frameCount * (360 / 180)) * 30; // Swing back and forth over 4 seconds

  drawSwingingBird(-90, 50, swingingBirdAngle); // New bird at bottom-left
}

function drawSwingingBird(x, y, angle) {
  push();
  translate(x, y); // Move to bird's position
  rotate(angle);

  // Draw the blue bird
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
