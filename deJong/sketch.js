// de Jong Attractors 
// xn+1 = sin(a*yn) - cos(b*xn)
// yn+1 = sin(c*xn) - cos(d*yn)
let x = 0;
let y = 0;
let a = 1.641;
let b = 1.902;
let c = 0.316; 
let d = 1.525;
let scaleFactor = 200;

// Colors settings
let red;
let green;
let blue;
let baseHue;

// Canvas configuration
let WIDTH = 850;
let HEIGHT = 850;
let textDisplay = true;

let niceShapes = [
[-2.430208197055763, -0.1412899183132339, -3.777287976692114, 2.0557980475025275],
[8.44429121184001, 1.0797997890047206, -3.730966926025337, 8.289829516752008],
[-3.0882656648508267, -6.152900514058219, -3.20685774566358, 3.267318267214174],
[-0.6248992815658743, -1.5396267542386717, 1.2372708202073945, -0.9018103234879042]];

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  let sizeX = (windowWidth-width)/2;
  let sizeY = (windowHeight-height)/2;
  cnv.position(sizeX, sizeY);
  background(0);
  colorMode(HSB, 360, 100, 100, 1);
  a = random(-2,2); b = random(-2,2); c = random(-2,2); d = random(-2,2);
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
  baseHue = random(300);
}

function draw() {
  push();
  fill(baseHue, 0, 100, 0.5);
  strokeWeight(0.05);
  textSize(10);
  text(a, 50, height-15, width/4-40)
  text(b, width/4+50, height-15, width/4-40)
  text(c, width/2+50, height-15, width/4-40)
  text(d, 3*width/4+50, height-15, width/4-40)
  pop();
  // a = random(2); b = random(2); c = random(2); d = random(2);
  // a = random(-3,3); b = random(-3,3); c = random(-3,3); d = random(-3,3);
  // a = 1.4; b = -2.3; c = 2.4; d = -2.1;
  // a = -0.827; b = -1.637; c = 1.659; d = -0.943;
  baseHue = (baseHue + 180) % 360; 
  // stroke(baseHue, 80, 85, 0.5);
  stroke(baseHue, 0, 100, 0.7);
  translate(width/2, height/2);
  for (let i = 0; i < 1000; i++) {
    point(scaleFactor*x, scaleFactor*y);
    let temp = x;
    x = sin(a*y) - cos(b*x);
    y = sin(c*temp) - cos(d*y);
  }
}
