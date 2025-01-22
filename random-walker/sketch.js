let numberWalkers = 200;
let walkers = [];
let countWalkers = 0;
let drawingMode = 0;
let speed = [300, 1, 1, 1];
let period = 20;
let numberColorsMax = 15;
let colors = [];

// Line mode
let lineLengthMax = 100;
let lineWeightMax = 15;

function setup() {
  cnv = createCanvas(900, 900);
  let sizeX = (windowWidth-width)/2;
  let sizeY = (windowHeight-height)/2;
  cnv.position(sizeX, sizeY);
  background(50);
  if (drawingMode == 3) {
    background(random(210, 230), random(200, 220), random(185, 210));
  }
  for (let i = 0; i < numberColorsMax; i++) {
    colors.push(color(random(0,255), random(0,255), random(0,255)));
  }
  for (let i = 0; i < numberWalkers; i++) {
    walkers[i] = new Walker();
  }

  // These buttons come from 'https://p5js.org/reference/p5/noLoop/'
  // startButton = createButton('▶');
  // startButton.position(sizeX, sizeY+height);
  // startButton.size(50, 20);
  // stopButton = createButton('◾');
  // stopButton.position(sizeX+50, sizeY+height);
  // stopButton.size(50, 20);

  // startButton.mousePressed(loop);
  // stopButton.mousePressed(noLoop);
}

function draw() {
  for (let i = 0; i < speed[drawingMode]; i++) {
    for (let walker = 0; walker < constrain(frameCount/period, 0, numberWalkers); walker++) {
      walkers[walker].move();
      walkers[walker].draw();
    }
  }
}

function epicycloidX(t, R, r, d, s) {
  return (R+r)*cos(t/s) - r*cos((R+r)*t/s/r);
}

function epicycloidY(t, R, r, d, s) {
  return (R+r)*sin(t/s) - r*sin((R+r)*t/s/r);
}

function epitrochoidX(t, R, r, d, s) {
  return (R+r)*cos(t/s) - d*cos((R+r)*t/s/r);
}

function epitrochoidY(t, R, r, d, s) {
  return (R+r)*sin(t/s) - d*sin((R+r)*t/s/r);
}

class Walker {
  constructor() {
    countWalkers += 1;
    if (drawingMode == 3) {
      let preferredColors = [color(232, 231, 227), color(117, 116, 111), color(33, 33, 31), color(181, 114, 172), color(127, 179, 201), color(123, 201, 154), color(230, 133, 194), color(230, 133, 164)];

      if (random() < 0.5) {
        this.shapeX = epicycloidX;
        this.shapeY = epicycloidY;
      }
      else {
        this.shapeX = epitrochoidX;
        this.shapeY = epitrochoidY;
      }
      this.bigR = random(50, 300);
      this.smallR = random(30, 200);
      this.d = random(35, 300);
      this.s = random(30, 100);
      this.color = preferredColors[int(random(0,preferredColors.length))];
      
      this.t = 0;
      
      this.theta = random(0,360);

      this.x = this.shapeX(this.t, this.bigR, this.smallR, this.d, this.s);
      this.y = this.shapeY(this.t, this.bigR, this.smallR, this.d, this.s);
      this.t++;
    } 
    else {
      this.x = random(width);
      this.y = random(height);

      this.r = random(0,255);
      this.g = random(0,255);
      this.b = random(0,255);
    }

    this.nextX = this.x;
    this.nextY = this.y;

    this.lengthLine = random(1, lineLengthMax);
    this.weightLine = random(1, lineWeightMax);
  }

  move() {
    if (drawingMode == 0) {
      this.x += random(-1,1);
      this.y += random(-1,1);

      this.x = constrain(this.x, 0, width);
      this.y = constrain(this.y, 0, height)
      
      this.r += random(-1,1);
      this.g += random(-1,1);
      this.b += random(-1,1);

      this.r = constrain(this.r, 0, 255);
      this.g = constrain(this.g, 0, 255);
      this.b = constrain(this.b, 0, 255);
    } 
    
    else if (drawingMode == 1 || drawingMode == 2) {
      this.lengthLine = random(1, lineLengthMax);
      this.weightLine = random(1, lineWeightMax);

      this.nextX = this.x + random(-this.lengthLine,this.lengthLine);
      this.nextY = this.y + random(-this.lengthLine, this.lengthLine);

      this.nextX = constrain(this.nextX, 0, width);
      this.nextY = constrain(this.nextY, 0, height);
      
      this.r += random(-10,10);
      this.g += random(-10,10);
      this.b += random(-10,10);

      this.r = constrain(this.r, 0, 255);
      this.g = constrain(this.g, 0, 255);
      this.b = constrain(this.b, 0, 255);
    }

    else if (drawingMode == 3) {      
      this.nextX = this.shapeX(this.t, this.bigR, this.smallR, this.d, this.s);
      this.nextY = this.shapeY(this.t, this.bigR, this.smallR, this.d, this.s);
      
      this.t++;
    }
  }

  draw() {
    if (drawingMode == 0) {
      stroke(this.r, this.g, this.b);
      point(this.x, this.y);
    } 

    else if (drawingMode == 1) {
      stroke(this.r, this.g, this.b);
      strokeWeight(this.weightLine);
      line(this.x, this.y, this.nextX, this.nextY);
      this.x = this.nextX;
      this.y = this.nextY;
    }

    else if (drawingMode == 2) {
      noFill();
      stroke(this.r, this.g, this.b);
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = color('black');
      drawingContext.shadowOffsetX = 5;
      drawingContext.shadowOffsetY = -5;
      strokeWeight(10);
      bezier(this.x, this.y, random(this.x, this.nextX), random(this.y, this.nextY), random(this.x, this.nextX), random(this.y, this.nextY), this.nextX, this.nextY);
      this.x = this.nextX;
      this.y = this.nextY;
    }

    else if (drawingMode == 3) {
      push();
      if (this.shapeX == epicycloidX) {
        translate(width/2-this.bigR*cos(this.theta), height/2 - this.bigR*sin(this.theta));
      } 
      else {
        translate(width/2-(this.bigR + this.smallR - this.d)*cos(this.theta), height/2-(this.bigR + this.smallR - this.d)*sin(this.theta));
      }
      rotate(this.theta);
      stroke(this.color);
      strokeWeight(this.weightLine);
      line(this.x, this.y, this.nextX, this.nextY);
      this.x = this.nextX;
      this.y = this.nextY;
      pop();
    }
  }
}