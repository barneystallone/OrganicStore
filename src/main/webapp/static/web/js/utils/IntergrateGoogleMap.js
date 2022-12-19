import {currencyFormat,convertToNumber}  from "/OrganicStore/static/web/js/utils/format.js";
class IntergrateGoogleMap {
    constructor () {
        this.defaultPosition = { lat: 16.061647, lng: 108.159124};
        this.elements = {
            directionsRenderer : new google.maps.DirectionsRenderer(),
            directionsService : new google.maps.DirectionsService(),
            inputDestination : document.querySelector('#customer_street'),
            displayDistanceElem : document.querySelector('.checkout__shipping__total e'),
            map : 
                new google.maps.Map(document.querySelector("#map-panel"), {
                    zoom: 14,
                    center: this.defaultPosition,
                    disableDefaultUI: true,
                }),

            apiUrl : "http://localhost:8080/OrganicStore/api-shipping"
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
      
        
        this.elements.inputDestination.addEventListener("blur", onBlurHandler);
        this.elements.inputDestination.addEventListener("keydown", (e) => {
            if(e.keyCode==13) {
                e.target.blur();
            }
        });
        // list các place gợi ý từ google dưới input nhập địa chỉ
        // Sự kiện khi mousedown tại listPlaces thì preventDefault không cho  blur ra khỏi input 
        // Sau khi xử lý xong thì cho blur ra khỏi input
        document.addEventListener("mousedown",(e) => {
            if(e.target.closest(".pac-container.pac-logo.hdpi")) {
                e.preventDefault();
            }
        })
        document.addEventListener("click",(e) => {
            if(e.target.closest(".pac-container.pac-logo.hdpi")) {
                const currentPlace = e.target.closest(".pac-item");
                
                const formatted_address = 
                    currentPlace.querySelector(".pac-item-query").textContent
                        .concat(', ')
                        .concat(
                            currentPlace.querySelector(".pac-item-query").nextElementSibling.textContent
                        );

                this.elements.inputDestination.value = formatted_address;
                this.elements.inputDestination.blur();
            }
        })
    }
    
    setAutoComplete(inputElem) {
        const options = {
            fields: ["formatted_address", "geometry", "name"],
            strictBounds: false,
            componentRestrictions: {
                country: "VN" // chỉ gợi ý trong việt nam
            }
          };

        const autocomplete = new google.maps.places.Autocomplete(inputElem, options);
        autocomplete.bindTo("bounds", this.elements.map);

        autocomplete.addListener("place_changed", () => {
    
            const place = autocomplete.getPlace();
        });
    }
    calculateAndDisplayRoute() {
        const   start = this.defaultPosition,
                warningElem = document.querySelector('#customer_street+.warning'),
                // end = "29 Hoàng Văn Thái, Hòa Minh, Liên Chiểu, Đà Nẵng";
                end = this.elements.inputDestination.value;
        console.log(end);
        let isSuccess= true;
        this.elements.directionsService
            .route({
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING,
            })
            .then((response) => {
                this.elements.directionsRenderer.setDirections(response);
                isSuccess = true;
                const distance = response.routes[0].legs[0].distance.text.replace(',','.')
                
                this.callApi(distance);

                
                console.log(response);
            })
            .catch((e) => {
                this.elements.directionsRenderer.setDirections({routes: []});
                this.elements.map.setCenter(this.defaultPosition);
                if(e.code=="NOT_FOUND") {
                    warningElem.textContent = "Địa chỉ vừa nhập không tìm thấy. Vui lòng nhập lại";
                    isSuccess = false;
                } else if (e.code=="ZERO_RESULTS"){
                    warningElem.textContent = "Không tìm thấy đường đi tới địa chỉ này (Driving)";
                    isSuccess = false;
                } else {
                    window.alert("Directions request failed due to " + e);
                    console.log(e);
                }
            })
            .finally(() => {
                warningElem.classList.toggle("d-none",isSuccess);
                document.querySelector('.checkout__order [order-submit]').classList.toggle("disable",!isSuccess);
            }); 
              
      }
    callApi(distance) {
        const url = new URL(this.elements.apiUrl);
        url.searchParams.set('distance',distance);
        
        return fetch(url,{
            method: "get"            
        })
        .then(res => res.json())
        .then(data =>{
            const shippingTotal = document.querySelector('.checkout__shipping__total span');
            this.elements.displayDistanceElem.textContent = `(${distance})`;
            shippingTotal.textContent = currencyFormat(data);
            document.querySelector('.checkout__order__total span').textContent = 
                currencyFormat(
                    convertToNumber(shippingTotal.textContent) + convertToNumber(
                        document.querySelector('.checkout__order__subtotal span').textContent
                    )
                )
        })
        .catch(e => {
            alert("Lỗi:" + e);
            document.querySelector('.checkout__order [order-submit]').classList.toggle("disable", true);
        })
    }
    // currencyFormat(price) {
    //     return (price*1).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    // }
    // convertToNumber(strPrice) {
    //     return strPrice.replace(/[^0-9]/g,"")
    // }

}

export default IntergrateGoogleMap;

