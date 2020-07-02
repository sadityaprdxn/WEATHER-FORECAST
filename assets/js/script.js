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