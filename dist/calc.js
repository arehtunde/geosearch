"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchMap = function fetchMap(e, t, o) {
  var a = "https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=Fo_wwTApyBNJTi6Z8xBahC6jJ17dv9REf5zmCQZg0_s&ctr=".concat(e.lat, ",").concat(e.lng, "&z=14&t=0&vt=0&f=0");
  document.querySelector(".map_image").style.backgroundImage = "url(".concat(a, ")");
  var n = document.querySelector(".location"),
      r = t.formatted;
  n.innerHTML = "" + r;
  var c = document.querySelector(".zipcode"),
      i = t.components.postcode,
      s = o.items[0].address.postalCode;
  c.innerHTML = void 0 === s && void 0 === i ? "not available" : "" + s || "" + i;
},
    renderData = function renderData(e, t) {
  document.querySelector(".temp").innerHTML = (e.main.temp - 273.15).toFixed(2) + "&deg;C";
  document.querySelector(".pressure").innerHTML = e.main.pressure + "hPa";
  document.querySelector(".humidity").innerHTML = e.main.humidity + "%";
  document.querySelector(".wind").innerHTML = e.wind.speed + "m/s";
  var o = document.querySelector(".time"),
      a = t.annotations.timezone.offset_sec;
  o.innerHTML = "GMT".concat(1 === Math.sign(a / 3600) || 0 === Math.sign(a / 3600) ? "+" : "").concat(a / 3600);
  var n = document.querySelector(".weather-icon_img"),
      r = document.querySelector(".weather-description"),
      c = "http://openweathermap.org/img/wn/".concat(e.weather[0].icon, "@2x.png");
  n.setAttribute("src", "" + c), r.innerHTML = e.weather[0].description;
},
    fetchData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var e, t, o, a, n, r, c, i, s, _yield$Promise$all, _yield$Promise$all2, _e, _t, _yield$Promise$all3, _yield$Promise$all4, _o, _a;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e = document.querySelector(".inputfield").value.trim();
            t = encodeURI(e);
            o = fetch("https://api.opencagedata.com/geocode/v1/json?q=".concat(t, "&key=173f9f1a42c64005be22065050aa936e&pretty=1&limit=1"));
            _context.next = 5;
            return o;

          case 5:
            a = _context.sent;
            _context.next = 8;
            return a.json();

          case 8:
            n = _context.sent;
            r = n.results[0].geometry;
            c = n.results[0];
            i = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(r.lat, "&lon=").concat(r.lng, "&appid=ec176773b43e5a5c331ce2f31b259053");
            s = "https://revgeocode.search.hereapi.com/v1/revgeocode?at=".concat(r.lat, ",").concat(r.lng, "&apiKey=Fo_wwTApyBNJTi6Z8xBahC6jJ17dv9REf5zmCQZg0_s");
            _context.prev = 13;
            _context.next = 16;
            return Promise.all([fetch(i), fetch(s)]);

          case 16:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            _e = _yield$Promise$all2[0];
            _t = _yield$Promise$all2[1];
            _context.next = 22;
            return Promise.all([_e.json(), _t.json()]);

          case 22:
            _yield$Promise$all3 = _context.sent;
            _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
            _o = _yield$Promise$all4[0];
            _a = _yield$Promise$all4[1];
            renderData(_o, c), fetchMap(r, c, _a);
            _context.next = 32;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](13);
            console.log("not found!");

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[13, 29]]);
  }));

  return function fetchData() {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchData = fetchData;