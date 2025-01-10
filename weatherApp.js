const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'e0ed21f9edfff0ec73040a840b184247';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response =>
        response.json()).then(json => {

            if (json.cod == 404) {
                container.computedStyleMap.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.computedStyleMap.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span')
            const description = document.querySelector('.weather-box .description');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png'
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png'
                    break;

                case 'Mist':
                    image.src = 'images/mist.png'
                    break;

                case 'Rain':
                    image.src = 'images/rain.png'
                    break;

                case 'Snow':
                    image.src = 'images/snow.png'
                    break;
                case 'Haze':
                    image.src = 'images/mist.png'
                    break;

                default:
                    image.src = 'images/cloud.png';
            }


            temperature.innerHTML = `${json.main.temp}<span>ºC</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed} km/h`;
        })
});