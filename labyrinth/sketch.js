let shape = 0; // 0 for horizontal and vertical lines - 1 for diagonal lines
let maxDepth = 8;

function setup() {
  createCanvas(600, 600);
  background(220);
  strokeWeight(1.5);
}

function draw() {
  if (shape == 0) {
    recursiveDraw(20, 20, width-40, height-40, maxDepth);
  }
  else {
    recursiveDrawDiag(20, 20, width-40, height-40, maxDepth);
  }
  noLoop();
}

function recursiveDraw(x, y, w, h, depth) {
  if (depth == 0) {
    if (random() > 0.5) {
      line(x+w/2, y, x+w/2, y+h);
    }
    else {
      line(x, y+h/2, x+w, y+h/2);
    }
  }

  else {
    recursiveDraw(x, y, w/2, h/2, depth-1);
    recursiveDraw(x+w/2, y, w/2, h/2, depth-1);
    recursiveDraw(x, y+h/2, w/2, h/2, depth-1);
    recursiveDraw(x+w/2, y+h/2, w/2, h/2, depth-1);
  }
}

function recursiveDrawDiag(x, y, w, h, depth) {
  if (depth == 0) {
    if (random() > 0.5) {
      line(x, y, x+w, y+h);
    }
    else {
      line(x+w, y, x, y+h);
    }
  }

  else {
    recursiveDrawDiag(x, y, w/2, h/2, depth-1);
    recursiveDrawDiag(x+w/2, y, w/2, h/2, depth-1);
    recursiveDrawDiag(x, y+h/2, w/2, h/2, depth-1);
    recursiveDrawDiag(x+w/2, y+h/2, w/2, h/2, depth-1);
  }
}
