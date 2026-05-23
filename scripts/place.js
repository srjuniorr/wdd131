const temperature = 35;
const windSpeed = 10;

const calculateWindChill = (t, v) => 35.74 + 0.6215 * t - 35.75 * Math.pow(v, 0.16) + 0.4275 * t * Math.pow(v, 0.16);

let windChill;
if (temperature <= 50 && windSpeed > 3) {
    windChill = calculateWindChill(temperature, windSpeed).toFixed(1) + ' °F';
} else {
    windChill = 'N/A';
}

document.getElementById('windchill').innerHTML = windChill;

const today = new Date();
document.getElementById('currentyear').innerHTML = today.getFullYear();
document.getElementById('lastModified').innerHTML = 'Last Modification: ' + document.lastModified;
