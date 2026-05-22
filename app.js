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
        description: 'United Kingdom capital city and commercial centre.'
    },
    {
        name: 'Edinburgh',
        coordinates: [55.9533, -3.1883],
        description: 'Historic capital of Scotland with rich cultural heritage.'
    },
    {
        name: 'Manchester',
        coordinates: [53.4808, -2.2426],
        description: 'Major northern city known for industry and innovation.'
    }
];

cities.forEach((city) => {
    L.marker(city.coordinates)
        .addTo(cityMarkers)
        .bindPopup(`<strong>${city.name}</strong><br>${city.description}`);
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
