let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    // sets up the canvas:
    createCanvas(canvasWidth, canvasHeight);

    // code invoking the function you just wrote:
    drawNShapesDirectionFlexible(30, 30, 335, 0, "square", "column");
    drawNShapesDirectionFlexible(4, 100, 120, 200, "circle", "row");
    drawNShapesDirectionFlexible(8, 50, 725, 425, "circle", "row");

    // draws grid at the end:
    drawGrid(canvasWidth, canvasHeight);
}



// my first function
function draw5Circles() {
    noFill();
    // fill('red');
    circle(100, 200, 50); // centerX, centerY, radius
    circle(100, 250, 50);
    circle(100, 300, 50);
    circle(100, 350, 50);
    circle(100, 400, 50);
}

function draw5RedSquares() {
    fill("red");
    square(320, 200, 50); // topLeftX, topLeftY, width
    square(320, 250, 50);
    square(320, 300, 50);
    square(320, 350, 50);
    square(320, 400, 50);
}

function draw5CirclesWhile() {
  let i = 0;
  let x = 100;
  let y = 200;
  let r = 50;

  while (i < 5) {
    circle(x, y + i * r, r);
    i++;
  }
}

function draw5CirclesFor() {
  let x = 100;
  let y = 200;
  let r = 50

  for (let i = 0; i < 5; i++) {
    circle(x, y + i * r, r); 
  }
}

function drawNCirclesFlexible(n, size, x, y) {
  for (let i = 0; i < n; i++) {
    circle(x, y + i * size, size);
  }
}

function drawNShapesFlexible(n, size, x, y, shape) {
  if (shape === "circle") {
    for (let i = 0; i < n; i++) {
      circle(x, y + i * size, size);
    }
  } else if (shape === "square") {
    for (let i= 0; i < n; i++) {
      square(x, y + i * size, size); 
    }
  }
}

function drawNShapesDirectionFlexible(n, size, x, y, shape, direction) {
  if (shape === "circle") {
    if (direction === "row") {
      for (let i = 0; i < n; i++) {
        circle(x + i * size, y, size);
      } 
    } else {
        for (let i = 0; i < n; i++) {
          circle(x, y + i * size, size);
        }
      }
  } else if (shape === "square") {
    if (direction === "row") {
      for (let i = 0; i < n; i++) {
        square(x + i * size, y, size);
      }
    } else {
        for (let i = 0; i < n; i++) {
          square(x, y + i * size, size);
        }
      }
  }
}
