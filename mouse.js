let z = 0;
let x = 0;
let y = 0;

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(220);
  push();
  let h = hour();
  let m = minute();
  let s = second();

  text(h, 100, 100);
  text(m, 130, 100);
  text(s, 160, 100);
  pop();

  rect(200, 200, 100, 20);
  push();
  fill('green');
  rect(200, 300, 100, 20);
  pop();

  circle(z, 50, 50);

  z += 25;
  if (z > width) {
    z = 0;
    //noLoop();
  }

  
  const r = 5;
  let x_new = (mouseX - width / 2);
  let y_new = (mouseY - height / 2);
  const r_new = Math.sqrt(x_new * x_new + y_new * y_new);
  if (r_new > r) {
    x = (mouseX - width / 2) * r / r_new + width / 2;
    y = (mouseY - height / 2) * r / r_new + height / 2;
  } else {
    x = mouseX;
    y = mouseY;
  }

  circle(x, y, 30);
  circle(x, y, 10);
}

function doubleClicked() {
  loop();
}