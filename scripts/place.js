const temperature = 35;
const windSpeed = 10;

const calculateWindChill = (t, v) => 35.74 + 0.6215 * t - 35.75 * Math.pow(v, 0.16) + 0.4275 * t * Math.pow(v, 0.16);

const windChillOutput = (temperature <= 50 && windSpeed > 3)
    ? `${calculateWindChill(temperature, windSpeed).toFixed(1)} °F`
    : 'N/A';

document.getElementById('wind-chill').textContent = windChillOutput;

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
