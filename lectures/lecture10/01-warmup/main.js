let canvasWidth = document.documentElement.clientWidth - 10;
let canvasHeight = document.documentElement.clientHeight - 10;

// in p5.js, the function runs on page load:
function setup() {
    rectMode(CENTER);
    createCanvas(canvasWidth, canvasHeight);
}

// in p5.js, special event handler that listens for click events:
function mouseClicked() {
    // in p5.js, mouseX and mouseY are
    // built-in global variabls that track the
    // current position of your mouse.
    fill(255,0,0)
    circle(mouseX, mouseY, 100);
    fill(255,255,255)
    circle(mouseX, mouseY, 60);
    fill(255,0,0)
    circle(mouseX, mouseY, 20);

}

function AceColors() {
  canvasQuarters = canvasWidth / 4;
  if (mouseY < canvasQuarters) {
    fill(0,0,0);
  } else if(mouseY < 2 * canvasQuarters) {
    fill(163, 163, 163)
  }else if (mouseY < 3 * canvasQuarters) {
      fill(255,255,255);
  } else {
      fill(128,0,128);
  }
}

function MouseColor() {
    fill(mouseX % 255, mouseY % 255, (mouseX * mouseY) % 255);
}

// in p5.js, special event handler that listens for drag events:
function mouseDragged() {

    AceColors();

    let size = Math.random() * 100;
    let shape = Math.random();
    
    if (shape < 0.5) {} {
      circle(mouseX, mouseY, size);
    }
    if (shape >= 0.5) {
     square(mouseX, mouseY, size);
    }
}


/**
 * Challenges:
 * 1. As you click / drag, can the circles have different colors and sizes?
 *      * Try using the Math.random() function
 * 2. Can you make the click / drag sometimes make circles and sometimes make rectangles
 *      * Sample rectangle function invocation: rect(mouseX, mouseY, 100, 100);
 * 3. Can you make each click create a bulleye of different colors?
 *      * Hint: make sure you draw the bigger circles before you draw the smaller circles.
 */
