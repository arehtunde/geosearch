let searchbox = document.querySelector('.searchbox');
let button = document.querySelector('.button');
let content = document.querySelector('.content');
let features = document.querySelector('.features');
let foot = document.querySelector('.foot')
let main = document.querySelector('.main')
let intro = document.querySelector('.content_input');

//create new element and append
const createNode = element => document.createElement(element);
const append = (parent, child) => parent.append(child);

const initResult = () => {
  intro.style.display = 'none';
  features.style.display = 'none';
};

const map = 'https://www.mapquestapi.com/staticmap/v5/map?';
const key = 'IvNAwSUNmSxFBKN37pVED3RuRscWNnGk';
const value = 'lagos';
const param = 'zoom=14&size=@2x&defaultMarker=marker-md-#008000';
const api = `${map}&key=${key}&locations=${value}&${param}&type=map`;
const mapImage = document.querySelector('.map-image');

const resultPage = () => {
  initResult()
  let div = createNode('div');
  div.className = 'content_logo';
  append(main, div);
  div.innerHTML = `<a href="index.html">
    <i class="fas fa-map-marked-alt"></i>
    <h1 class="content_logo-header">geo-search</h1>
    </a>`;

  const map = 'https://www.mapquestapi.com/staticmap/v5/map?';
  const key = 'IvNAwSUNmSxFBKN37pVED3RuRscWNnGk';
  const param = 'zoom=14&size=@2x&defaultMarker=marker-md-#008000';
  const api = `${map}&key=${key}&locations=${value}&${param}&type=map`;
  const mapImage = document.querySelector('.map-image');

};

button.addEventListener('click', initResult);