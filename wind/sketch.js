// Canvas configuration
let WIDTH = 800;
let HEIGHT = 600;

// Particles configuration 
let particles = [];
let numberParticles = 1000;

// Perlin noise configuration
let numberPI = 6;
let noiseScaleX = 0.0006;
let noiseScaleY = 0.0008;

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  let sizeX = (windowWidth-width)/2;
  let sizeY = (windowHeight-height)/2;
  cnv.position(sizeX, sizeY);
  for (let i = 0; i < numberParticles; i++) {
    particles[i] = createVector(random(width), random(height));
  }
}

function draw() {
  background(0, 5);
  strokeWeight(5);
  stroke(255);

  for (let i = 0; i < numberParticles; i++) {
    let f1 = 0.01*frameCount;
    let f2 = 0.015*frameCount;
    // let v = createVector(cos(f1), sin(f2));
    let theta = noise(noiseScaleX*particles[i].x, noiseScaleY*particles[i].y)*numberPI*PI;
    let v = createVector(cos(theta), sin(theta));
    particles[i].add(v);
    point(particles[i]);
  }
}
