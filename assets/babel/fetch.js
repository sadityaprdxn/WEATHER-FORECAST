export default class fetchData {


    // function for getting the data
    getData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (response.ok ) {return response.json()};
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    weatherData(inputArray) {

        
        this.key = '2790c7c906014ddad919cfb3a389e1c7';
        const citiesData = new Array;

        inputArray.forEach(element => {
            element = element.trim();
            const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${element}&APPID=${this.key}&units=metric`;

            this.getData(baseUrl).then((data) => {
                if( data ) {
                    citiesData.push(data);
                    if (inputArray.length === citiesData.length) {
                        this.ShowData(citiesData);
                    }
                } else if (!data ) {
                    citiesData.push({ code: '400' });
                    if (inputArray.length === citiesData.length) {
                        this.ShowData(citiesData);
                    }
                }
            }).catch((err) => {
                citiesData.push({ code: '400' })
                if (inputArray.length === citiesData.length) {
                    this.ShowData(citiesData);
                }
            })
        });

    }

    ShowData(cityWeatherData) {

        const result = document.querySelector('.result ul');
        result.innerHTML = '';

        cityWeatherData.forEach(element => {
            if (!element.code) {

                const {main:{temp,humidity}, sys:{country}, weather:[{main,description,icon}], name, id, wind: {speed}} = element;
                let condition = null;

                if (temp <= 20) {
                    condition = 'danger';
                } else if (temp > 20 && temp <= 34) {
                    condition = 'sunny';
                } else {
                    condition = 'hot';
                }

                const liNode = this.createNode('li', result, '');
                const todaysDataDivNode = this.createNode('div', liNode, '');
                const cityDetailsDivNode = this.createNode('div', todaysDataDivNode, '');
                this.createNode('h3', cityDetailsDivNode, `${name}, ${country}`);
                this.createNode('span', cityDetailsDivNode, `${main}`);
                this.createNode('span', cityDetailsDivNode, `${description}`);
                const weatherDivNode = this.createNode('div', todaysDataDivNode, '');
                this.createNode('span', weatherDivNode, `humidity : &nbsp;&nbsp;&nbsp; ${humidity}%`);
                this.createNode('span', weatherDivNode, `wind : &nbsp;&nbsp;&nbsp; ${speed} km/h`);
                const temperatureDivNode = this.createNode('div', todaysDataDivNode, '');
                this.createNode('figure', temperatureDivNode, `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${main}">`);
                this.createNode('span', temperatureDivNode, `${temp}° c`);
                const anchorNode = this.createNode('a', todaysDataDivNode, `forecast for next 5 days`);

                liNode.setAttribute('class', condition);
                todaysDataDivNode.setAttribute('class', 'todays-data');
                cityDetailsDivNode.setAttribute('class', 'city-details');
                weatherDivNode.setAttribute('class', 'weather');
                temperatureDivNode.setAttribute('class', 'temperature');
                temperatureDivNode.setAttribute('data-id', `${id}`);
                anchorNode.setAttribute('href', '#FIXME');
                anchorNode.setAttribute('data-id', `${id}`);

                temperatureDivNode.addEventListener('click', () => {
                    this.forecast(temperatureDivNode);
                });

                anchorNode.addEventListener('click', () => {
                    this.forecast(temperatureDivNode);
                });

            } else if (element.code) {

                const liNode = this.createNode('li', result, '');
                this.createNode('span', liNode, 'sorry cant find the data for entered city');

                liNode.setAttribute('class', 'hot-error');
            }
        });

        result.parentElement.parentElement.classList.add('active');
    }

    // function for creating elements
    createNode(node, place, text) {
        const elementNode = document.createElement(node);
        elementNode.innerHTML = text;
        place.appendChild(elementNode);

        return elementNode;
    }

    forecast(element) {

        const id = parseInt(element.getAttribute('data-id'));
        const contractualUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${this.key}&units=metric`;
        const output = element.parentElement.parentElement;

        this.getData(contractualUrl).then((data) => {


            const ulNode = this.createNode('ul', output, '');

            const {list} = data

            for (let i = 0; i < list.length; i += 8) {

                const {dt_txt, main:{humidity,temp}, wind:{speed}, weather:[{icon}]} = list[i];

                const liNode = this.createNode('li', ulNode, '');
                const forecastedWeatherDivNode = this.createNode('div', liNode, '');
                this.createNode('span', forecastedWeatherDivNode, `${dt_txt.split(' ')[0]}`);
                this.createNode('span', forecastedWeatherDivNode, `humidity : &nbsp;&nbsp;&nbsp; ${humidity}%`);
                this.createNode('span', forecastedWeatherDivNode, `wind : &nbsp;&nbsp;&nbsp; ${speed} km/h`);
                const temperatureDivNode = this.createNode('div', liNode, '');
                this.createNode('figure', temperatureDivNode, `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="abc">`);
                this.createNode('span', temperatureDivNode, `${temp}° c`);

                forecastedWeatherDivNode.setAttribute('class', 'forecasted-weather');
                temperatureDivNode.setAttribute('class', 'forecasted-temperature');
            }


            ulNode.setAttribute('class', 'forecast-data active');

        }).catch(() => {
            alert('something went wrong');
        })
    }
}