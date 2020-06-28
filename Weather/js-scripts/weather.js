let defaultCity = 'Новосибирск';
let isMetricModalVisible = false;
let openWeatherMapApiKey = '2f31698e2f03634b2c98674803c9e7f7';
let mapBoxGLAccessToken = 'pk.eyJ1IjoiYXJ0ZWVta3V6bmV0c292IiwiYSI6ImNrOGtpYzV1ejAxcWwzbXF3dDB1OTQ0bzEifQ.mxY67KUaSkCovBnH72wRRA';

function fillOldWeatherData() {
    fetch('json/current.json')
        .then(
            response => response.json().then(
                data => fillCurrentWeather(data)
            )
        )
        .catch(err => console.log(err))
    fetch('json/forecast.json')
        .then(
            response => response.json().then(
                data => fillForecast(data)
            )
        )
        .catch(err => console.log(err))
}

function fillCurrentWeather(data) {
    /* отображаем код страны в верхнем хэдере */
    setInner('ISO-3166-1-code', data.sys.country);
    document.getElementById('weather-briefly-img').src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
    setInner('weather-briefly-city', data.name);
    setInner('city', data.name);

    setInner('time', formatUnixTime(data.dt));
    setWeatherBlockColor(document.getElementById('weather-block'), data.dt, data.sys.sunrise, data.sys.sunset);

    let temperature = formatTemperature(data.main.temp);
    setInner('weather-briefly-degrees', temperature);
    setInner('block-degrees', temperature);
    setInner('block-weather-phrase', data.weather[0].description);

    setInner('latitude', data.coord.lat);
    setInner('longitude', data.coord.lon);

    mapboxgl.accessToken = mapBoxGLAccessToken;
    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://css/mapbox/streets-v11', // stylesheet location
        center: [data.coord.lon, data.coord.lat], // starting position [lng, lat]
        zoom: 11 // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());

    document.getElementById('current-weather-block-img').src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
    setInner('block-feels-phrase', formatTemperature(data.main.feels_like));
    setInner('cloudiness', data.clouds.all + '%');
    if (data.wind.deg != null) setInner('now-wind', formatWindAzimuth(data.wind.deg) + ' ' + Math.round(data.wind.speed) + ' м/с');
    setInner('now-humidity', data.main.humidity + '%');
    setInner('now-deviation', calcDeviation(data.main.temp, data.main.temp_min, data.main.temp_max));
    setInner('now-pressure', data.main.pressure + ' мбар');
    setInner('now-visibility', formatVisibility(data.visibility));

    let sunrise = formatUnixTimeToLocal(data.sys.sunrise, data.timezone);
    let sunset = formatUnixTimeToLocal(data.sys.sunset, data.timezone);

    setInner('sunrise-time', sunrise);
    setInner('day-duration', diffTime(sunrise, sunset));
    setInner('sunset-time', sunset);
}

