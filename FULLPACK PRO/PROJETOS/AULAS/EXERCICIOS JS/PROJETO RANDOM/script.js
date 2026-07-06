const inputMínimo = document.getElementById("mínimo");
const inputMáximo = document.getElementById("máximo");
const buttonGerar = document.getElementById("gerar");
const inputResultado = document.getElementById("resultado");

buttonGerar.addEventListener("click", () => {
    const min = parseInt(inputMínimo.value);
    const max = parseInt(inputMáximo.value);
    const resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    inputResultado.value = resultado;
})