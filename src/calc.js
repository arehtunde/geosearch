//render map and location info
const fetchMap = (coord, output, revResult) => {
  //render map
  const mapApi = 'https://image.maps.ls.hereapi.com/mia/1.6/mapview';
  const mapKey = 'Fo_wwTApyBNJTi6Z8xBahC6jJ17dv9REf5zmCQZg0_s';
  const mapParam = `z=${14}&vt=${0}&f=${0}`;
  const mapView = `t=${0}`;
  const satView = `t=${3}`;
  const mapUrl = `${mapApi}?apiKey=${mapKey}&ctr=${coord.lat},${coord.lng}&${mapParam}&${mapView}`; 
  const mainMap = document.querySelector('.map_image');
  mainMap.style.backgroundImage = `url(${mapUrl})`;

  //render location
  const renderLocation = document.querySelector('.location');
  const location = output.formatted;
  renderLocation.innerHTML = `${location}`;

  //render postal codes
  const renderZipcode = document.querySelector('.zipcode');
  const zipcode = output.components.postcode; 
  const post = revResult.items[0].address.postalCode;
  renderZipcode.innerHTML = post ? `${post}`: zipcode ? `${zipcode}` : 'not available';
}

//render weather data
const renderData = (weatherResult, output) => {
  //display temperature
  const temp = document.querySelector('.temp');
  const tempUnit = document.querySelector('.temp-unit');
  const temperature = weatherResult.main.temp;
  temp.innerHTML = `${(temperature - 273.15).toFixed(2)}`;
  tempUnit.innerHTML = '°C';

  //display pressure
  const pressure = document.querySelector('.pressure');
  pressure.innerHTML = `${weatherResult.main.pressure}hPa`;
  
  //display humidity
  const humidity = document.querySelector('.humidity');
  humidity.innerHTML = `${weatherResult.main.humidity}%`;
  
  //display wind
  const wind = document.querySelector('.wind');
  wind.innerHTML = `${weatherResult.wind.speed}m/s`;
  
  //display timezone
  const time = document.querySelector('.time');
  const timezone = output.annotations.timezone.offset_sec; 
  time.innerHTML = `GMT${Math.sign(timezone / 3600) === 1 || Math.sign(timezone / 3600) === 0 ? '+' : ''}${(timezone / 3600)}`;

  //display weather icon
  const weatherIcon = document.querySelector('.weather-icon_img');
  const weatherDescription = document.querySelector('.weather-description');
  const icon = weatherResult.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIcon.setAttribute('src', `${iconUrl}`)
  weatherDescription.innerHTML = weatherResult.weather[0].description;

  //convert temperature
  const convertButton = document.querySelector('.btn-convert');
  convertButton.addEventListener('click', convertTemp);
};

//conver temperature unit
const convertTemp = () => {
  const temp = document.querySelector('.temp');
  const tempUnit = document.querySelector('.temp-unit');
  const btnText = document.querySelector('.btn-text');

  //covert celcius to fahrenheit
  if (tempUnit.innerHTML === '°C') {
    const fahrenheit = `${(temp.innerHTML * (9/5) + 32).toFixed(2)}`;
    temp.innerHTML = fahrenheit;
    tempUnit.innerHTML = '°F';
    btnText.innerHTML = 'Convert °F to °C';
  } else {
    const celcius = `${((temp.innerHTML - 32) * 5/9).toFixed(2)}`;
    temp.innerHTML = celcius;
    tempUnit.innerHTML = '°C';
    btnText.innerHTML = 'Convert °C to °F';
  }
};

/*const errorPage = (input) => {
  const main = document.querySelector('.main');
  let foot = document.querySelector('.foot')
  const cityInfo = document.querySelector('.city_info');
  const mainResult = document.querySelector('.main_result');
  const landmark = document.querySelector('.landmark');

  cityInfo.remove();
  mainResult.remove();
  landmark.remove();

  const errorInfo = document.createElement('div');
  errorInfo.className = 'error_info';
  main.append(errorInfo);
  errorInfo.after(foot);
  errorInfo.innerHTML = `<h1>${input} Not Found!</h1>
  <p>Please Enter a valid city name</p>`;

  const button = document.querySelector('.button');  
  button.addEventListener('click', fetchData);
}*/

//fetch data
const fetchData = async () => {
  const inputfield = document.querySelector('.inputfield');
  const input = inputfield.value.trim();
  const encodedInput = encodeURI(input);
  const coordApi = 'https://api.opencagedata.com/geocode/v1/json?';
  const coordKey = '173f9f1a42c64005be22065050aa936e';
  const coordParam = 'pretty=1&limit=1';
  const coordUrl = `${coordApi}q=${encodedInput}&key=${coordKey}&${coordParam}`;

  try {
    //fetch coordinates
    const fetchCoord = fetch(coordUrl)
    const response = await fetchCoord;
    const data = await response.json();

    //data output
    const coord = data.results[0].geometry;
    const output = data.results[0];
    
    //weather query parameters
    const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?';
    const weatherKey = 'ec176773b43e5a5c331ce2f31b259053';
    const weatherUrl = `${weatherApi}lat=${coord.lat}&lon=${coord.lng}&appid=${weatherKey}`;

    //hereGeocode parameters for additional postal code
    const revApi = 'https://revgeocode.search.hereapi.com/v1/revgeocode?';
    const revKey = 'Fo_wwTApyBNJTi6Z8xBahC6jJ17dv9REf5zmCQZg0_s';
    const revUrl = `${revApi}at=${coord.lat},${coord.lng}&apiKey=${revKey}`;

    const [weatherResponse, revResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(revUrl)
    ]);

    const [weatherData, revData] = await Promise.all([
      weatherResponse.json(), revResponse.json()
    ]);

    renderData(weatherData, output);
    fetchMap(coord, output, revData);
  }
  catch(err) {
    const main = document.querySelector('.main');
    let foot = document.querySelector('.foot')
    const cityInfo = document.querySelector('.city_info');
    const mainResult = document.querySelector('.main_result');
    const landmark = document.querySelector('.landmark');
  
    cityInfo.remove();
    mainResult.remove();
    landmark.remove();
  
    const errorInfo = document.createElement('div');
    errorInfo.className = 'error_info';
    main.append(errorInfo);
    errorInfo.after(foot);
    errorInfo.innerHTML = `<h1>${input} Not Found!</h1>
    <p>Please Enter a valid city name</p>`;
  }
};

export { fetchData }