// Canvas Configuration
let WIDTH = 600;
let HEIGHT = 600;

let lSystem;
let ruleNum = 0;
let numberRecursions = 5;
let sequence;
let x = 0;
let y = 0;
//let len = (HEIGHT-50)/((numberRecursions*2)*(numberRecursions*2+1));
let len = 10;

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  let sizeX = (windowWidth-WIDTH)/2;
  let sizeY = (windowHeight-HEIGHT)/2;
  cnv.position(sizeX, sizeY);
  angleMode(DEGREES);

  loadRule();
  sequence = doRecursion(numberRecursions);
  console.log(sequence);
  background(0);
}

function draw() {
  strokeWeight(2);
  stroke(255);
  if (min(floor(frameCount/100), 5) == 5) {
    noLoop();
  }
  sequence = doRecursion(min(floor(frameCount/100), 5));
  push();
  translate(WIDTH/2, HEIGHT/2);
  for (let theta = 0; theta < 360; theta+=360/36) {
    push();
    rotate(theta);
    applyRule();
    pop();
  }
  pop();
}

function loadRule() {
  if (ruleNum == 0) {
    // Fractal Binary Tree
    lSystem = {
      "axiom" : "0",
      "rules" : {
        "1" : "11",
        "0" : "1[0]0"
      },
      "constants" : {
        "[" : push,
        "]" : pop  
      }
    };
  }
}

function doRecursion(n) {
  let currentSeq = lSystem["axiom"];
  let nextSeq = "";
  if (n == 0) {
    return currentSeq;
  } 
  while (n != 0) {
    for (let i = 0; i < currentSeq.length; i++) {
      let variable = currentSeq[i];
      if (variable in lSystem["rules"]) {
        nextSeq = nextSeq.concat(lSystem["rules"][variable]);
      } else {
        nextSeq = nextSeq.concat(variable);
      }
    }
    currentSeq = nextSeq;
    nextSeq = "";
    n -= 1;
  }
  return currentSeq;
}

function applyRule() {
  for (let i = 0; i < sequence.length; i++) {
    let variable = sequence[i];
    if (variable == "0") {
      line(x, y, x, y-len/1.5);
    } else if (variable == "1") {
      line(x, y, x, y-len);
      translate(0, -len);
    } else if (variable == "[") {
      lSystem["constants"][variable]();
      rotate(45);
    } else if (variable == "]") {
      lSystem["constants"][variable]();
      rotate(-45);
    }
  }
}