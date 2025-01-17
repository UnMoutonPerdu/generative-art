let nbClouds = 10;

function setup() {
  createCanvas(600, 600);
  background(148, 178, 227);
  noStroke();
}

function draw() {
  for (let i = 0; i < nbClouds; i++) {
    fill(random(180,220));
    let x = random(0,600);
    let y = random(0,600);

    circle(x,y,random(40,60));
    circle(x+random(20,30), y+random(5,10),random(25,35));
    circle(x-random(20,30), y+random(5,10),random(25,35));
  }

  circle(width/2,height/2, 100);
  circle(width/2+50,height/2+20, 75);
  circle(width/2-50,height/2+5, 75);
  noLoop();
}
