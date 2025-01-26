// Canvas settings
let WIDTH = 600;
let HEIGHT = 600;
let d;

let blobs = [];
let numberBlobs = 4000;

function setup() {
  // Create canvas
  cnv = createCanvas(WIDTH, HEIGHT);
  let sizeX = (windowWidth-width)/2;
  let sizeY = (windowHeight-height)/2;
  cnv.position(sizeX, sizeY);
  d = pixelDensity();

  angleMode(DEGREES);
  for (let i = 0; i < numberBlobs; i++) {
    if (i % 2 == 0) {
      blobs[i] = new Blobs(0, 0);
    } else {
      blobs[i] = new Blobs(width/2, height/2);
    }
  }
  background(0);
}

function draw() {
  background(0, 10);
  loadPixels();

  for (let i = 0; i < numberBlobs; i++) {
    blobs[i].update();
    blobs[i].display();
  }
}


class Blobs {
  constructor(x, y) {
    // Position
    this.x = x;
    this.y = y;
    this.r = 1;

    // Orientation
    this.heading = random(360);
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);

    // Sensors
    this.FL = createVector(0,0);
    this.F = createVector(0,0);
    this.FR = createVector(0,0);
    this.SO = 9;
    this.SA = 45;
    this.RA = 45;

    // Blob color
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
  } 

  update() {
    // Update the position of each particles
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);

    this.x += this.vx;
    this.y += this.vy;

    this.x = this.inRangeX(this.x);
    this.y = this.inRangeY(this.y);
    

    // Get positions of each sensors
    this.F.x = this.inRangeX(this.x + this.SO*cos(this.heading));
    this.F.y = this.inRangeY(this.y + this.SO*sin(this.heading));

    this.FR.x = this.inRangeX(this.x + this.SO*cos(this.heading + this.SA));
    this.FR.y = this.inRangeY(this.y + this.SO*sin(this.heading + this.SA));

    this.FL.x = this.inRangeX(this.x + this.SO*cos(this.heading - this.SA));
    this.FL.y = this.inRangeY(this.y + this.SO*sin(this.heading - this.SA));

    // Get pixels of each sensors
    let index, l, f, r;    

    index = 4 * ((floor(this.FL.y) * d) * width * d + (floor(this.FL.x) * d));
    l = pixels[index];

    index = 4 * ((floor(this.F.y) * d) * width * d + (floor(this.F.x) * d));
    f = pixels[index];

    index = 4 * ((floor(this.FR.y) * d) * width * d + (floor(this.FR.x) * d));
    r = pixels[index];

    // From Jones' paper of 2010
    if ((f > l) && (f > r)) {
      // Keeping the same direction
    } else if ((f < l) && (f < r)) {
      if (random() < 0.5) {
        this.heading += this.RA;
      } else {
        this.heading -= this.RA;
      }
    } else if (l < r) {
      this.heading += this.RA;
    } else if (r < l) {
      this.heading -= this.RA;
    } else {
      // Keeping the same direction
    }
  }

  display() {
    fill(this.red, this.green, this.blue);
    noStroke();
    ellipse(this.x, this.y, 2*this.r, 2*this.r);
  }

  inRangeX(x) {
    return (x + width) % width;
  }

  inRangeY(y) {
    return (y + height) % height;
  }
}
