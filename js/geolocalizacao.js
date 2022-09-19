function geolocation(coordenadas) {
    if (!navigator.geolocation)
        return null;
    navigator.geolocation.getCurrentPosition((pos) => {
        latUser = pos.coords.latitude;
        lonUser = pos.coords.longitude;
        initMap(coordenadas);
        var lat;
        var lon;
        var new_end;
        // const image = "./person.png";
        // const pilon = "./pilon.png";
    })
}


function initMap(coordenadas) {
    const uluru = { lat: latUser, lng: lonUser };
    map = new google.maps.Map(document.getElementById('map'), {
        center: uluru,
        zoom: 7,
    });
     const marker = new google.maps.Marker({
         position: uluru,
         map: map,
    //     icon: image,
    });
     const final = new google.maps.Marker({
         position: coordenadas,
         map: map,
    //     icon: pilon,
    });

    //Distance Matrix para calcular a distância e o tempo entre dois pontos
    var origin1 = new google.maps.LatLng(latUser, lonUser);
    var destinationA = new google.maps.LatLng(coordenadas.lat, coordenadas.lng);

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin1],
            destinations: [destinationA],
            travelMode: 'DRIVING',
        }, callback);

    function callback(response, status) {
        var retorno = JSON.stringify(response);
        ret = document.getElementById("retorno").innerText = retorno;
        new_end = response.originAddresses[0];
        var endUser =  new_end; 
        //ealert(response.rows.elements.distance.text);
        //var tempo = document.getElementById("tempo").innerText = response.rows.elements[0];
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
        directionsRenderer.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsRenderer, new_end);
    }
    //******* Fim de Distance Matrix */
}
function calculateAndDisplayRoute(directionsService, directionsRenderer, new_end) {
    directionsService
        .route({
            origin: new_end,
            destination: "Av. Roque Petroni Júnior, 1000 - Vila Gertrudes, São Paulo - SP, 04707-000",
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then(function (response) {
            directionsRenderer.setDirections(response);
        })
        .catch(function (e) { return window.alert("Directions request failed due to " + status); });
}
