function initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
      disableDefaultUI: true,
    });
  
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById("sidebar"));
  
    const control = document.getElementById("floating-panel");
  
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  
    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
  
    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const start = "84 Hồ Quý Ly, Thanh Khê Tây, Thanh Khê, Đà Nẵng, Việt Nam";
    const end = "283 Nguyễn Chí Thanh, Phước Ninh, Hải Châu, Đà Nẵng 550000, Việt Nam";
    // const start = document.getElementById("start").value;
//     // const end = document.getElementById("end").value;
//   
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
  
  window.myMap = initMap;