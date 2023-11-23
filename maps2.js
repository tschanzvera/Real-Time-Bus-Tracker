
mapboxgl.accessToken =
  "";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.073747229, 42.33370713],
  zoom: 12,
});
function createMarker(coord) {
 return  new mapboxgl.Marker({color:"red"}).setLngLat(coord).addTo(map);
}

const busMarkers={ 

};

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);
    locations.forEach(location=>{
        const id = location.id
        const longLat = [location.attributes.longitude, location.attributes.latitude];
        const status = location.attributes.current_status;
        let busMarker =  busMarkers[id]
        if(busMarker){
            busMarker.setLngLat(longLat);

        }else{
           busMarkers[id]= createMarker(longLat);
        }
        
    });

	// timer
	setTimeout(run, 5000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}


