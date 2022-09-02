var settings = {
    url: "https://weather.contrateumdev.com.br/api/weather/city/?city=Sao%20Paulo,sao%20paulo",
    method: "GET",
    timeout: 0,
    contentType:"application/json; charset=utf-8",
    dataType:"json",
};

$.ajax(settings).done(function (response) {
    console.log(response);
});

var response = document.getElementById("valorTempo");