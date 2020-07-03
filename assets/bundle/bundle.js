(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fetchData = function () {
    function fetchData() {
        _classCallCheck(this, fetchData);
    }

    _createClass(fetchData, [{
        key: 'getData',


        // function for getting the data
        value: function getData(url) {
            return new Promise(function (resolve, reject) {
                fetch(url).then(function (response) {
                    if (response.ok) {
                        return response.json();
                    };
                }).then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }, {
        key: 'weatherData',
        value: function weatherData(inputArray) {
            var _this = this;

            this.key = '2790c7c906014ddad919cfb3a389e1c7';
            var citiesData = new Array();

            inputArray.forEach(function (element) {
                element = element.trim();
                var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + element + '&APPID=' + _this.key + '&units=metric';

                _this.getData(baseUrl).then(function (data) {
                    if (data) {
                        citiesData.push(data);
                        if (inputArray.length === citiesData.length) {
                            _this.ShowData(citiesData);
                        }
                    } else if (!data) {
                        citiesData.push({ code: '400' });
                        if (inputArray.length === citiesData.length) {
                            _this.ShowData(citiesData);
                        }
                    }
                }).catch(function (err) {
                    citiesData.push({ code: '400' });
                    if (inputArray.length === citiesData.length) {
                        _this.ShowData(citiesData);
                    }
                });
            });
        }
    }, {
        key: 'ShowData',
        value: function ShowData(cityWeatherData) {
            var _this2 = this;

            var result = document.querySelector('.result ul');
            result.innerHTML = '';

            cityWeatherData.forEach(function (element) {
                if (!element.code) {
                    var _element$main = element.main,
                        temp = _element$main.temp,
                        humidity = _element$main.humidity,
                        country = element.sys.country,
                        _element$weather = _slicedToArray(element.weather, 1),
                        _element$weather$ = _element$weather[0],
                        main = _element$weather$.main,
                        description = _element$weather$.description,
                        icon = _element$weather$.icon,
                        name = element.name,
                        id = element.id,
                        speed = element.wind.speed;

                    var condition = null;

                    if (temp <= 20) {
                        condition = 'danger';
                    } else if (temp > 20 && temp <= 34) {
                        condition = 'sunny';
                    } else {
                        condition = 'hot';
                    }

                    var liNode = _this2.createNode('li', result, '');
                    var todaysDataDivNode = _this2.createNode('div', liNode, '');
                    var cityDetailsDivNode = _this2.createNode('div', todaysDataDivNode, '');
                    _this2.createNode('h3', cityDetailsDivNode, name + ', ' + country);
                    _this2.createNode('span', cityDetailsDivNode, '' + main);
                    _this2.createNode('span', cityDetailsDivNode, '' + description);
                    var weatherDivNode = _this2.createNode('div', todaysDataDivNode, '');
                    _this2.createNode('span', weatherDivNode, 'humidity : &nbsp;&nbsp;&nbsp; ' + humidity + '%');
                    _this2.createNode('span', weatherDivNode, 'wind : &nbsp;&nbsp;&nbsp; ' + speed + ' km/h');
                    var temperatureDivNode = _this2.createNode('div', todaysDataDivNode, '');
                    _this2.createNode('figure', temperatureDivNode, '<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" alt="' + main + '">');
                    _this2.createNode('span', temperatureDivNode, temp + '\xB0 c');
                    var anchorNode = _this2.createNode('a', todaysDataDivNode, 'forecast for next 5 days');

                    liNode.setAttribute('class', condition);
                    todaysDataDivNode.setAttribute('class', 'todays-data');
                    cityDetailsDivNode.setAttribute('class', 'city-details');
                    weatherDivNode.setAttribute('class', 'weather');
                    temperatureDivNode.setAttribute('class', 'temperature');
                    temperatureDivNode.setAttribute('data-id', '' + id);
                    anchorNode.setAttribute('href', '#FIXME');
                    anchorNode.setAttribute('data-id', '' + id);

                    temperatureDivNode.addEventListener('click', function () {
                        _this2.forecast(temperatureDivNode);
                    });

                    anchorNode.addEventListener('click', function () {
                        _this2.forecast(temperatureDivNode);
                    });
                } else if (element.code) {

                    var _liNode = _this2.createNode('li', result, '');
                    _this2.createNode('span', _liNode, 'sorry cant find the data for entered city');

                    _liNode.setAttribute('class', 'hot-error');
                }
            });

            result.parentElement.parentElement.classList.add('active');
        }

        // function for creating elements

    }, {
        key: 'createNode',
        value: function createNode(node, place, text) {
            var elementNode = document.createElement(node);
            elementNode.innerHTML = text;
            place.appendChild(elementNode);

            return elementNode;
        }
    }, {
        key: 'forecast',
        value: function forecast(element) {
            var _this3 = this;

            var id = parseInt(element.getAttribute('data-id'));
            var contractualUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=' + id + '&appid=' + this.key + '&units=metric';
            var output = element.parentElement.parentElement;

            this.getData(contractualUrl).then(function (data) {

                var ulNode = _this3.createNode('ul', output, '');

                var list = data.list;


                for (var i = 0; i < list.length; i += 8) {
                    var _list$i = list[i],
                        dt_txt = _list$i.dt_txt,
                        _list$i$main = _list$i.main,
                        humidity = _list$i$main.humidity,
                        temp = _list$i$main.temp,
                        speed = _list$i.wind.speed,
                        _list$i$weather = _slicedToArray(_list$i.weather, 1),
                        icon = _list$i$weather[0].icon;

                    var liNode = _this3.createNode('li', ulNode, '');
                    var forecastedWeatherDivNode = _this3.createNode('div', liNode, '');
                    _this3.createNode('span', forecastedWeatherDivNode, '' + dt_txt.split(' ')[0]);
                    _this3.createNode('span', forecastedWeatherDivNode, 'humidity : &nbsp;&nbsp;&nbsp; ' + humidity + '%');
                    _this3.createNode('span', forecastedWeatherDivNode, 'wind : &nbsp;&nbsp;&nbsp; ' + speed + ' km/h');
                    var temperatureDivNode = _this3.createNode('div', liNode, '');
                    _this3.createNode('figure', temperatureDivNode, '<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" alt="abc">');
                    _this3.createNode('span', temperatureDivNode, temp + '\xB0 c');

                    forecastedWeatherDivNode.setAttribute('class', 'forecasted-weather');
                    temperatureDivNode.setAttribute('class', 'forecasted-temperature');
                }

                ulNode.setAttribute('class', 'forecast-data active');
            }).catch(function () {
                alert('something went wrong');
            });
        }
    }]);

    return fetchData;
}();

exports.default = fetchData;
},{}],2:[function(require,module,exports){
'use strict';

var _validate = require('./validate.js');

var _validate2 = _interopRequireDefault(_validate);

var _fetch = require('./fetch.js');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {

    var validation = new _validate2.default();
    var fetchDataNew = new _fetch2.default();
    var page = document.querySelector('.container');

    if (page.classList.contains('home-page')) {

        var inputField = document.querySelector('#city-name');
        var submitButton = document.querySelector('button');
        var cityNameRegex = /^([\w\s\,])/;

        inputField.addEventListener('keyup', function () {
            validation.validate(inputField, cityNameRegex);
        });

        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            if (inputField.parentElement.classList.contains('success')) {

                var inputArray = inputField.value.toLowerCase().split(',');
                console.log(inputArray);

                fetchDataNew.weatherData(inputArray);
            } else if (inputField.parentElement.classList = 'form-group') {
                alert('PLEASE ENTER THE CITY NAME');
            }
        });
    }
};
},{"./fetch.js":1,"./validate.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validation = function () {
    function validation() {
        _classCallCheck(this, validation);
    }

    _createClass(validation, [{
        key: "validate",


        // function for input validate the regex
        value: function validate(input, RegularExpression) {
            var parent = input.parentNode;
            var regexValidator = /([0-9!@#$%^&*()~<>])/;

            if (input.value == "") {
                parent.classList = "form-group";
            } else if (RegularExpression.test(input.value) && !regexValidator.test(input.value)) {
                parent.classList = "form-group success";
            } else {
                parent.classList = "form-group error";
            }
        }
    }]);

    return validation;
}();

exports.default = validation;
},{}]},{},[2]);
