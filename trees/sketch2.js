// Canvas Configuration
let WIDTH = 600;
let HEIGHT = 600;

let lSystem;
let numberRecursions = 8;
let sequence;
let x = 0;
let y = 0;

let len = 200;
let angle = 35;
let lineWeight = 5;

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  let sizeX = (windowWidth-WIDTH)/2;
  let sizeY = (windowHeight-HEIGHT)/2;
  cnv.position(sizeX, sizeY);
  angleMode(DEGREES);

  loadRule();
  sequence = doRecursion(numberRecursions);
  background(0);
}

function draw() {
  stroke(255);

  translate(WIDTH/2, HEIGHT);
  applyRule();
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
      line(x, y, x, y-len);
      translate(0, -len);
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