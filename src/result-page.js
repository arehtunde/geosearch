const intro = document.querySelector('.content_input');
const main = document.querySelector('.main');
const features = document.querySelector('.features');

//create new element and append
const createNode = element => document.createElement(element);
const append = (parent, child) => parent.append(child);

//set result page
const resultPage = () => {
  intro.style.display = 'none';
  features.style.display = 'none';

  const mainResult = createNode('div');
  mainResult.className = 'main_result';
  append(main, dataHolder);
  dataHolder.innerHTML = `
    <section class="data_holder">
      <div class="features_card">
        <p>Location: <span class="location">Lagos</span></p>
        <p>Postal Code: <span class="zipcode">200285</span></p>

        <ul class="weather">
          <li class="weather-holder"><span class="weather-name">Temperature:</span><span class="weather-value">100</span></li>
          <li class="weather-holder"><span class="weather-name">Pressure:</span><span class="weather-value">100</span></li>
          <li class="weather-holder"><span class="weather-name">Humidity:</span><span class="weather-value">100</span></li>
          <li class="weather-holder"><span class="weather-name">Precipitation:</span> <span class="weather-value">100</span></li>
          <li class="weather-holder"><span class="weather-name">Wind:</span><span class="weather-value">100</span></li>
          <li class="weather-holder"><span class="weather-name">Timezone:</span><span class="weather-value">100</span></li>
        </ul>

        <button class="button btn btn-convert"><i class="fas fa-thermometer-half btn-icon"></i><span class="btn-text">Convert C to F</span></button>

        <button class="button btn btn-share"><i class="fab fa-facebook-f btn-icon"></i><span class="btn-text">Share to Facebook</span></button>

        <button class="button btn btn-switch"><i class="fas fa-toggle-on btn-icon"></i><span class="btn-text">Switch to Satellite View</span></button>
      </div>
    </section>

    <section class="map">
      <div class="map_image"></div>
    </section>
  `;
};