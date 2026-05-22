const map = L.map('map')
    .setView([51.5074,-0.1278],6);

L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:
'© OpenStreetMap contributors'
}
).addTo(map);

L.marker([51.5074,-0.1278])
.addTo(map)
.bindPopup('London')
.openPopup();