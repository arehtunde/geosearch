let searchbox = document.querySelector('.searchbox');
let button = document.querySelector('.button');
let content = document.querySelector('.content');
let features = document.querySelector('.features');
let foot = document.querySelector('.foot')

const disp = () => {
  content.style.display = 'none';
  features.style.display = 'none';
  foot.style.display = 'none';
};

button.addEventListener('click', disp);