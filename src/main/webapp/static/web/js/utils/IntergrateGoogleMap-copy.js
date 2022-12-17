function initMap(){
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: 16.061647, lng: 108.159124 },
      disableDefaultUI: true,
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById("map-sidebar"));
    
    
    const onChangeHandler =  () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
    
    document.getElementById("customer_street").addEventListener("blur", onChangeHandler);
    // document.getElementById("end").addEventListener("change", onChangeHandler);

}
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const start = "84 Hồ Quý Ly, Thanh Khê Tây, Thanh Khê, Đà Nẵng, Việt Nam";
    const end = "283 Nguyễn Chí Thanh, Phước Ninh, Hải Châu, Đà Nẵng 550000, Việt Nam";
   
    directionsService
      .route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        console.log(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

export {initMap, calculateAndDisplayRoute}