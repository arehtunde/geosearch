import { fetchData } from './calc.js';

const intro = document.querySelector('.content_input');
const main = document.querySelector('.main');
const features = document.querySelector('.features');
let foot = document.querySelector('.foot')

//render markup
const renderData = () => {
  //remove from DOM
  intro.remove();
  features.remove();

  //render location and postal code
  const content = document.querySelector('.content');
  const cityInfo = document.createElement('div');
  cityInfo.className = 'city_info';
  main.append(cityInfo);
  cityInfo.before(content);
  cityInfo.innerHTML = `
    <p>Postal Code: <span class="zipcode"></span></p>
    <p class="local">Location: <span class="location"></span></p>
  `;

  //render weather and map
  const mainResult = document.createElement('div');
  mainResult.className = 'main_result';
  main.append(mainResult)
  mainResult.after(foot);
  mainResult.innerHTML = `
    <section class="data_holder">
      <div class="features_card card2">
        <div class="icon">
          <div class="weather-icon">
            <img class="weather-icon_img">
          </div>
          <p class="weather-description"></p>
        </div>
        <ul class="weather">
          <li class="weather-holder"><span class="weather-name">Temperature:</span><span class="weather-value temp"></span><span class="temp-unit"></span></li>
          <li class="weather-holder"><span class="weather-name">Pressure:</span><span class="weather-value pressure"></span></li>
          <li class="weather-holder"><span class="weather-name">Humidity:</span><span class="weather-value humidity"></span></li>
          <li class="weather-holder"><span class="weather-name">Wind:</span><span class="weather-value wind"></span></li>
          <li class="weather-holder"><span class="weather-name">Timezone:</span><span class="weather-value time"></span></li>
        </ul>

        <button class="button btn btn-convert"><i class="fas fa-thermometer-half btn-icon"></i><span class="btn-text convert">Convert °C to °F</span></button>

        <a href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}" target="_blank"><button class="button btn btn-share"><i class="fab fa-facebook-f btn-icon"></i><span class="btn-text share">Share to Facebook</span></button></a>

        <button class="button btn btn-switch"><i class="fas fa-toggle-on btn-icon"></i><span class="btn-text switch">Switch Map View</span></button>
      </div>
    </section>

    <section class="map">
      <div class="map_image"></div>
    </section>
  `;

  //render image
  const landmark = document.createElement('section');
  landmark.className = 'landmark';
  main.append(landmark);
  landmark.after(foot);
  landmark.innerHTML = `<div class="landmark_images"></div>`;

  fetchData();
}

//trigger button
const button = document.querySelector('.button');
button.addEventListener('click', fetchData); // fetch and render data
button.addEventListener('click', renderData, {once: true}); //query input and render template