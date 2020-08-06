//Fetch co-ordinates and render map 
const getCoordinate = () => {
  const inputfield = document.querySelector('.inputfield');
  const input = `geocode?q=${inputfield.value}`;
  const encodedInput = encodeURI(input);
  const api = 'https://geocode.search.hereapi.com/v1/';
  const key = 'Fo_wwTApyBNJTi6Z8xBahC6jJ17dv9REf5zmCQZg0_s';
  const url = `${api}${encodedInput}&apiKey=${key}`;
  
  return fetch(url)
  .then(response => response.json())
  .then(data => {
    //render location
    const location = data.items[0].title;
    const renderLocation = document.querySelector('.location');
    renderLocation.innerHTML = `${location}`;

    //render postal codes
    const zipcode = data.items[0].address.postalCode;
    const renderZipcode = document.querySelector('.zipcode');
    renderZipcode.innerHTML =  zipcode === undefined ? 'not available' : `${zipcode}`;

    //GET and Render Map
    const coord = data.items[0].position;
    const api = 'https://image.maps.ls.hereapi.com/mia/1.6/mapview';
    const key = 'Fo_wwTApyBNJTi6Z8xBahC6jJ17dv9REf5zmCQZg0_s';
    const latLng = `ctr=${coord.lat},${coord.lng}`;
    const param = `z=${14}&t=${0}&vt=${0}&f=${0}`;
    const url = `${api}?apiKey=${key}&${latLng}&${param}`; 
    const mainMap = document.querySelector('.map_image');
    return mainMap.style.backgroundImage = `url(${url})`;
  });
};

const getWeatherData = () => {
  const inputfield = document.querySelector('.inputfield');
  const api = 'https://api.openweathermap.org/data/2.5/weather?';
  const key = 'ec176773b43e5a5c331ce2f31b259053';
  const input = `q=${inputfield.value}`;
  const encodedInput = encodeURI(input);
  const url = `${api}${encodedInput}&appid=${key}`;
  
  return fetch(url)
  .then(response => response.json())
  .then(data => {
    //display temperature
    const temp = document.querySelector('.temp');
    temp.innerHTML = `${data.main.temp}`;
    //display pressure
    const pressure = document.querySelector('.pressure');
    pressure.innerHTML = `${data.main.pressure}hPa`;
    //display humidity
    const humidity = document.querySelector('.humidity');
    humidity.innerHTML = `${data.main.humidity}%`;
    //display wind
    const wind = document.querySelector('.wind');
    wind.innerHTML = `${data.wind.speed}m/s`;
    //display timezone
    const time = document.querySelector('.time');
    time.innerHTML = `GMT${Math.sign(data.timezone / 3600) === 1 ? '+' : ''}${(data.timezone / 3600)}`;
    //display weather icon
    const weatherIcon = document.querySelector('.weather-icon_img');
    const weatherDescription = document.querySelector('.weather-description');
    const icon = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    //weatherIcon.style.backgroundImage = `url(${iconUrl})`;
    weatherIcon.setAttribute('src', `${iconUrl}`)
    weatherDescription.innerHTML = data.weather[0].description;
  }); 
};

//convert calc
const convertTemp = () => {
  
}

export { getCoordinate, getWeatherData }