const chk = document.getElementById('chk')

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode')
})

function aumenta(){
    let el = document.querySelector('html');
    // alterando uma propriedade
    el.style.fontSize = '20px';
}
function diminui(){
    let el = document.querySelector('html');
    // alterando uma propriedade
    el.style.fontSize = '15px';
}

function dislexia(){
    alert("cheguei");
    let el = document.querySelector('html');
    // alterando uma propriedade
    el.style.fontFamily  = 'Douglas';
    el.style.fontSize    = '30px';
    alert("passei, mas não alterei");
}