function fillForecast(data) {
    let widgetHeaders = formatWidgetHeaders(data.list[0].dt);
    for (let i = 0; i < 5; i++) setInner('day-part-' + i, widgetHeaders[i]);
    /* прогноз погоды на время, которое показывают блоки в виджете:
    * 1 - через 3 ч, 2 - 6 ч, 3 - 12 ч, 4 - 18 ч, 5 - 24 ч
    * */
    document.getElementById('day-part-img-0').src = 'http://openweathermap.org/img/wn/'
        + data.list[0].weather[0].icon + '@2x.png';
    document.getElementById('day-part-img-1').src = 'http://openweathermap.org/img/wn/'
        + data.list[1].weather[0].icon + '@2x.png';
    document.getElementById('day-part-img-2').src = 'http://openweathermap.org/img/wn/'
        + data.list[3].weather[0].icon + '@2x.png';
    document.getElementById('day-part-img-3').src = 'http://openweathermap.org/img/wn/'
        + data.list[5].weather[0].icon + '@2x.png';
    document.getElementById('day-part-img-4').src = 'http://openweathermap.org/img/wn/'
        + data.list[7].weather[0].icon + '@2x.png';
    setInner('day-part-temp-0', formatTemperature(data.list[0].main.temp));
    setInner('day-part-temp-1', formatTemperature(data.list[1].main.temp));
    setInner('day-part-temp-2', formatTemperature(data.list[3].main.temp));
    setInner('day-part-temp-3', formatTemperature(data.list[5].main.temp));
    setInner('day-part-temp-4', formatTemperature(data.list[7].main.temp));

    setInner('day-part-humidity-0', data.list[0].main.humidity + '%');
    setInner('day-part-humidity-1', data.list[1].main.humidity + '%');
    setInner('day-part-humidity-2', data.list[3].main.humidity + '%');
    setInner('day-part-humidity-3', data.list[5].main.humidity + '%');
    setInner('day-part-humidity-4', data.list[7].main.humidity + '%');

    let description = firstLetterUpper(data.list[7].weather[0].description);
    let sum = 0;
    for (let i = 0; i < 8; i++) sum += data.list[i].main.temp;
    let avg = Math.round(sum / 8);
    setInner('details-description', description + '. Средняя температура за сутки будет составлять ' +
        formatTemperature(avg) + '.');

    setInner('detail-wind', formatWindAzimuth(data.list[7].wind.deg) // данные через 24 часа
        + ' ' + Math.round(data.list[7].wind.speed) + ' м/с');
    setInner('detail-humidity', data.list[7].main.humidity + '%');
    setInner('detail-cloudiness', data.list[7].clouds.all + '%');
    setInner('detail-pressure', data.list[7].main.pressure + ' мбар');
}

/* ПРЕДУПРЕЖДЕНИЕ: при выполнении более чем 60 запросов за минуту аккаунт OpenWeatherMap будет временно заблокирован!!! */
function requestWeather(city) {
    let degrees;
    if (document.getElementById('degrees').innerText === '°C')
        degrees = 'metric';
    else if (document.getElementById('degrees').innerText === '°F')
        degrees = 'imperial';

    /* запрос текущей погоды */
    /* иногда при отправке запроса приходит ошибка 'has been blocked by CORS policy' */
    /* иногда погода получается очень долго */
    /* для всех этих случаев погода сохраняется в json и предварительно вставляются данные именно оттуда */
    fetch('https://cors-anywhere.herokuapp.com/' +
        'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + openWeatherMapApiKey + '&units=' + degrees + '&lang=ru')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    alert('При получении данных с сервера OpenWeatherMap произошла ошибка. ' +
                        'Обновите страницу или проверьте корректность введенных данных.');
                }
                response.json().then(function (data) {
                    console.log('Current weather:');
                    console.log(data);
                    if (!data.message) { // если нам не возвращают json с месседжем ошибки
                        // отправляем полученные данные в скрипт, который их сохранит на сервере
                        let current = new FormData();
                        current.append('json', JSON.stringify(data));
                        current.append('type', 'current');
                        fetch('php-scripts/save-json.php', {
                            method: 'POST',
                            body: current
                        }).then(r => console.log(r));
                        // страница параллельно заполняется свежими данными
                        fillCurrentWeather(data);
                    } else {
                        console.log(data.message);
                    }
                });
            })
        .catch(function (err) {
            console.log(err);
        });

    /* запрос прогноза погоды на 5 дней с интервалом каждые 3 часа */
    /* 8 элементов в массиве data.list == 24 часа */
    fetch('https://cors-anywhere.herokuapp.com/' +
        'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + openWeatherMapApiKey + '&units=' + degrees + '&lang=ru')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                }
                response.json().then(function (data) {
                    console.log('Forecast (5 days / 3 hours):');
                    console.log(data);
                    if (!data.message) { // если нам не возвращают json с месседжем ошибки
                        let forecast = new FormData();
                        forecast.append('json', JSON.stringify(data));
                        forecast.append('type', 'forecast');
                        fetch('php-scripts/save-json.php', {
                            method: 'POST',
                            body: forecast
                        }).then(r => console.log(r));
                        fillForecast(data);
                    } else {
                        console.log(data.message);
                    }
                });
            })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function inputPredict(text) {
    fetch('php-scripts/input-prediction.php?input=' + text)
        .then(response => {
                if (response.status === 200) {
                    response.json().then(function (data) {
                        if (data.length > 0) {
                            console.log(data);
                            let list = document.getElementById('predict-list');
                            let oldList = document.getElementsByClassName('predicted-city');
                            while (oldList[0]) {
                                oldList[0].remove();
                            }
                            data.forEach(city => {
                                let html = '<div class="predicted-city" onclick="' +
                                    'hideModal(\'modal-predict\');' +
                                    'document.getElementById(\'input\').value = this.innerText;' +
                                    'requestWeather(this.innerText)">' + city + '</div>'
                                list.insertAdjacentHTML('afterbegin', html);
                            })

                            showModal('modal-predict');
                        }
                    })
                }
            }
        )
        .catch(error => {
            console.error(error);
        });
}

