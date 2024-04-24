// if(new Date().getHours() > 21 || new Date().getHours() < 8){

if(new Date().getHours() > 21 || new Date().getHours() < 8){
    document.body.style.backgroundImage = `url(../img/moon.png)`
    document.body.style.backgroundPosition = `top right`
    document.body.style.backgroundColor = 'rgb(4, 4, 49)'
    document.getElementById('city').style.color = `white`
    document.getElementById('weatherStan').style.color = `rgba(189, 211, 231, 0.753)`
    document.getElementById('temp').style.color = `rgba(189, 211, 231, 0.753)`
    document.getElementById('tempFelt').style.color = `rgba(189, 211, 231, 0.753)`
    document.getElementById('tempMax').style.color = `rgba(189, 211, 231, 0.753)`
    document.getElementById('tempMin').style.color = `rgba(189, 211, 231, 0.753)`
    document.getElementById('humidity').style.color = `rgba(189, 211, 231, 0.753)`
    document.getElementById('pressure').style.color = `rgba(189, 211, 231, 0.753)`
    document.getElementById('seaLevel').style.color = `rgba(189, 211, 231, 0.753)`
    document.getElementById('visibility').style.color = `rgba(189, 211, 231, 0.753)`
    document.getElementById('titleForTable').style.color = `white`
    document.getElementById('titleForTable2').style.color = `white`
    document.querySelector('#darkModeTh').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh2').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh3').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh4').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh5').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh6').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh7').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh8').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh9').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh10').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh11').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('#darkModeTh12').style.color = `rgba(189, 211, 231, 0.753)`
    document.querySelector('.search').style.backgroundColor = `rgb(22, 60, 85)`
    document.querySelector('.search h1').style.color = `yellow`
    document.querySelector('.search h2').style.color = `yellow`
    document.querySelector('.search h4').style.color = `white`
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
        additionalInfo(data)
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
    const table = document.getElementById('tbody2')
    table.innerHTML = ''
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

function additionalInfo(data){
    const table = document.getElementById('tbody')
    table.innerHTML = ''
    const addInfo = `
    <td>${data.city.id}</td>
    <td>${data.city.country}</td>
    <td>${data.city.population}</td>
    <td>${data.city.timezone}</td>
    <td>${data.city.coord.lat}</td>
    <td>${data.city.coord.lon}</td>
    `

    let tr = document.createElement('tr')
    tr.innerHTML = addInfo
    table.appendChild(tr)

}

// dop
const button5day = document.getElementById('show5days')
const buttonMore = document.getElementById('showMoreInfo')
const additInfo = document.querySelector('.addInfo')
const posEl = document.querySelector('.positionTop')
const p = document.querySelector('.dayP')
const p2 = document.querySelector('.dayP2')
const p3 = document.querySelector('.dop')
const p4 = document.querySelector('.dop2')
button5day.addEventListener('click', () => {
    posEl.classList.toggle('changeDisplay')
    posEl.classList.toggle('changeDisplay2')
    p.classList.toggle('changeDisplay')
    p.classList.toggle('changeDisplay2')
    p2.classList.toggle('changeDisplay')
    p2.classList.toggle('changeDisplay2')
})

buttonMore.addEventListener('click', () => {
    additInfo.classList.toggle('changeDisplay')
    additInfo.classList.toggle('changeDisplay2')
    p3.classList.toggle('changeDisplay')
    p3.classList.toggle('changeDisplay2')
    p4.classList.toggle('changeDisplay')
    p4.classList.toggle('changeDisplay2')
})

document.getElementById('backBtn').addEventListener('click', () => {
    document.querySelector('.weather').style.display = `none`
    document.querySelector('.search').style.display = `block`
    console.log(posEl.classList.contains('changeDisplay2'));
    //? 1
    if(posEl.classList.contains('changeDisplay2') === true){
        posEl.classList.remove('changeDisplay2')
        posEl.classList.add('changeDisplay')
        p.classList.remove('changeDisplay')
        p.classList.add('changeDisplay2')
        p2.classList.remove('changeDisplay2')
        p2.classList.add('changeDisplay')
    }
    //? 2
    if(additInfo.classList.contains('changeDisplay2') === true){
        additInfo.classList.remove('changeDisplay2')
        additInfo.classList.add('changeDisplay')
        p3.classList.remove('changeDisplay')
        p3.classList.add('changeDisplay2')
        p4.classList.remove('changeDisplay2')
        p4.classList.add('changeDisplay')
    }

})