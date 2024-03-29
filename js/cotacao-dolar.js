const data = new Date();

if (data.getDay() == "1") // Se é segunda pega a cotação de sexta (data.getDate()-3)
{
    dataFormatada = (((data.getMonth()+1)) + "-" + (data.getDate()-3) + "-" + data.getFullYear()).toLocaleString();
}
else if (data.getDay() == "0") // Se é domingo pega a cotação de sexta (data.getDate()-2)
{
    dataFormatada = (((data.getMonth()+1)) + "-" + (data.getDate()-2) + "-" + data.getFullYear()).toLocaleString();
}
else // Nos outros dias pega a cotação do dia anterior (data.getDate()-1)
{
    dataFormatada = (((data.getMonth()+1)) + "-" + (data.getDate()-1) + "-" + data.getFullYear()).toLocaleString();
}

// Esse trecho do codigo consome a API do banco central brasileiro e retorna os dados da cotacao atual de compra, venda e horario da consulta
let url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" + dataFormatada + "'&$top=100&$format=json"; //URL da API
let request = new XMLHttpRequest(); //Instancia do XMLHttpRequest
request.open('GET', url, true); //Solicitacao de consulta na API

//Essa funcao faz o request dos dados da API logo quando o codigo (ou seja, a pagina em si) é carregada.
request.onload = function() {

    if (request.readyState == 4 && request.status == 200) {
        var resposta = JSON.parse(request.responseText);

        var valores = resposta.value[0]; 

        var valorDolar = document.getElementById("valorDolar");

        valorDolar.innerHTML = valores.cotacaoCompra.toFixed(2);
    }     
};

//Essa funcao, avisa caso ocorra algum erro nessa consulta, e printa no console o erro propriamente dito    
request.onerror = function() {
    console.log("Erro:" + request);
};
    
request.send();