function setInner(id, text) {
    document.getElementById(id).innerText = text;
}

function firstLetterUpper(sentence) {
    sentence = sentence.charAt(0).toUpperCase() + sentence.substr(1);
    return sentence;
}

function formatTemperature(degrees) {
    let temp = Math.round(degrees);
    return temp + '°';
}

/* для работы со временем текущей таймзоны - левый виджет */
function formatUnixTime(time) {
    let currentDate = new Date(time * 1000);
    let hours = currentDate.getHours();
    let minutes = '0' + currentDate.getMinutes();
    return hours + ':' + minutes.substr(-2);
}

/* для перевода правого виджета "длительность светового дня" при выборе города с другим часовым поясом */
function formatUnixTimeToLocal(time, timezone) {
    let currentDate = new Date(time * 1000);
    currentDate.setSeconds(currentDate.getSeconds() + timezone);
    let hours = currentDate.getUTCHours();
    let minutes = '0' + currentDate.getUTCMinutes();
    return hours + ':' + minutes.substr(-2);
}

function diffTime(time1, time2) {
    let arr1 = time1.split(':');
    let minutes1 = parseInt(arr1[0]) * 60 + parseInt(arr1[1]);

    let arr2 = time2.split(':');
    let minutes2 = parseInt(arr2[0]) * 60 + parseInt(arr2[1]);

    let minutesDiff = minutes2 - minutes1;
    let hours = Math.trunc(minutesDiff / 60); // берем целую часть при делении на 60 минут, получаем часы
    let minutes = minutesDiff % 60; // дробная часть - минуты
    return hours + ' ч ' + minutes + ' мин';
}

function formatWindAzimuth(degrees) {
    let windDirection;
    switch (true) {
        case (degrees > 0 && degrees < 90): // degrees in range [0, 90)
            if (degrees < 45) windDirection = 'ССВ';
            else windDirection = 'ВСВ';
            break;
        case (degrees === 90):
            windDirection = 'В';
            break;
        case (degrees > 90 && degrees < 180):
            if (degrees < 135) windDirection = 'ВЮВ';
            else windDirection = 'ЮЮВ';
            break;
        case (degrees === 180):
            windDirection = 'Ю';
            break;
        case (degrees > 180 && degrees < 270):
            if (degrees < 225) windDirection = 'ЮЮЗ';
            else windDirection = 'ЗЮЗ';
            break;
        case (degrees === 270):
            windDirection = 'З';
            break;
        case (degrees > 270 && degrees < 360): // 360 degrees == 0
            if (degrees < 315) windDirection = 'ЗСЗ';
            else windDirection = 'ССЗ';
            break;
        case (degrees === 0 || degrees === 360):
            windDirection = 'С';
            break;
    }
    return windDirection;
}

