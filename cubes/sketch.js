function setup() {
  createCanvas(800, 800, WEBGL);
  stroke(107, 252, 3);
  strokeWeight(5);
  noFill();
}

function draw() {
  background(25);

  push();
  rotate(0.01*frameCount,[1,1,1]);
  box(50, 50);
  pop();

  push();
  rotate(0.01*frameCount,[-1,-1,0]);
  box(150, 150);
  pop();

  push();
  rotate(0.01*frameCount,[-1,0,1]);
  box(250, 250);
  pop();
}
