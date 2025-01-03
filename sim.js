document.addEventListener("DOMContentLoaded", () => {
    fetchEarthquakeData();
    fetchWeatherData();
});

function fetchEarthquakeData() {
    axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson')
        .then(response => {
            const earthquakes = response.data.features;
            const earthquakeDataDiv = document.getElementById('earthquake-data');
            earthquakeDataDiv.innerHTML = '<h3>Earthquake Data</h3>';
            earthquakes.forEach(quake => {
                const quakeElement = document.createElement('p');
                quakeElement.textContent = quake.properties.title;
                earthquakeDataDiv.appendChild(quakeElement);
            });
        })
        .catch(error => console.log(error));
}

function fetchWeatherData() {
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY')
        .then(response => {
            const weather = response.data;
            const weatherDataDiv = document.getElementById('weather-data');
            weatherDataDiv.innerHTML = '<h3>Weather Data</h3>';
            const weatherElement = document.createElement('p');
            weatherElement.textContent = `${weather.name}: ${weather.weather[0].description}`;
            weatherDataDiv.appendChild(weatherElement);
        })
        .catch(error => console.log(error));
}
// Interactive Scenario using Three.js
function initThreeJS() {
    const container = document.getElementById('threejs-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();
}

document.addEventListener("DOMContentLoaded", initThreeJS);
function allocateResources(type, amount) {
    const resourceElement = document.getElementById(type);
    let currentValue = parseInt(resourceElement.textContent, 10);
    resourceElement.textContent = currentValue - amount;
}
function makeDecision(choice) {
    const decisionElement = document.getElementById('current-decision');
    decisionElement.textContent = choice;
}
const socket = io('http://localhost:5000');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');

socket.on('message', (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
});

function sendMessage() {
    const message = messageInput.value;
    socket.emit('message', message);
    messageInput.value = '';
}
document.addEventListener("DOMContentLoaded", fetchAnalytics);

function fetchAnalytics() {
    axios.get('http://localhost:5000/analytics')
        .then(response => {
            const analytics = response.data;
            const analyticsList = document.getElementById('analytics-list');
            analytics.forEach(action => {
                const actionElement = document.createElement('li');
                actionElement.textContent = `${action.message} at ${new Date(action.timestamp).toLocaleString()}`;
                analyticsList.appendChild(actionElement);
            });
        })
        .catch(error => console.log(error));
}
