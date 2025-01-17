let tilt = 10;
let noise = 0.9;

function setup() {
  cnv = createCanvas(600, 600);
  let sizeX = (windowWidth-width)/2;
  let sizeY = (windowHeight-height)/2;
  cnv.position(sizeX, sizeY);
  angleMode(DEGREES);
  background(220);
  //noFill();
  noStroke();
  drawingContext.shadowBlur = 35;
  drawingContext.shadowColor = color('gray');
  drawingContext.shadowOffsetX = -5
  drawingContext.shadowOffsetY = 5
}

function draw() {
  for (let i = 100; i < width-100; i+=50){
    for (let j = 100; j < height-100; j+=50) {
      push();
      translate(i+25,j+25);
      rotate(random(-tilt,tilt));
      let r = random();
      // if (r < 0.33) {
      //   fill('red');
      // } else if (r < 0.66) {
      //   fill('white');
      // } else {
      //   fill('black');
      // }
      // if (r < 0.33) {
      //   fill('black');
      //   noStroke();
      // } else {
      //   fill('white');
      //   stroke('black')
      // }
      //fill(color(random(0,255), random(0,255), random(0,255)));
      fill(color(random(0,255)));

      //drawingContext.shadowOffsetX = random(-10, 10);
      //drawingContext.shadowOffsetY = random(-10, 10);

      quad(-25*random(1-noise,1+noise),-25*random(1-noise,1+noise),-25*random(1-noise,1+noise),25*random(1-noise,1+noise),25*random(1-noise,1+noise),25*random(1-noise,1+noise),25*random(1-noise,1+noise),-25*random(1-noise,1+noise));
      pop();
    }
  }
  noLoop();
}
