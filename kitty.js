let birdPosition = -50; // Initial position of the bird (hidden)
let birdOut = false; // Whether the bird is out or not
let lastMinute = -1; // To track the last minute
let birdStartTime = 0; // Time when the bird started popping out
const birdDuration = 2000; // Duration for which the bird stays out (2 seconds)
let img, maskImg;

function setup() {
  createCanvas(500, 600);
  angleMode(DEGREES);
  
  // 创建一个图像缓冲区
  img = createGraphics(400, 400);
  
  // 绘制一个矩形（将要被减去部分）
  img.fill('#CC7E45');
  img.rect(-110 + width / 2, -130 + height / 2, 220, 140);

  // 创建遮罩图像
  maskImg = createGraphics(400, 400);
  maskImg.fill(0); // 设置为黑色以遮挡
  maskImg.rect(0, 0, 400, 400); // 先填满整个区域
  maskImg.fill(255); // 白色部分是保留区域
  
  // 绘制要减去的拱门
  maskImg.rect(-25 + width / 2, -160 + height / 2, 50, 60, 23, 23);

  // 应用蒙版效果
  img.mask(maskImg);
  
  // 不在 setup 中显示图像，而是在 draw 中显示
}

function draw() {
  background(111); // 棕色背景
  
  // 显示 setup 中创建的图像
  image(img, 0, 0);  // 这将显示应用了蒙版的内容
  
  // 其他静态部分绘制
  translate(width / 2, height / 2);
  fill('#CC7E45');
  rect(-110, -130, 220, 140);
  fill('#E8DBD2');
  rect(-110, -60, 220, 150);
  
  // 动态部分：时钟、鸟动画等
  drawClockFace(); // 时钟绘制函数
  animateBird();   // 鸟的动画逻辑
}

function drawClockFace() {
  // 这里绘制钟表的表盘和指针
  strokeWeight(3);
  fill('#CFBDAE');
  ellipse(0, -30, 180); // Main clock face
  fill('#EDDBBD');
  ellipse(0, -30, 160); // Main clock face
  fill(0);
  textAlign(CENTER, CENTER);
  strokeWeight(2);

  const romanNumerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  // Draw numbers on the clock face
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

  // Hour, minute, and second hands logic
}

function animateBird() {
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
    birdPosition = lerp(birdPosition, -40, 0.1);
  }

  // Draw the bird at the calculated position
  drawBird(birdPosition - 140);
}

function drawBird(y) {
  push(); // Save the current drawing state
  translate(0, y); // Move to the bird's position

  // Draw the bird (body, wings, head, etc.)
  noStroke();
  fill(255, 200, 0);
  ellipse(0, 5, 30, 20); // Body
  ellipse(0, -5, 20, 20); // Head

  // Eyes, wings, and other bird features
  pop();
}
