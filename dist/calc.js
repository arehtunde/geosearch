"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeatherData = exports.getCoordinate = void 0;

var getCoordinate = function getCoordinate() {
  var e = "geocode?q=" + document.querySelector(".inputfield").value,
      t = encodeURI(e);
  return fetch("https://geocode.search.hereapi.com/v1/".concat(t, "&apiKey=Fo_wwTApyBNJTi6Z8xBahC6jJ17dv9REf5zmCQZg0_s")).then(function (e) {
    return e.json();
  }).then(function (e) {
    var t = e.items[0].title;
    document.querySelector(".location").innerHTML = "" + t;
    var n = e.items[0].address.postalCode;
    document.querySelector(".zipcode").innerHTML = void 0 === n ? "not available" : "" + n;
    var o = e.items[0].position,
        r = "https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=Fo_wwTApyBNJTi6Z8xBahC6jJ17dv9REf5zmCQZg0_s&".concat("ctr=".concat(o.lat, ",").concat(o.lng), "&z=14&t=0&vt=0&f=0");
    return document.querySelector(".map_image").style.backgroundImage = "url(".concat(r, ")");
  });
},
    getWeatherData = function getWeatherData() {
  var e = "q=" + document.querySelector(".inputfield").value,
      t = encodeURI(e);
  return fetch("https://api.openweathermap.org/data/2.5/weather?".concat(t, "&appid=ec176773b43e5a5c331ce2f31b259053")).then(function (e) {
    return e.json();
  }).then(function (e) {
    document.querySelector(".temp").innerHTML = "" + e.main.temp;
    document.querySelector(".pressure").innerHTML = e.main.pressure + "hPa";
    document.querySelector(".humidity").innerHTML = e.main.humidity + "%";
    document.querySelector(".wind").innerHTML = e.wind.speed + "m/s";
    document.querySelector(".time").innerHTML = "GMT".concat(1 === Math.sign(e.timezone / 3600) ? "+" : "").concat(e.timezone / 3600);
    var t = document.querySelector(".weather-icon_img"),
        n = document.querySelector(".weather-description"),
        o = "http://openweathermap.org/img/wn/".concat(e.weather[0].icon, "@2x.png");
    t.setAttribute("src", "" + o), n.innerHTML = e.weather[0].description;
  });
},
    convertTemp = function convertTemp() {};

exports.getWeatherData = getWeatherData;
exports.getCoordinate = getCoordinate;