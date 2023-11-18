mapboxgl.accessToken =
  "pk.eyJ1IjoidHNjaGFuenZlcmEiLCJhIjoiY2xwMmZ0eHc4MHc1YzJpcWtwbmJ0eGJpNCJ9.3Q1C6GPaLmZsOFh6eD4rDA";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [7.440213, 46.948104],
  zoom: 14,
});
function createMarker(coord) {
  new mapboxgl.Marker({color:"red"}).setLngLat(coord).addTo(map);
}

function getCoords(station) {
  const coord = station.coordinate;
  return [coord.y, coord.x];
}

function getStations(place) {
  const promise = fetch(
    "https://transport.opendata.ch/v1/locations?query=" + place
  );
  return promise
    .then((r) => r.text())
    .then((text) => JSON.parse(text))
    .then((json) => json.stations)
    .then((stations) => stations.map(getCoords));
}

var counter = 0;
function showStation() {
  getStations("Bern").then((coords) => coords.forEach(createMarker));
}
