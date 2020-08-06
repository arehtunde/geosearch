"use strict";

var _calc = require("./calc.js");

var intro = document.querySelector(".content_input"),
    main = document.querySelector(".main"),
    features = document.querySelector(".features");
var foot = document.querySelector(".foot");

var renderData = function renderData() {
  intro.remove(), features.remove();
  var e = document.querySelector(".content"),
      a = document.createElement("div");
  a.className = "city_info", main.append(a), a.before(e), a.innerHTML = '\n    <p>Postal Code: <span class="zipcode"></span></p>\n    <p class="local">Location: <span class="location"></span></p>\n  ';
  var n = document.createElement("div");
  n.className = "main_result", main.append(n), n.after(foot), n.innerHTML = '\n    <section class="data_holder">\n      <div class="features_card card2">\n        <div class="icon">\n          <div class="weather-icon">\n            <img class="weather-icon_img">\n          </div>\n          <p class="weather-description"></p>\n        </div>\n        <ul class="weather">\n          <li class="weather-holder"><span class="weather-name">Temperature:</span><span class="weather-value temp"></span></li>\n          <li class="weather-holder"><span class="weather-name">Pressure:</span><span class="weather-value pressure"></span></li>\n          <li class="weather-holder"><span class="weather-name">Humidity:</span><span class="weather-value humidity"></span></li>\n          <li class="weather-holder"><span class="weather-name">Wind:</span><span class="weather-value wind"></span></li>\n          <li class="weather-holder"><span class="weather-name">Timezone:</span><span class="weather-value time"></span></li>\n        </ul>\n\n        <button class="button btn btn-convert"><i class="fas fa-thermometer-half btn-icon"></i><span class="btn-text convert">Convert C to F</span></button>\n\n        <a href="https://www.facebook.com/login/" target=_blank><button class="button btn btn-share"><i class="fab fa-facebook-f btn-icon"></i><span class="btn-text share">Share to Facebook</span></button></a>\n\n        <button class="button btn btn-switch"><i class="fas fa-toggle-on btn-icon"></i><span class="btn-text switch">Switch Map View</span></button>\n      </div>\n    </section>\n\n    <section class="map">\n      <div class="map_image"></div>\n    </section>\n  ';
  var t = document.createElement("section");
  t.className = "landmark", main.append(t), t.after(foot), t.innerHTML = '<div class="landmark_images"></div>';
},
    resultPage = function resultPage() {
  (0, _calc.getCoordinate)(), (0, _calc.getWeatherData)();
},
    button = document.querySelector(".button");

button.addEventListener("click", renderData, {
  once: !0
}), button.addEventListener("click", resultPage);