// Canvas Configuration
let WIDTH = 600;
let HEIGHT = 600;

let lSystem;
let ruleNum = 1;
let numberRecursions = 6;
let sequence;
let x = 0;
let y = 0;
let len;

let step = 0;
let previousStep;

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  let sizeX = (windowWidth-WIDTH)/2;
  let sizeY = (windowHeight-HEIGHT)/2;
  cnv.position(sizeX, sizeY);
  angleMode(DEGREES);

  loadRule();
  sequence = doRecursion(numberRecursions);
  // let numberOne = 0;
  // while (sequence[numberOne] != "[") {
  //   numberOne += 1;
  // }
  // len = HEIGHT/(2*numberOne);
  console.log(sequence);
  background(0);
}

function draw() {
  strokeWeight(1);
  stroke(255);
  // if (min(floor(frameCount/100), 5) == 5) {
  //   noLoop();
  // }
  // sequence = doRecursion(5);
  // push();
  // translate(WIDTH/2, HEIGHT/2);
  // for (let theta = 0; theta < 360; theta+=360/5) {
  //   push();
  //   rotate(theta);
  //   applyRule();
  //   pop();
  // }
  // pop();
  if (true) {
    translate(WIDTH/2, HEIGHT);
    // rotate(random(-25, 25));
  }
  applyIterRule(step);
  step += 1;
  if (step == sequence.length) {
    noLoop();
  }
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
  } else if (ruleNum == 1) {
    // Fractal Plant
    lSystem = {
      "axiom" : "X",
      "rules" : {
        "X" : "F+[[X]-X]-F[-FX]+X",
        "F" : "FF"
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
    if (ruleNum == 0) {
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
    } else if (ruleNum == 1) {
      len = 3;
      if (variable == "F") {
        line(x, y, x, y-len);
        translate(0, -len);
      } else if (variable == "+") {
        rotate(25);
      } else if (variable == "-") {
        rotate(-25);
      } else if (variable == "[") {
        push();
      } else if (variable == "]") {
        pop();
      }
    }
  }
}

function applyIterRule(step) {
  for (let i = 0; i < step; i++) {
    let variable = sequence[i];
    if (ruleNum == 0) {
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
    } else if (ruleNum == 1) {
      len = 3;
      if (variable == "F") {
        if (i == step-1) {
          line(x, y, x, y-len);
        }
        translate(0, -len);
      } else if (variable == "+") {
        rotate(25);
      } else if (variable == "-") {
        rotate(-25);
      } else if (variable == "[") {
        push();
      } else if (variable == "]") {
        pop();
      }
    }
  }
}