function calcDeviation(current, min, max) {
    let deviation = Math.abs(current - (min + max) / 2); // ищем отклонение от текущей температуры по модулю
    return deviation.toFixed(1) + '°'; // затем округляем значение до целого
}

function formatVisibility(meters) {
    if (meters > 1000) {
        return meters / 1000 + ' км';
    } else return meters + ' м';
}

function formatWidgetHeaders(after3h) { // время через 3 часа в выбранном городе
    let date = new Date(after3h * 1000);
    let hours = date.getHours();
    let timesOfDay = [
        'СЕГОДНЯ НОЧЬЮ',
        'СЕГОДНЯ УТРОМ',
        'СЕГОДНЯ ДНЕМ',
        'СЕГОДНЯ ВЕЧЕРОМ',
        'ЗАВТРА НОЧЬЮ',
        'ЗАВТРА УТРОМ',
        'ЗАВТРА ДНЕМ',
        'ЗАВТРА ВЕЧЕРОМ'
    ];
    let widgetHeaders;
    /* будем считать что: с 5 до 11 утро; с 11 до 17 день; с 17 до 23 вечер; с 23 до 5 ночь */
    switch (true) {
        case (hours >= 23 || hours < 5): // ночь
            widgetHeaders = [timesOfDay[0], timesOfDay[1], timesOfDay[2], timesOfDay[3], timesOfDay[4]];
            break;
        case (hours >= 5 && hours < 11): // утро
            widgetHeaders = [timesOfDay[1], timesOfDay[2], timesOfDay[3], timesOfDay[4], timesOfDay[5]];
            break;
        case (hours >= 11 && hours < 17): // день
            widgetHeaders = [timesOfDay[2], timesOfDay[3], timesOfDay[4], timesOfDay[5], timesOfDay[6]];
            break;
        case (hours >= 17 && hours < 23): // вечер
            widgetHeaders = [timesOfDay[3], timesOfDay[4], timesOfDay[5], timesOfDay[6], timesOfDay[7]];
            break;
    }
    return widgetHeaders;
}

function rotateArrow(index) {
    let arrow = document.getElementsByClassName('down-arrow-img')[index];
    if (arrow.style.transform === '' || arrow.style.transform === 'rotate(0deg)')
        arrow.style.transform = 'rotate(180deg)';
    else arrow.style.transform = 'rotate(0deg)';
}

function hideModal(id) {
    document.getElementById(id).style.display = 'none';
}

function showModal(id) {
    document.getElementById(id).style.display = 'block';
}

function selectBlock(index) {
    if (document.getElementById('widget-block-' + index).className === 'widget-block') { // если к данному элементу не применен класс widget-block-selected
        for (let i = 1; i <= 5; i++) {
            /* нужно перебрать все блоки, чтобы обнаружить расширенные и сузить их */
            if (document.getElementById('widget-block-' + i).className === 'widget-block widget-block-selected') { // если блок расширен
                document.getElementById('widget-block-' + i).classList.remove('widget-block-selected'); // сужаем этот блок
                document.getElementById('triangle-' + i).style.opacity = '0'; // скрываем треугольник снизу
            }
        }
        /* расширяем блок, с которым произошло взаимодействие */
        document.getElementById('widget-block-' + index).classList.toggle('widget-block-selected');
        /* делаем треугольник снизу видимым */
        document.getElementById('triangle-' + index).style.opacity = '1';
    }
}

function setWeatherBlockColor(weatherBlock, currentTime, sunrise, sunset) {
    /* если текущее время в городе больше времени заката и меньше времени восхода, красим блок в темный */
    if (currentTime > sunset || currentTime < sunrise) weatherBlock.style.background = 'linear-gradient(180deg, rgb(16, 38, 103) 0%, rgb(37, 89, 170) 100%)';
    /* иначе в светлый */
    else weatherBlock.style.background = 'linear-gradient(0deg, rgb(85,167,212) 0%, rgb(59,88,202) 100%)';
}