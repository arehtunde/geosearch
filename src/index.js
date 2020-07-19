let searchbox = document.querySelector('.searchbox');
let button = document.querySelector('.button');
let content = document.querySelector('.content');
let features = document.querySelector('.features');
let foot = document.querySelector('.foot')
let main = document.querySelector('.main')

//this help create new element
const createNode = element => document.createElement(element);
//this append child to parent
const append = (parent, child) => parent.append(child);

const initResult = () => {
  content.style.display = 'none';
  features.style.display = 'none';
  foot.style.display = 'none';
};

const resultPage = () => {
  initResult()
  let div = createNode('div');
  div.className = 'content_logo';
  append(main, div);
  div.innerHTML = `<a href="index.html">
    <i class="fas fa-map-marked-alt"></i>
    <h1 class="content_logo-header">geo-search</h1>
    </a>`;
};

button.addEventListener('click', resultPage);