class IntergrateGoogleMap {
    constructor () {
        this.defaultPosition = { lat: 16.061647, lng: 108.159124};
        this.elements = {
            directionsRenderer : new google.maps.DirectionsRenderer(),
            directionsService : new google.maps.DirectionsService(),
            inputDestination : document.querySelector('#customer_street'),
            map : 
                new google.maps.Map(document.querySelector("#map-panel"), {
                    zoom: 14,
                    center: this.defaultPosition,
                    disableDefaultUI: true,
                }),
        }
         this.initMap();
         this.setAutoComplete(this.elements.inputDestination);
    }

    initMap() {
        this.elements.directionsRenderer.setMap(this.elements.map);
        this.elements.directionsRenderer.setPanel(document.querySelector("#map-sidebar"));
        
        let that = this;
        const marker = new google.maps.Marker({
                position: that.defaultPosition,
                map : that.elements.map,
                title: "Đại học sư phạm Đà Nẵng",
            });

        const infowindow = new google.maps.InfoWindow({
            content: `<h4 style="font-family: sans-serif;">Trường Đại học Sư phạm Đà Nẵng - origin</h4>`,
            ariaLabel: "UED-DaNang",
          });

        const openInfoWindow = () => {
            infowindow.open({
                anchor: marker,
                map: that.elements.map,
            });
        }

        marker.addListener("click", () => {
            openInfoWindow();
        });
        
        
        const onBlurHandler =  () => {
            this.calculateAndDisplayRoute();
        };
      
        document.querySelector("#customer_street").addEventListener("blur", onBlurHandler);
        document.querySelector("#customer_street").addEventListener("keydown", (e) => {
            if(e.keyCode==13) {
                e.target.blur();
            }
        });
    }
    
    setAutoComplete(inputElem) {
        const options = {
            fields: ["formatted_address", "geometry", "name"],
            strictBounds: false,
          };
        const autocomplete = new google.maps.places.Autocomplete(inputElem, options);
        autocomplete.bindTo("bounds", this.elements.map);

        autocomplete.addListener("place_changed", () => {
    
            const place = autocomplete.getPlace();
        });
    }
    calculateAndDisplayRoute() {
        const   start = this.defaultPosition,
                // end = "29 Hoàng Văn Thái, Hòa Minh, Liên Chiểu, Đà Nẵng";
                end = this.elements.inputDestination.value;
     
        this.elements.directionsService
          .route({
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING,
          })
          .then((response) => {
            this.elements.directionsRenderer.setDirections(response);
            console.log(response);
          })
          .catch((e) => window.alert("Directions request failed due to " + e));
      }
}

export default IntergrateGoogleMap;

