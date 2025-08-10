var map = L.map('map').setView([42.270768, 42.704292], 13);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap & CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

const geocoderControl = L.Control.geocoder({
    defaultMarkGeocode: true,
    position: 'topleft',
    geocoder: L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
            'accept-language': 'ka',
            'viewbox': '42.6772,42.2889,42.7546,42.2182',
            'bounded': 1
        }
    })
}).addTo(map);

geocoderControl.on('markgeocode', function (e) {
    const latlng = e.geocode.center;
    const marker = L.marker(latlng).addTo(map);
    marker.bindPopup(e.geocode.name).openPopup();
    map.setView(latlng, 16);
});

const categoryColors = {
    'road': '#ff4444',
    'water': '#4444ff',
    'lighting': '#ffff44',
    'waste': '#44ff44',
    'other': '#888888'
};

let problems = [];
fetch('/api/problems')
    .then(res => res.json())
    .then(data => {
        problems = data;
        problems.forEach(displayProblem);
    })
    .catch(err => console.error('Error loading problems:', err));
function displayProblem(problem) {
    const color = categoryColors[problem.category] || '#888888';
    const marker = L.circleMarker(problem.location, {
        color: '#fff',
        fillColor: color,
        fillOpacity: 0.8,
        radius: 6,
        weight: 2
    }).addTo(map);

    let popupContent = `
      <div style="font-size: 14px; max-width: 200px;">
        <b>${problem.title}</b><br>
        <small>${problem.description}</small><br>
        <small>დამატებულია: ${problem.reporter}</small>
    `;

    if (problem.isAnonymous) {
        popupContent += ` <i class="fas fa-user-secret" style="color: #999; font-size: 12px;" title="ანონიმური რეპორტი"></i>`;
    }

    popupContent += `<br><i style="color: #999;">${problem.date}</i><br>`;

    if (problem.image) {
        popupContent += `<img src="${problem.image}" alt="Problem Image" style="max-width: 100%; height: auto; margin-top: 5px; border-radius: 4px;">`;
    }

    popupContent += `</div>`;
    marker.bindPopup(popupContent);
}


let selectedLocation = null;

map.on('click', function (e) {
    selectedLocation = e.latlng;
    document.getElementById('problemForm').style.display = 'block';
});

function toggleReporterName() {
    const anonymousCheckbox = document.getElementById('reportAnonymously');
    const reporterNameInput = document.getElementById('reporterName');
    const reporterNameGroup = reporterNameInput.closest('.form-group');

    if (anonymousCheckbox.checked) {
        reporterNameGroup.style.display = 'none';
        reporterNameInput.value = '';
    } else {
        reporterNameGroup.style.display = 'block';
    }
}

document.getElementById('reportForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('problemImage');
    const file = fileInput.files[0];
    const isAnonymous = document.getElementById('reportAnonymously').checked;

    problems.push(problem);
localStorage.setItem('problems', JSON.stringify(problems)); 
displayProblem(problem);

fetch('/api/problems', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(problem)
})
.then(res => {
    if (!res.ok) throw new Error('Failed to save problem');
    return res.json();
})
.then(data => {
    console.log('Saved problem on backend:', data);
})
.catch(err => {
    console.error('Error saving problem:', err);
});

closeForm();

const reportType = isAnonymous ? 'ანონიმური რეპორტი' : 'რეპორტი';
alert(`${reportType} წარმატებით დაემატა!`);


    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            createProblem(event.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        createProblem();
    }
});

function closeForm() {
    document.getElementById('problemForm').style.display = 'none';
    document.getElementById('reportForm').reset();
    const reporterNameGroup = document.getElementById('reporterName').closest('.form-group');
    reporterNameGroup.style.display = 'block';
    selectedLocation = null;
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}
