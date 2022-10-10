function geolocation(endereco) {
    if (!navigator.geolocation)
        return null;
    navigator.geolocation.getCurrentPosition((pos) => {
        latUser = pos.coords.latitude;
        lonUser = pos.coords.longitude;
        initMap(endereco);
        var lat;
        var lon;
        var new_end;
    })
}


function initMap(endereco) {
    const geocoder = new google.maps.Geocoder();
    geocoder
        .geocode({ address: endereco })
        .then((response) => {
            let position = response.results[0].geometry.location;
            let coordenadas = JSON.stringify(position);
            coordenadas = JSON.parse(coordenadas);
            calculaDistancia(coordenadas);
        })
    
    function calculaDistancia(coordenadas) {
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
            new_end = response.originAddresses[0];
            var endUser =  new_end; 
            var endDestino = document.getElementById("endereco").innerText = "Endereço: " + endereco;
            var tempo = document.getElementById("tempo").innerText = "Tempo de viagem: " + response.rows[0].elements[0].duration.text;
            var duracao = document.getElementById("distancia").innerText = "Distância de carro: " + response.rows[0].elements[0].distance.text
            var directionsService = new google.maps.DirectionsService();
            var directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
            directionsRenderer.setMap(map);
            calculateAndDisplayRoute(directionsService, directionsRenderer, new_end,endereco);
        }
        //******* Fim de Distance Matrix */
    }
}
function calculateAndDisplayRoute(directionsService, directionsRenderer, new_end,endereco) {
    directionsService
        .route({
            origin: new_end,
            destination: endereco,
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then(function (response) {
            directionsRenderer.setDirections(response);
        })
        .catch(function (e) { return window.alert("Directions request failed due to " + status); });
}
