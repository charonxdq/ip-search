function fetchIPInfo() {
    const ip = document.getElementById('ip-address').value;
    const errorMessage = document.getElementById('error-message');
    const startScreen = document.getElementById('start-screen');
    const ipDetailsScreen = document.getElementById('ip-details-screen');
    const ipValue = document.getElementById('ip-value');

    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (!ip.match(ipv4Regex)) {
        errorMessage.textContent = "pls enter a valid p";
        return;
    }

    errorMessage.textContent = "";

    const apiUrl = `https://ipapi.co/${ip}/json/`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = `${data.reason}`;
            } else {
                startScreen.style.display = 'none';
                ipDetailsScreen.style.display = 'block';
                ipValue.textContent = data.ip;
                document.getElementById('ip-decimal').textContent = data.ip_decimal || 'N/A';
                document.getElementById('ip-hostname').textContent = data.hostname || 'N/A';
                document.getElementById('ip-asn').textContent = data.asn || 'N/A';
                document.getElementById('ip-isp').textContent = data.org || 'N/A';
                document.getElementById('ip-services').textContent = data.services || 'N/A';
                document.getElementById('ip-country').textContent = data.country_name || 'N/A';
                document.getElementById('ip-region').textContent = data.region || 'N/A';
                document.getElementById('ip-city').textContent = data.city || 'N/A';
                document.getElementById('ip-latitude').textContent = data.latitude || 'N/A';
                document.getElementById('ip-longitude').textContent = data.longitude || 'N/A';

                const map = L.map('map').setView([data.latitude || 0, data.longitude || 0], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                if (data.latitude && data.longitude) {
                    L.marker([data.latitude, data.longitude]).addTo(map)
                        .bindPopup(`<b>${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}</b><br>Lat: ${data.latitude}, Lon: ${data.longitude}`)
                        .openPopup();
                }
            }
        })
        .catch(error => {
            errorMessage.textContent = `${error.message}`;
        });
}

function goBack() {
    const startScreen = document.getElementById('start-screen');
    const ipDetailsScreen = document.getElementById('ip-details-screen');

    if (startScreen && ipDetailsScreen) {
        startScreen.style.display = 'block';
        ipDetailsScreen.style.display = 'none';
    }
}            
