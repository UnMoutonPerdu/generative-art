let x;
let y;
let nextX;
let nextY;

let r;
let g;
let b;

let lineLength = 30;
let lineWeight = 5;

function setup() {
  createCanvas(900,500);
  background(50)
  x = random(width);
  y = random(height);

  r = random(0,255);
  g = random(0,255);
  b = random(0,255);

  // These buttons come from 'https://p5js.org/reference/p5/noLoop/'
  startButton = createButton('▶');
  startButton.position(0, 500);
  startButton.size(50, 20);
  stopButton = createButton('◾');
  stopButton.position(50, 500);
  stopButton.size(50, 20);

  startButton.mousePressed(loop);
  stopButton.mousePressed(noLoop);
}

function draw() {
  for (let i = 0; i < 10; i++) {
    nextX = x + random(-lineLength,lineLength);
    nextY = y + random(-lineLength,lineLength);

    nextX = constrain(nextX, 0, width);
    nextY = constrain(nextY, 0, height)
    
    r += random(-10,10);
    g += random(-10,10);
    b += random(-10,10);

    r = constrain(r, 0, 255);
    g = constrain(g, 0, 255);
    b = constrain(b, 0, 255);

    stroke(r, g, b);
    strokeWeight(lineWeight);
    line(x, y, nextX, nextY);

    x = nextX;
    y = nextY;
  }
}
