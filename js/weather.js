let urlWeather = "https://api.hgbrasil.com/weather?key=d9be8928&city_name=São Paulo,SP&user_ip=remote&format=json-cors"; //URL da API
let requestWeather = new XMLHttpRequest(); //Instancia do XMLHttpRequest
requestWeather.open('GET', urlWeather); //Solicitacao de consulta na API

//Essa funcao faz o request dos dados da API logo quando o codigo (ou seja, a pagina em si) é carregada.
requestWeather.onload = function() {

    if (requestWeather.readyState == 4 && requestWeather.status == 200) {
        var resposta = JSON.parse(requestWeather.responseText);

        var results = resposta.results; 

        var description = document.getElementById("description");

        description.innerHTML = results.temp + " <i class='bi bi-cloud-sun text-warning'></i>";
    }     
};

//Essa funcao, avisa caso ocorra algum erro nessa consulta, e printa no console o erro propriamente dito    
requestWeather.onerror = function() {
    console.log("Erro:" + requestWeather);
};
    
requestWeather.send();