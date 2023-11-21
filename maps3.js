// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 42.33370713, lng: -71.073747229 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
}

initMap();
async function createMarker(coord) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  return new AdvancedMarkerElement({
    map: map,
    position: coord,
    title: "Uluru",
  });
}

const busMarkers = {};

async function run() {
  // get bus data
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);
  locations.forEach((location) => {
    const id = location.id;
    const longLat = {
      lat: location.attributes.latitude,
      lng: location.attributes.longitude,
    };
    const status = location.attributes.current_status;
    let busMarker = busMarkers[id];
    if (busMarker) {
      busMarker.position = longLat;
    } else {
      createMarker(longLat).then((busMarker) => {
        busMarkers[id] = busMarker;
      });
    }
  });

  // timer
  setTimeout(run, 5000);
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}
