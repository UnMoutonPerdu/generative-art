let gap = 35;
let black = true;
let tilt = 5;
let noise = 25;
let size;
let clipYellow;
let clipBlack;

function setup() {
  cnv = createCanvas(800, 800);
  let x = (windowWidth-width)/2;
  let y = (windowHeight-height)/2;
  cnv.position(x, y);
  angleMode(DEGREES);
  background(10);
  noStroke();
}

function draw() {
  for (let i = 0; i < width/2-gap; i+=gap) {
    if (black) {
      fill('black');
      black = false;
    } else {
      fill('yellow');
      black = true;
    }
    push();
    translate(width/2, height/2);
    rotate(random(-tilt,tilt));
    size = width-2*i;
    //rect(i-width/2,i-height/2, width-2*i,width-2*i);
    quad(i-width/2+random(-noise,noise),i-height/2+random(-noise,noise),i-width/2+size+random(-noise,noise),i-height/2+random(-noise,noise),i-width/2+size+random(-noise,noise),i-height/2+size+random(-noise,noise),i-width/2+random(-noise,noise),i-height/2+size+random(-noise,noise));
    pop();
  }

  noLoop();
}
