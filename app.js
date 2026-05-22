const streetLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
});

const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap contributors, © OpenStreetMap contributors'
});

const map = L.map('map', {
    center: [54.0, -2.0],
    zoom: 5,
    layers: [streetLayer],
    zoomControl: false,
    attributionControl: true
});

L.control.zoom({ position: 'topright' }).addTo(map);
L.control.scale({ position: 'bottomleft', metric: true, imperial: false }).addTo(map);

const cityMarkers = L.layerGroup();

const cities = [
    {
        name: 'London',
        coordinates: [51.5074, -0.1278],
        description: 'United Kingdom capital city and commercial centre.',
        region: 'England',
        population: '9.6M (demo)',
        category: 'Finance & culture',
        fillColor: '#d05353',
        borderColor: '#9f2f2f'
    },
    {
        name: 'Edinburgh',
        coordinates: [55.9533, -3.1883],
        description: 'Historic capital of Scotland with rich cultural heritage.',
        region: 'Scotland',
        population: '0.55M (demo)',
        category: 'Heritage & tourism',
        fillColor: '#4b6cb7',
        borderColor: '#2e4a8f'
    },
    {
        name: 'Manchester',
        coordinates: [53.4808, -2.2426],
        description: 'Major northern city known for industry and innovation.',
        region: 'England',
        population: '2.8M (demo)',
        category: 'Technology & manufacturing',
        fillColor: '#59a87d',
        borderColor: '#326a4b'
    }
];

cities.forEach((city) => {
    const marker = L.circleMarker(city.coordinates, {
        radius: 12,
        fillColor: city.fillColor,
        color: city.borderColor,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
    }).addTo(cityMarkers);

    marker.bindPopup(`
        <div class="popup-card">
            <h3>${city.name}</h3>
            <p>${city.description}</p>
            <ul>
                <li><strong>Region:</strong> ${city.region}</li>
                <li><strong>Population:</strong> ${city.population}</li>
                <li><strong>Category:</strong> ${city.category}</li>
            </ul>
            <p class="popup-note">Demo data only. No live backend.</p>
        </div>
    `);

    marker.bindTooltip(city.name, {
        direction: 'top',
        offset: [0, -10],
        opacity: 0.95,
        className: 'city-tooltip'
    });
});

cityMarkers.addTo(map);

L.control.layers(
    {
        'Street map': streetLayer,
        'Topographic map': topoLayer
    },
    {
        'Major cities': cityMarkers
    },
    {
        collapsed: false,
        position: 'topright'
    }
).addTo(map);

const infoControl = L.control({ position: 'bottomright' });

infoControl.onAdd = function () {
    const container = L.DomUtil.create('div', 'leaflet-control map-info');
    container.innerHTML = `
        <h4>UK GIS Summary</h4>
        <p>Interactive Leaflet map showing major UK cities, responsive layout, and professional page styling.</p>
    `;
    return container;
};

infoControl.addTo(map);
