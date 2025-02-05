// Canvas Configuration
let WIDTH = 800;
let HEIGHT = 600;

let lSystem;
let numberRecursions = 8;
let sequence;
let x = 0;
let y = 0;

let len = 200;
let scale = 0.5;
let angle = 35;
let lineWeight = 5;

let numberTrees = 3;
let trees = [];

function setGradient(c1, c2) {
  noFill();
  for (var y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  let sizeX = (windowWidth-WIDTH)/2;
  let sizeY = (windowHeight-HEIGHT)/2;
  cnv.position(sizeX, sizeY);
  angleMode(DEGREES);

  loadRule();

  for (let i = 0; i < numberTrees; i++) {
    trees[i] = new Tree();
    trees[i].generate();
  }

  c1 = color(14, 4, 56);
  c2 = color(95, 6, 97);
  setGradient(c1, c2);
}

function draw() {
  stroke(0);

  for (let i = 0; i < numberTrees; i++) {
    push();
    translate(WIDTH/2, HEIGHT);
    trees[i].draw();
    pop();
  }
  noLoop();
}

function loadRule() {
    // Fucking tree
    // lSystem = {
    //     "axiom" : "Z",
    //     "rules" : {
    //     "A" : "FF+[+FZ-[Z]-Z]-FF[F-[FZ]+Z]+[ZF-F+[Z]FF]R",
    //     "B" : "FF-[F-[Z]F+FZ+F[Z]]+FF-[+FF[FZ]-[FZ]]-[+F[Z]]R"
    //     },
    //     "constants" : {
    //     "[" : push,
    //     "]" : pop
    //     }
    // };

    lSystem = {
        "axiom" : "TFZ",
        "rules" : {
        0 : "[+[F[Z]]-[F[Z]]][Z]",
        1 : "[-[F[Z]]+[F[Z]]][Z]",
        2 : "+[FZ-Z]-[Z]+[[FZ]]-[FZ]",
        3 : "-[FZ+Z]+[Z]-[[FZ]]+[FZ]",
        "F" : "F"
        },
        "constants" : {
        "numberRules" : 2,
        "[" : push,
        "]" : pop
        }
    };
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
      if (variable == "Z") {
        nextSeq = nextSeq.concat(lSystem["rules"][floor(random(lSystem["constants"]["numberRules"]))]);
      } else if (variable in lSystem["rules"]) {
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
    if (variable == "F") {
      strokeWeight(lineWeight);
      line(x, y, x, y-scale*len);
      translate(0, -scale*len);
    } else if (variable == "+") {
      rotate(angle+15*noise(len));
    } else if (variable == "-") {
      rotate(-angle+15*noise(len));
    } else if (variable == "[") {
      len *= 0.85;
      lineWeight *= 0.85;
      push();
    } else if (variable == "]") {
      len /= 0.85;
      lineWeight /= 0.85;
      pop();
    }
  }
}

class Tree {
  constructor() {
    this.sequence = "";
    this.scale = 0.8;
  }

  generate() {
    this.sequence = doRecursion(numberRecursions);
  }

  draw() {
    for (let i = 0; i < this.sequence.length; i++) {
      let variable = this.sequence[i];
      if (variable == "F") {
        strokeWeight(lineWeight);
        line(x, y, x, y-this.scale*len);
        translate(0, -this.scale*len);
      } else if (variable == "+") {
        rotate(angle+15*noise(len));
      } else if (variable == "-") {
        rotate(-angle+15*noise(len));
      } else if (variable == "[") {
        len *= 0.85;
        lineWeight *= 0.85;
        push();
      } else if (variable == "]") {
        len /= 0.85;
        lineWeight /= 0.85;
        pop();
      }
    }
  }
}