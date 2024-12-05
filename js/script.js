const apiKey = '704bbe8d5d9553e4f166009ed3e5d0e4';

function getWeather(){
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then (response => {
            if (!response.ok){
                throw new Error('Cidade não encontrada!');
            }
            return response.json();
    })
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        document.getElementById('weather-info').innerHTML = `<p>${error.message}</p>`;
    });

    const cidadeAtual = document.getElementById('city-banner');
    cidadeAtual.style.display = 'none';
}

function displayWeather(data){
    const weatherInfo = document.getElementById('weather-info');

    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const weatherDescription = data.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const countryCode = data.sys.country;
    const flagIcon = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;

    weatherInfo.innerHTML = `
        <div style="display : flex; justify-content : space-around; align-items : center; width : 100%">
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="${flagIcon}" alt="Bandeira de ${data.sys.country}" style="width: 40px; height: auto;">
            <p>${temperature}C</p>
            <img src="${icon}">
            <p>Umidade: ${humidity}%</p>
        </div>
    `;

    const additionalInfo = document.getElementById('additional-info')
    
    //obter data e hora
    const now = new Date();
    const month = now.toLocaleString('default', {month: 'short'});
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    let schedule = '';
    if(hours > 12){
        schedule = 'PM';
    } else {
        schedule = 'AM';
    }

    const feelsLike = data.main.feels_like;
    const rain = data.rain ? data.rain['1h'] : 0;  // Rain (1h) em mm (se não houver, define como 0)
    const windSpeed = data.wind.speed;
    const windDirection = data.wind.deg;
    const pressure = data.main.pressure;
    const dewPoint = data.main.temp_min;  // Aproximadamente, pode ser ajustado se precisar de cálculo exato
    const visibility = data.visibility / 1000;

    // Nova div para as informações adicionais
    additionalInfo.style.marginTop = '20px';  // Adiciona um espaço acima dessa seção

    additionalInfo.innerHTML = `
        <div style="margin-left:80px; padding-top:20px">
            <p style="color:#EB6E4B">${month} ${day}, ${hours}:${minutes}${schedule}</p>
            <h2 style="font-size:22px">${data.name}, ${data.sys.country}</h2>

            <div style="margin-top:20px">
                <div style="display:flex; align-items:center;">
                    <img style="width:auto; margin-left:-15px" src="${icon}">
                    <p style="font-size:30px">${feelsLike}°C</p>
                </div>
                <div style="display:flex;">
                    <div style="width: 1px; height:70px; background-color:#EB6E4B;"></div>
                    <div style="margin-left:10px">
                        <p><strong>Descrição:</strong> ${weatherDescription}</p>
                        <div style="display:flex; gap:5px">
                            <i class="fas fa-cloud-showers-heavy" style="font-size: 20px;"></i>
                            <p>${rain} mm</p>
                            <i class="fas fa-wind" style="font-size: 20px;"></i>
                            <p>${windSpeed} m/s, direção ${windDirection}°</p>
                        </div>
                        <div style="display:flex; gap:5px">
                            <i class="fas fa-tachometer-alt" style="font-size: 20px;"></i>
                            <p>${pressure} hPa</p>
                            <p><strong>Humidade:</strong> ${humidity}</p>
                        </div>
                        <div style="display:flex; gap:5px">
                            <p><strong>Ponto de orvalho:</strong> ${dewPoint}°C</p>
                            <p><strong>Visibilidade:</strong> ${visibility} km</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    if(weatherInfo.style.display == 'none'){
        weatherInfo.style.display = 'block';
    }

    document.body.addEventListener('click', ()=>{
        weatherInfo.style.display = "none";
    })
}

const blurElement = document.getElementById('city');
const changedElement = document.getElementById('weather-info');
// blurElement.addEventListener('blur', function(){
//     changedElement.style.backgroundColor = 'blue';
// })

blurElement.addEventListener('focus', function(){
    changedElement.style.backgroundColor = 'white';
})

window.addEventListener('load', ()=>{
    //obter data e hora
    const now = new Date();
    let month = now.toLocaleString('default', {month: 'short'});
    month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    let schedule = '';
    if(hours > 12){
        schedule = 'PM';
    } else {
        schedule = 'AM';
    }
    const data = document.getElementById('data');
    data.innerHTML = month + day + ', ' + hours + ':' + minutes;

    const city = 'Guarulhos';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    const feelsLike = document.getElementById('feelsLike');
    const iconLogo = document.getElementById('icon-logo');
    const weatherDescription = document.getElementById('weatherDescription');
    const pressure = document.getElementById('pressure');
    const wind = document.getElementById('wind');
    const rain = document.getElementById('rain');
    const humidity = document.getElementById('humidity')
    const dewPoint = document.getElementById('dewPoint');
    const visibility = document.getElementById('visibility');

    fetch(url)
        .then (response => {
            if (!response.ok){
                throw new Error('Cidade não encontrada!');
            }
            return response.json();
    })
    .then(data => {
        feelsLike.innerHTML = parseInt(data.main.feels_like) + 'C';
        feelsLike.style.fontSize = '30px';
        iconLogo.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        iconLogo.setAttribute('width', '60px')
        weatherDescription.innerHTML = `<p><strong>Descrição: </strong>${data.weather[0].description}<p>`
        wind.innerHTML = data.wind.speed + ' m/s';
        pressure.innerHTML= data.main.pressure + 'hPa';
        rain.innerHTML = data.rain ? data.rain['1h'] : 0;
        humidity.innerHTML = `<strong>Umidade:</strong>  ${data.main.humidity}`;
        dewPoint.innerHTML = `<strong>Ponto de Orvalho:</strong> ${data.main.temp_min}`;
        visibility.innerHTML = `<strong>Visibilidade:</strong> ${data.visibility / 1000} km`;
    })
})

/* pesquisa na lupa */
const pesquisa = document.getElementById('icone-busca');

pesquisa.addEventListener('click', ()=>{
    //obter data e hora
    const now = new Date();
    let month = now.toLocaleString('default', {month: 'short'});
    month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    let schedule = '';
    if(hours > 12){
        schedule = 'PM';
    } else {
        schedule = 'AM';
    }
    const data = document.getElementById('data');
    data.innerHTML = month + day + ', ' + hours + ':' + minutes;

    const city = document.getElementById('navbar-input').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    console.log(city)
    const feelsLike = document.getElementById('feelsLike');
    const iconLogo = document.getElementById('icon-logo');
    const weatherDescription = document.getElementById('weatherDescription');
    const pressure = document.getElementById('pressure');
    const wind = document.getElementById('wind');
    const rain = document.getElementById('rain');
    const humidity = document.getElementById('humidity')
    const dewPoint = document.getElementById('dewPoint');
    const visibility = document.getElementById('visibility');
    const cityCode = document.getElementById('localizacao');

    fetch(url)
        .then (response => {
            if (!response.ok){
                throw new Error('Cidade não encontrada!');
            }
            return response.json();
    })
    .then(data => {
        cityCode.innerHTML = data.name + ', ' + data.sys.country;
        feelsLike.innerHTML = parseInt(data.main.feels_like) + 'C';
        feelsLike.style.fontSize = '30px';
        iconLogo.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        iconLogo.setAttribute('width', '60px')
        weatherDescription.innerHTML = `<p><strong>Descrição: </strong>${data.weather[0].description}<p>`
        wind.innerHTML = data.wind.speed + ' m/s';
        pressure.innerHTML= data.main.pressure + 'hPa';
        rain.innerHTML = data.rain ? data.rain['1h'] : 0;
        humidity.innerHTML = `<strong>Umidade:</strong>  ${data.main.humidity}`;
        dewPoint.innerHTML = `<strong>Ponto de Orvalho:</strong> ${data.main.temp_min}`;
        visibility.innerHTML = `<strong>Visibilidade:</strong> ${data.visibility / 1000} km`;
    })
})