"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resultPage = exports.renderImage = exports.renderData = void 0;

var intro = document.querySelector(".content_input"),
    main = document.querySelector(".main"),
    features = document.querySelector(".features"),
    createNode = function createNode(a) {
  return document.createElement(a);
},
    append = function append(a, e) {
  return a.append(e);
},
    renderData = function renderData() {
  var a = createNode("div");
  a.className = "main_result", append(main, a), a.innerHTML = '\n    <section class="data_holder">\n      <div class="features_card">\n        <p>Location: <span class="location">Lagos</span></p>\n        <p>Postal Code: <span class="zipcode">200285</span></p>\n\n        <ul class="weather">\n          <li class="weather-holder"><span class="weather-name">Temperature:</span><span class="weather-value">100</span></li>\n          <li class="weather-holder"><span class="weather-name">Pressure:</span><span class="weather-value">100</span></li>\n          <li class="weather-holder"><span class="weather-name">Humidity:</span><span class="weather-value">100</span></li>\n          <li class="weather-holder"><span class="weather-name">Precipitation:</span> <span class="weather-value">100</span></li>\n          <li class="weather-holder"><span class="weather-name">Wind:</span><span class="weather-value">100</span></li>\n          <li class="weather-holder"><span class="weather-name">Timezone:</span><span class="weather-value">100</span></li>\n        </ul>\n\n        <button class="button btn btn-convert"><i class="fas fa-thermometer-half btn-icon"></i><span class="btn-text">Convert C to F</span></button>\n\n        <button class="button btn btn-share"><i class="fab fa-facebook-f btn-icon"></i><span class="btn-text">Share to Facebook</span></button>\n\n        <button class="button btn btn-switch"><i class="fas fa-toggle-on btn-icon"></i><span class="btn-text">Switch to Satellite View</span></button>\n      </div>\n    </section>\n\n    <section class="map">\n      <div class="map_image"></div>\n    </section>\n  ';
},
    renderImage = function renderImage() {
  var a = createNode("section");
  a.className = "landmark", append(main, a), a.innerHTML = '<div class="landmark_images"></div>';
},
    resultPage = function resultPage() {
  intro.style.display = "none", features.style.display = "none";
};

exports.resultPage = resultPage;
exports.renderImage = renderImage;
exports.renderData = renderData;