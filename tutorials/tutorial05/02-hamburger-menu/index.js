// Your code here.

function toggleMenu() {
  const button = document.querySelector('#menu-toggle');
  const nav = document.querySelector('#nav-links');

  nav.classList.toggle('active')
  button.classList.toggle('active')
}
