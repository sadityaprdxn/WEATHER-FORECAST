'use strict'
import validate from './validate.js';
import fetchData from './fetch.js';

window.onload = () => {

    const validation = new validate;
    const fetchDataNew = new fetchData;
    const page = document.querySelector('.container');

    if (page.classList.contains('home-page')) {

        const inputField = document.querySelector('#city-name');
        const submitButton = document.querySelector('button');
        const cityNameRegex = /^([\w\s\,])/;

        inputField.addEventListener('keyup', () => {
            validation.validate(inputField, cityNameRegex);
        });
        
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            if ( inputField.parentElement.classList.contains('success')) {
                
                var inputArray = inputField.value.toLowerCase().split(',');
                console.log(inputArray);

                fetchDataNew.weatherData(inputArray);

            } else if(inputField.parentElement.classList = 'form-group') { 
                alert('PLEASE ENTER THE CITY NAME');
            }
        });
    }
}

















