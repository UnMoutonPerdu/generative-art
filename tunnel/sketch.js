let s;
let c = 0;
let r = 0.6;
let gc = 4;
let scope = 1;

function setup() {
  createCanvas(500, 500);
  //background(237, 205, 164);
  background(224, 196, 175);
  background(random(200, 225),random(170,190),random(140,170));
  //background(255);
  noFill();
}

function draw() {
  for (let px = 20; px < width/2-10; px+=3) {
    stroke(c);
    quasiSquareGrad(px, scope*px, width-2*px);
    //diag(px, scope*px, width-2*px);
    c += gc;
  }
  noLoop();
}

function quasiSquareGrad(x, y, length) {
  if (random() > r) {
    s = random(0, 2);
    strokeWeight(s);

    line(x, y, x+length, y);
  }
  if (random() > r) {
    s = random(0, 2);
    strokeWeight(s);

    line(x, y, x, y+length);
  }
  if (random() > r) {
    s = random(0, 2);
    strokeWeight(s);

    line(x+length, y, x+length, y+length);
  }
  if (random() > r) {
    s = random(0, 2);
    strokeWeight(s);

    line(x, y+length, x+length, y+length);
  }
}

function diag(x, y, length) {
  if (random() > r) {
    line(x, y, x+3, y+scope*3);
  }
  if (random() > r) {
    line(x+length, y+length, x+length-3, y+length-(2-scope)*3);
  }
  if (random() > r) {
    line(x+length, y, x+length-3, y+scope*3);
  }
  if (random() > r) {
    line(x, y+length, x+3, y+length-(2-scope)*3);
  }
}
