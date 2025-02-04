// Canvas configuration
let WIDTH = 800;
let HEIGHT = 600;

// Particles configuration 
let particles = [];
let numberParticles = 1000;
let speed = 3;
let lerpX = 0.35;
let lerpY = 0.35;
let epsilon = 0.07;

// Perlin noise configuration
let numberPI = 10;
let noiseScaleX = 0.0006;
let noiseScaleY = 0.0006;

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  let sizeX = (windowWidth-WIDTH)/2;
  let sizeY = (windowHeight-HEIGHT)/2;
  cnv.position(sizeX, sizeY);
  colorMode(HSB,360,100,100,100);
  for (let i = 0; i < numberParticles; i++) {
    particles[i] = new Particles();
  }
}

function draw() {
  background(0,0,0,5);

  for (let i = 0; i < numberParticles; i++) {
    particles[i].update();
    particles[i].draw();
  }
}

class Particles {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.speed = speed;

    this.mag = 0;
  }

  update() {
    let f1 = 0.01*frameCount;
    let f2 = 0.015*frameCount;
    let v1 = createVector(cos(f1), sin(f2));
    let theta = noise(noiseScaleX*this.x, noiseScaleY*this.y)*numberPI*PI;
    let v2 = createVector(cos(theta), sin(theta));
    let v = createVector(this.speed*lerp(v1.x, v2.x, lerpX), this.speed*lerp(v1.y, v2.y, lerpY));
    this.x += v.x;
    this.y += v.y;
    if (!this.onRange()) {
      this.x = random(width);
      this.y = random(height);
    }
    if (random() < 0.005) {
      this.x = random(width);
      this.y = random(height);
    }
    this.mag = v.mag()/this.speed;
  }

  draw() {
    strokeWeight(1 + (0.7/(epsilon+this.mag)));
    stroke(100*this.mag, 255, 255, 100);
    point(this.x, this.y);
  }

  onRange() {
    if (this.x <= 0 || this.x > width || this.y <= 0 || this.y > height) {
      return false;
    } else {
      return true;
    }
  }
}