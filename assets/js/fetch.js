'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
            debugger;
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
                console.log(element);
                var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + element + '&APPID=' + _this.key + '&units=metric';

                _this.getData(baseUrl).then(function (data) {
                    if (data) {
                        citiesData.push(data);
                        if (inputArray.length === citiesData.length) {
                            console.log(citiesData);
                            _this.ShowData(citiesData);
                        }
                    } else if (!data) {
                        citiesData.push({ code: '400' });
                        if (inputArray.length === citiesData.length) {
                            console.log(citiesData);
                            _this.ShowData(citiesData);
                        }
                    }
                }).catch(function (err) {
                    debugger;
                    citiesData.push({ code: '400' });
                    if (inputArray.length === citiesData.length) {
                        console.log(citiesData);
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

                    var condition = null;

                    if (element.main.temp <= 20) {
                        condition = 'danger';
                    } else if (element.main.temp > 20 && element.main.temp <= 34) {
                        condition = 'sunny';
                    } else {
                        condition = 'hot';
                    }

                    debugger;
                    var liNode = _this2.createNode('li', result, '');
                    var todaysDataDivNode = _this2.createNode('div', liNode, '');
                    var cityDetailsDivNode = _this2.createNode('div', todaysDataDivNode, '');
                    var headingNode = _this2.createNode('h3', cityDetailsDivNode, element.name + ', ' + element.sys.country);
                    var spanNode = _this2.createNode('span', cityDetailsDivNode, '' + element.weather[0].main);
                    var spanNode = _this2.createNode('span', cityDetailsDivNode, '' + element.weather[0].description);
                    var weatherDivNode = _this2.createNode('div', todaysDataDivNode, '');
                    var spanNode = _this2.createNode('span', weatherDivNode, 'humidity : &nbsp;&nbsp;&nbsp; ' + element.main.humidity + '%');
                    var spanNode = _this2.createNode('span', weatherDivNode, 'wind : &nbsp;&nbsp;&nbsp; ' + element.wind.speed + ' km/h');
                    var temperatureDivNode = _this2.createNode('div', todaysDataDivNode, '');
                    var figureNode = _this2.createNode('figure', temperatureDivNode, '<img src="http://openweathermap.org/img/wn/' + element.weather[0].icon + '@2x.png" alt="' + element.weather[0].main + '">');
                    var spanNode = _this2.createNode('span', temperatureDivNode, element.main.temp + '\xB0 c');
                    var anchorNode = _this2.createNode('a', todaysDataDivNode, 'forecast for next 5 days');

                    liNode.setAttribute('class', condition);
                    todaysDataDivNode.setAttribute('class', 'todays-data');
                    cityDetailsDivNode.setAttribute('class', 'city-details');
                    weatherDivNode.setAttribute('class', 'weather');
                    temperatureDivNode.setAttribute('class', 'temperature');
                    temperatureDivNode.setAttribute('data-id', '' + element.id);
                    anchorNode.setAttribute('href', '#FIXME');
                    anchorNode.setAttribute('data-id', '' + element.id);

                    temperatureDivNode.addEventListener('click', function () {
                        _this2.forecast(temperatureDivNode);
                    });

                    anchorNode.addEventListener('click', function () {
                        _this2.forecast(temperatureDivNode);
                    });
                } else if (element.code) {

                    var liNode = _this2.createNode('li', result, '');
                    var spanNode = _this2.createNode('span', liNode, 'sorry cant find the data for entered city');

                    liNode.setAttribute('class', 'hot-error');
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
                console.log(data);

                for (var i = 0; i < data.list.length; i += 8) {

                    debugger;
                    var liNode = _this3.createNode('li', ulNode, '');
                    var forecastedWeatherDivNode = _this3.createNode('div', liNode, '');
                    var spanNode = _this3.createNode('span', forecastedWeatherDivNode, '' + data.list[i].dt_txt.split(' ')[0]);
                    var spanNode = _this3.createNode('span', forecastedWeatherDivNode, 'humidity : &nbsp;&nbsp;&nbsp; ' + data.list[i].main.humidity + '%');
                    var spanNode = _this3.createNode('span', forecastedWeatherDivNode, 'wind : &nbsp;&nbsp;&nbsp; ' + data.list[i].wind.speed + ' km/h');
                    var temperatureDivNode = _this3.createNode('div', liNode, '');
                    var imageId = '' + data.list[i].weather[0].icon;
                    var figureNode = _this3.createNode('figure', temperatureDivNode, '<img src="http://openweathermap.org/img/wn/' + imageId + '@2x.png" alt="abc">');
                    var spanNode = _this3.createNode('span', temperatureDivNode, data.list[i].main.temp + '\xB0 c');

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