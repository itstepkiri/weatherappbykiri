if(new Date().getHours() > 21 || new Date().getHours() < 8){
    document.body.style.backgroundImage = `url(../img/moon.png)`
    document.body.style.backgroundPosition = `top right`
} else{
    document.body.style.backgroundImage = `url(../img/sun.png)`
    document.body.style.backgroundPosition = `top left`
}

window.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        cityName()
    }
})
document.querySelector('.searchBtn').addEventListener('click', () => {
    cityName()
})

document.getElementById('backBtn').addEventListener('click', () => {
    document.querySelector('.weather').style.display = `none`
    document.querySelector('.search').style.display = `block`
})

function cityName(){
    const city = document.querySelector('.search input')
    if(city.value.length === 0){
        city.style.borderColor = 'red'
    } else{
        city.style.borderColor = 'cornsilk'
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&lang=ua&units=metric&appid=17e8cc963fcf4e779970e394f22d8ee6`
        weather(url)
    }
}

async function weather(url){
    try {
        const response = await fetch(url)
        const data = await response.json()
        const city = document.querySelector('.search input')
        if(response.status === 404){
            city.style.borderColor = 'red'
            document.querySelector('.weather').style.display = `none`
            document.querySelector('.search').style.display = `block`
        } else{
            city.value = ''
            city.style.borderColor = 'cornsilk'
            document.querySelector('.weather').style.display = `flex`
            document.querySelector('.search').style.display = `none`
        }
        main(data)
        newElTable(data)
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

function main(data){
    document.getElementById('city').innerHTML = data.city.name
    document.getElementById('time').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    setInterval(() => {
        document.getElementById('time').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    }, 1000);
    document.getElementById('dateWeather').innerHTML = `Дата: <br> ${data.list[0].dt_txt}`
    document.getElementById('generalPng').src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`
    document.getElementById('weatherStan').innerHTML = data.list[0].weather[0].description
    document.getElementById('temp').innerHTML = `${parseInt(data.list[0].main.temp)} °C`
    document.getElementById('tempFelt').innerHTML = `Відчувається як: ${data.list[0].main.temp} °C`
    document.getElementById('tempMax').innerHTML = `Максимальна: ${parseInt(data.list[0].main.temp_max)} °C`
    document.getElementById('tempMin').innerHTML = `Мінімальна: ${parseInt(data.list[0].main.temp_min)} °C`
    document.getElementById('humidity').innerHTML = `Вологість: ${data.list[0].main.humidity} %`
    document.getElementById('pressure').innerHTML = `Тиск: ${data.list[0].main.pressure} Па`
    document.getElementById('seaLevel').innerHTML = `Рівень моря: ${data.list[0].main.sea_level} м`
    document.getElementById('visibility').innerHTML = `Видимість: ${data.list[0].visibility} м`
}

function newElTable(data){
    const table = document.getElementById('allInfo')
    data.list.forEach(item => {
        const {dt_txt, main, visibility, wind, weather} = item
        const {feels_like, humidity, pressure, sea_level, temp, temp_max, temp_min} = main
        const weatherDescription = weather[0].description
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
        const rowHtml = `
        <td>${dt_txt}</td>
        <td>${parseInt(temp)} °C</td>
        <td>${parseInt(feels_like)} °C</td>
        <td>${parseInt(temp_max)} °C</td>
        <td>${parseInt(temp_min)} °C</td>
        <td>${visibility / 1000} км.</td>
        <td>${pressure} Па</td>
        <td>${wind.speed} м/с</td>
        <td>${humidity} %</td>
        <td>${sea_level} м.</td>
        <td>${weatherDescription}</td>
        <td> <img src='${weatherIconUrl}'> </td>
        `

        const row = document.createElement('tr')
        row.innerHTML = rowHtml
        table.appendChild(row)
    })

}