const apiKey = '6a23a5fbe80bb248e15ace27fc5af829';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherContainer = document.getElementById('weatherContainer');
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeather(city);
  }
});
function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}
function displayWeather(data) {
  const cityName = data.name;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const minTemperature = Math.round(data.main.temp_min);
  const maxTemperature = Math.round(data.main.temp_max);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

  const date = new Date();
  const dateString = date.toDateString();
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const day = getDayOfWeek(date.getDay());

  const weatherInfo = `
    <h2>${cityName}</h2>
    <p>Date: ${dateString}</p>
    <p>Time: ${timeString}</p>
    <p>Day: ${day}</p>
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${description}</p>
    <p>Min Temperature: ${minTemperature}°C</p>
    <p>Max Temperature: ${maxTemperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
    <img src="${iconUrl}" alt="${description}">
  `;
  weatherContainer.innerHTML = weatherInfo;
} function getDayOfWeek(dayIndex) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayIndex];
}
cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    searchBtn.click();
  }
});
