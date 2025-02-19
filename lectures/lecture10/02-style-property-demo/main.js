
const makeRed = () => {
    // your code here...
    console.log('Change background to red');
    document.querySelector('#section1').style.backgroundColor = 'red';
};

const makeBlue = () => {
    // your code here...
    console.log('Change background to blue');
    document.querySelector('#section2').style.backgroundColor = 'blue';
};

const makePink = () => {
    // your code here...
    console.log('Change background to pink');
    document.querySelector('#section3').style.backgroundColor = 'pink';
};

const makeOrange = () => {
    // your code here...
    console.log('Change background to orange');
    document.querySelector('#section4').style.backgroundColor = 'orange';
};

const changeColor = (selector, color) => {
  if (document.querySelector(selector).style.backgroundColor === color) {
    document.querySelector(selector).style.backgroundColor = 'white';
    return;
  }
  document.querySelector(selector).style.backgroundColor = color;
}

const reset = () => {
  let sections = document.querySelectorAll('.my-section');
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.backgroundColor = 'white';
  }
}
