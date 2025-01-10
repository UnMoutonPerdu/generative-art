let x;
let y;
let r;
let g;
let b;

function setup() {
  createCanvas(900,500);
  background(50)
  x = width/2;
  y = height/2;

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
  for (let i = 0; i < 10000; i++) {
    x += random(-1,1);
    y += random(-1,1);

    x = constrain(x, 0, width);
    y = constrain(y, 0, height)
    
    r += random(-1,1);
    g += random(-1,1);
    b += random(-1,1);

    r = constrain(r, 0, 255);
    g = constrain(g, 0, 255);
    b = constrain(b, 0, 255);

    stroke(r, g, b);
    point(x, y);
  }
}
