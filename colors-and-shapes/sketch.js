let x, y, lengthX, lengthY;
let numberTriangles = 0;
let numberMaxTriangles = 300;

function setup() {
  createCanvas(800, 600);
  //background(177, 118, 219);
  background(random(0,255));
}

function draw() {
  if (numberTriangles < numberMaxTriangles) {
    x = random(-30, width+30);
    y = random(-30, height+30);
    lengthX = random(35, 70);
    lengthY = random(35, 70);
    numberTriangles += 1;
    noStroke();

    //fill(214, 192, 26, random(35, 200));
    fill(random(0,255),random(0,255),random(0,255),random(35,200));
    push();
    translate(x, y);
    rotate(random(0,360));
    triangle(0,0,lengthX,lengthY/2, lengthX, -lengthY)
    pop();
  }
}
