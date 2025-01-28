// Based on Jone's paper of 2010
// Canvas configuration
let WIDTH = 650;
let HEIGHT = 650;
let pixelDens;

// Blobs configuration
let blobs = [];
let numberBlobs = 25000;

// Colors configuration
// 0 -> White
// 1 -> Random
// 2 -> Yellow - Physarum like
let colorMode = 2; 

function setup() {
  // Create canvas
  cnv = createCanvas(WIDTH, HEIGHT);
  let sizeX = (windowWidth-width)/2;
  let sizeY = (windowHeight-height)/2;
  cnv.position(sizeX, sizeY);
  pixelDens = pixelDensity();

  angleMode(DEGREES);
  createBasicBlob();
  background(0);
}

function draw() {
  basicBlob();
}

//////////////////////////////////
/////////// Basic Blob ///////////
//////////////////////////////////

function createBasicBlob() {
  let configuration = 1;
  if (configuration == 0) {
    // Center + corners = fireworks
    for (let i = 0; i < numberBlobs; i++) {
      if (i % 2 == 0) {
        blobs[i] = new Blobs(0, 0);
      } else {
        blobs[i] = new Blobs(width/2, height/2);
      }
    }
  } else if (configuration == 1) {
    // Spawn in a circle
    let radius = 300;
    for (let i = 0; i < numberBlobs; i++) {
      let r = random(radius);
      let theta = random(360);
      blobs[i] = new Blobs(width/2 + r*cos(theta), height/2 + r*sin(theta), 180+theta);
    }
  }
}

// Basic blob -> Lot of particles that come together
function basicBlob() {
  background(0, 10);
  loadPixels();

  for (let i = 0; i < numberBlobs; i++) {
    blobs[i].update();
    blobs[i].display();
  }
}

class Blobs {
  constructor(x, y, heading=random(360)) {
    // Position
    this.x = x;
    this.y = y;
    this.r = 0.5;
    this.speed = 1;

    // Orientation
    this.heading = heading;
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);

    // Sensors
    this.FL = createVector(0,0);
    this.F = createVector(0,0);
    this.FR = createVector(0,0);
    this.SO = 30;
    this.SA = 30; // 45 or 22.5 in the paper 
    this.RA = 15;
    this.steerStrength = random();

    // Blob color
    if (colorMode == 0) {
      this.red = 255;
      this.green = 255;
      this.blue = 255;
    } else if (colorMode == 1) {
      this.red = random(255);
      this.green = random(255);
      this.blue = random(255);
    } else if (colorMode == 2) {
      this.red = 225;
      this.green = 161;
      this.blue = 0;
    }
  } 

  update() {
    // Update the position of each particles
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);

    this.x += this.vx*this.speed;
    this.y += this.vy*this.speed;

    // Continuous sides
    // this.x = this.inRangeX(this.x);
    // this.y = this.inRangeY(this.y);

    // Bouncing against borders
    if (this.x < 0) {
      this.x = 1;
      this.heading = 180 - this.heading;
    } else if (this.x > width-1) {
      this.x = width-2;
      this.heading = 180 - this.heading;
    }

    if (this.y < 0) {
      this.y = 1;
      this.heading = -this.heading;
    } else if (this.y > height-1) {
      this.y = height-2;
      this.heading = -this.heading;
    }    
    

    // Get positions of each sensors
    this.F.x = this.inRangeX(this.x + this.SO*cos(this.heading));
    this.F.y = this.inRangeY(this.y + this.SO*sin(this.heading));

    this.FR.x = this.inRangeX(this.x + this.SO*cos(this.heading + this.SA));
    this.FR.y = this.inRangeY(this.y + this.SO*sin(this.heading + this.SA));

    this.FL.x = this.inRangeX(this.x + this.SO*cos(this.heading - this.SA));
    this.FL.y = this.inRangeY(this.y + this.SO*sin(this.heading - this.SA));

    // Get pixels of each sensors
    let index, l, f, r;    

    index = 4 * ((floor(this.FL.y) * pixelDens) * width * pixelDens + (floor(this.FL.x) * pixelDens));
    l = pixels[index];

    index = 4 * ((floor(this.F.y) * pixelDens) * width * pixelDens + (floor(this.F.x) * pixelDens));
    f = pixels[index];

    index = 4 * ((floor(this.FR.y) * pixelDens) * width * pixelDens + (floor(this.FR.x) * pixelDens));
    r = pixels[index];

    this.steerStrength = random();
    // From Jones' paper of 2010
    if ((f > l) && (f > r)) {
      // Keeping the same direction
    } 
    else if ((f < l) && (f < r)) {
      if (random() < 0.5) {
        this.heading += this.RA*this.steerStrength;
      } else {
        this.heading -= this.RA*this.steerStrength;
      }
    }
    else if (l < r) {
      this.heading += this.RA*this.steerStrength;
    } else if (r < l) {
      this.heading -= this.RA*this.steerStrength;
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
