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
                element = element.trim();
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

                    console.log(element);

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

                    debugger;
                    var liNode = _this2.createNode('li', result, '');
                    var todaysDataDivNode = _this2.createNode('div', liNode, '');
                    var cityDetailsDivNode = _this2.createNode('div', todaysDataDivNode, '');
                    var headingNode = _this2.createNode('h3', cityDetailsDivNode, name + ', ' + country);
                    var spanNode = _this2.createNode('span', cityDetailsDivNode, '' + main);
                    var spanNode = _this2.createNode('span', cityDetailsDivNode, '' + description);
                    var weatherDivNode = _this2.createNode('div', todaysDataDivNode, '');
                    var spanNode = _this2.createNode('span', weatherDivNode, 'humidity : &nbsp;&nbsp;&nbsp; ' + humidity + '%');
                    var spanNode = _this2.createNode('span', weatherDivNode, 'wind : &nbsp;&nbsp;&nbsp; ' + speed + ' km/h');
                    var temperatureDivNode = _this2.createNode('div', todaysDataDivNode, '');
                    var figureNode = _this2.createNode('figure', temperatureDivNode, '<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" alt="' + main + '">');
                    var spanNode = _this2.createNode('span', temperatureDivNode, temp + '\xB0 c');
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

                    debugger;
                    var liNode = _this3.createNode('li', ulNode, '');
                    var forecastedWeatherDivNode = _this3.createNode('div', liNode, '');
                    var spanNode = _this3.createNode('span', forecastedWeatherDivNode, '' + dt_txt.split(' ')[0]);
                    var spanNode = _this3.createNode('span', forecastedWeatherDivNode, 'humidity : &nbsp;&nbsp;&nbsp; ' + humidity + '%');
                    var spanNode = _this3.createNode('span', forecastedWeatherDivNode, 'wind : &nbsp;&nbsp;&nbsp; ' + speed + ' km/h');
                    var temperatureDivNode = _this3.createNode('div', liNode, '');
                    // var imageId = `${data.list[i].weather[0].icon}`;
                    var figureNode = _this3.createNode('figure', temperatureDivNode, '<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" alt="abc">');
                    var spanNode = _this3.createNode('span', temperatureDivNode, temp + '\xB0 c');

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