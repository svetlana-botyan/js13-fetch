//отправка запроса и обработка ошибок
function fetchData(url, method, callback) {
  const xhr = new XMLHttpRequest()

  xhr.open(method, url)

  xhr.onload = function () {
    if ((xhr.status = 200)) {
      callback(xhr.response)
    } else {
      console.error(xhr.statusText + ':' + xhr.status)
    }
  }

  xhr.onerror = function () {
    console.log(xhr.statusText + ':' + xhr.status)
  }

  xhr.send()
}

const key = '35e29af10aabdc2629da69803a5346af'
const urlWeatherCurrent = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${key}`
const urlWeatherByDays = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${key}`

// header

function widgetTemplate({
  city,
  countryCode,
  date,
  temp,
  tempFeelsLike,
  windDeg,
  windSpeed,
  humidity,
  description,
  iconSrc,
}) {
  let direction = ''

  switch (true) {
    case windDeg == 0:
      direction = 'North'
    case windDeg > 0 && windDeg < 90:
      direction = 'North-East'
    case windDeg == 90:
      direction = 'East'
    case windDeg > 90 && windDeg < 180:
      direction = 'South-East'
    case windDeg == 180:
      direction = 'South'
    case windDeg > 180 && windDeg < 270:
      direction = 'South-West'
    case windDeg == 270:
      direction = 'West'
    case windDeg > 270:
      direction = 'North-West'
  }

  let hours = ''
  let minutes = ''

  if (date.getHours() < 10) {
    hours = '0' + date.getHours()
  } else {
    hours = date.getHours()
  }

  if (date.getMinutes() < 10) {
    minutes = '0' + date.getMinutes()
  } else {
    minutes = date.getMinutes()
  }

  return `
    <div class="widget container">
        <div class="widget-header d-flex flex-column">
            <div class="d-flex  justify-content-between">
                <div>${city},${countryCode}</div>
                <div> <svg class="clock " width="12" height="12">
                        <use href="#clock" />
                    </svg> ${hours}:${minutes}
                </div>
            </div>
            <div class="py-3 d-flex flex-column align-items-center">
                <img src="${iconSrc}" class="icon-header" alt="icon ">    
                <strong class="description">${description}</strong>
                <h1 class="mt-2">${Math.round(temp)}&#8451;</h1>
                <p class="temp-like">
                  Feels like: ${Math.round(tempFeelsLike)}&#8451;
                </p>
            </div> 
            <div class="d-flex justify-content-around align-items-center">
                <span> <svg class="compas" width="12" height="12" >
                        <use  href="#compas" />
                    </svg>${direction}</span>
                <span> <svg class="compas" width="12" height="12" >
                        <use  href="#droplet" />
                </svg>${humidity}%</span>
                <span> <svg class="wind" width="14" height="14">
                        <use href="#wind"/>
                    </svg>${windSpeed} m/s</span>
            </div>
        </div>
    </div> 
        `
}

function renderHeader(data) {
  document.body.innerHTML += widgetTemplate(data)
}


fetchData(urlWeatherCurrent, 'GET', (response) => {
  const data = JSON.parse(response)
  // console.log(data)

  const weatherCurrent = {
    city: data.name,
    windDeg: data.wind.deg,
    windSpeed: data.wind.speed,
    date: new Date(data.dt * 1000),
    temp: data.main.temp - 273.15,
    tempFeelsLike: data.main.feels_like - 273.15,
    countryCode: data.sys.country,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    iconSrc: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  }

  renderHeader(weatherCurrent)
})


// weather for 5 days

function widgetItemTemplate({date, iconSrc, temp }) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  let hours = ''
  let minutes = ''

  if (date.getHours() < 10) {
    hours = '0' + date.getHours()
  } else {
    hours = date.getHours()
  }

  if (date.getMinutes() < 10) {
    minutes = '0' + date.getMinutes()
  } else {
    minutes = date.getMinutes()
  }

  return `
    <div class="container item-widget d-flex justify-content-between align-items-center">
        <div>
            <div>
            ${date.getDate()}
            ${monthNames[date.getMonth()]}
            ${date.getFullYear()}
            </div>
            <div>${hours}:${minutes}</div>     
        </div>
        <img src="${iconSrc}" class="icon-header" alt="icon ">
        <p class="mt-2">${Math.round(temp-273)}&#8451;</p>
    </div>
    `
}

function renderItemTemplate(days) {
  const items = days.map((item) => {
    const [date, iconId, temp] = [
      new Date(item.dt * 1000),
      item.weather[0].icon,
      item.main.temp,
    ]

    const iconSrc = `http://openweathermap.org/img/wn/${iconId}@2x.png`

    return widgetItemTemplate({ date, iconSrc, temp })
  })

  const itemsHTML = items.join('')

  document.body.innerHTML += itemsHTML
}


fetchData(urlWeatherByDays, 'GET', (response) => {
  const data = JSON.parse(response).list
  
  const weatherDays = data.filter((item, index) => index % 8 == 0)
 console.log(weatherDays)

  renderItemTemplate(weatherDays)
})


//-----------------------------------------------------------------
// Task 1

const arr = ['Masha', 'Liza', 'Sasha', 'Victor', 'Olga']
const [firstName, secondName = 'alex', ...rest] = arr

console.log(firstName, secondName)

function getRemainderItem(arr) {
  const element = arr.map((item) => {
    console.log(item)
  })
}

getRemainderItem(rest)

// Task 2
// 1 вариант
const array = ['Lada', 'Toyota', 'Mazda', 'BMV']

function showParametrs(arr) {
  let parametr = [...arr]

  console.log(parametr[3] + ' , ' + parametr[0] + ' , ' + parametr[2])
}

showParametrs(array)

// 2 вариант

function showParametrs2(arr) {
  const [a, b, c, d] = arr

  console.log(a, b, d)
}

showParametrs2(array)

// Task 3
const shopInfo = {
  name: 'shop',
  rooms: 3,
  typeItems: 'prodacts',
  numberItems: 10000,
  soldItems: 250,
}

const { rooms = 1, soldItems = 2, ...fields } = shopInfo

//console.log(fields)
