const convertButton = document.querySelector(".button-converter")

const currencySelectFrom = document.querySelector("#coin-to")
const currencySelectTo = document.querySelector("#coin-from")   

function convertCurrency () {
    let rawValue = document.querySelector("#valor").value;
    

    if (rawValue.trim() == "") {
        return;}


    if (currencySelectFrom.value == "selecione" || currencySelectTo.value == "selecione") {
        document.querySelector("#resume-value-to").value = "";
        document.querySelector("#resume-value-from").value = "";
        return; 
    }
        
    rawValue = rawValue.replace(",", ".");
    const inputConvertValue = parseFloat(rawValue);
    
    const currencyValueToConvert = document.querySelector("#resume-value-to")   
    const currencyValueConverted = document.querySelector("#resume-value-from") 
    

    if (isNaN(inputConvertValue)){
        alert("Por favor, digite um valor numérico válido.")
        return
    }

    const valueReal = 1
    const valueDolar = 5.2
    const valueEuro = 6.2
    const valueLibra = 7.11
    const valueDolarCanada = 4.11

    let valorEmReais = 0

    if (currencySelectFrom.value == "real") { valorEmReais = inputConvertValue * valueReal }
    else if (currencySelectFrom.value == "dólar-americano") { valorEmReais = inputConvertValue * valueDolar }
    else if (currencySelectFrom.value == "dólar-canadense") { valorEmReais = inputConvertValue * valueDolarCanada }
    else if (currencySelectFrom.value == "euro") { valorEmReais = inputConvertValue * valueEuro}
    else if (currencySelectFrom.value == "libra-esterlina") { valorEmReais = inputConvertValue * valueLibra }


    if (currencySelectFrom.value == "real"){
        currencyValueToConvert.value = new Intl.NumberFormat ("pt-BR", { style: "currency", currency: "BRL" }).format (inputConvertValue)}
    else if (currencySelectFrom.value == "dólar-americano"){
        currencyValueToConvert.value = new Intl.NumberFormat ("en-US", { style: "currency", currency: "USD" }).format (inputConvertValue)}
    else if (currencySelectFrom.value == "dólar-canadense"){
        currencyValueToConvert.value = new Intl.NumberFormat ("en-CA", { style: "currency", currency: "CAD" }).format (inputConvertValue)}
    else if (currencySelectFrom.value == "euro"){
        currencyValueToConvert.value = new Intl.NumberFormat ("de-DE", { style: "currency", currency: "EUR" }).format (inputConvertValue)}
    else if (currencySelectFrom.value == "libra-esterlina"){
        currencyValueToConvert.value = new Intl.NumberFormat ("en-GB", { style: "currency", currency: "GBP" }).format (inputConvertValue)}


    if (currencySelectTo.value == "real"){
        currencyValueConverted.value = new Intl.NumberFormat ("pt-BR", { style: "currency", currency: "BRL" }).format (valorEmReais / valueReal)}
    else if (currencySelectTo.value == "dólar-americano"){
        currencyValueConverted.value = new Intl.NumberFormat ("en-US", { style: "currency", currency: "USD" }).format (valorEmReais / valueDolar)}
    else if (currencySelectTo.value == "dólar-canadense"){
        currencyValueConverted.value = new Intl.NumberFormat ("en-CA", { style: "currency", currency: "CAD" }).format (valorEmReais / valueDolarCanada)}
    else if (currencySelectTo.value == "euro"){
        currencyValueConverted.value = new Intl.NumberFormat ("de-DE", { style: "currency", currency: "EUR" }).format (valorEmReais / valueEuro)}
    else if (currencySelectTo.value == "libra-esterlina"){
        currencyValueConverted.value = new Intl.NumberFormat ("en-GB", { style: "currency", currency: "GBP" }).format (valorEmReais / valueLibra)}
}

function changeCurrencyFrom() {
    const currencyNameFrom = document.getElementById("text-result-from")
    const currencyImgFrom = document.querySelector(".icon-flags-from")

    if (currencySelectFrom.value == "selecione") {
        currencyNameFrom.innerHTML = "Selecione"
        currencyImgFrom.src = "./ASSETS/icon-interrogation.png"}
    else if (currencySelectFrom.value == "real") {
        currencyNameFrom.innerHTML = "Real"
        currencyImgFrom.src = "./ASSETS/icon-brasil.png"}
    else if (currencySelectFrom.value == "dólar-americano") {
        currencyNameFrom.innerHTML = "Dólar Americano"
        currencyImgFrom.src = "./ASSETS/icon-eua.png"}
    else if (currencySelectFrom.value == "dólar-canadense") {
        currencyNameFrom.innerHTML = "Dólar Canadense"
        currencyImgFrom.src = "./ASSETS/icon-canada.png"}
    else if (currencySelectFrom.value == "euro") {
        currencyNameFrom.innerHTML = "Euro"
        currencyImgFrom.src = "./ASSETS/icon-euro.png"}
    else if (currencySelectFrom.value == "libra-esterlina") {
        currencyNameFrom.innerHTML = "Libra Esterlina"
        currencyImgFrom.src = "./ASSETS/icon-inglaterra.png"}
}

function changeCurrencyTo() {
    const currencyNameTo = document.getElementById("text-result-to")
    const currencyImgTo = document.querySelector(".icon-flags-to")

    if (currencySelectTo.value == "selecione") {
        currencyNameTo.innerHTML = "Selecione"
        currencyImgTo.src = "./ASSETS/icon-interrogation.png"}
    else if (currencySelectTo.value == "real") {
        currencyNameTo.innerHTML = "Real"
        currencyImgTo.src = "./ASSETS/icon-brasil.png"}
    else if (currencySelectTo.value == "dólar-americano") {
        currencyNameTo.innerHTML = "Dólar Americano"
        currencyImgTo.src = "./ASSETS/icon-eua.png"}
    else if (currencySelectTo.value == "dólar-canadense") {
        currencyNameTo.innerHTML = "Dólar Canadense"
        currencyImgTo.src = "./ASSETS/icon-canada.png"}
    else if (currencySelectTo.value == "euro") {
        currencyNameTo.innerHTML = "Euro"
        currencyImgTo.src = "./ASSETS/icon-euro.png"}
    else if (currencySelectTo.value == "libra-esterlina") {
        currencyNameTo.innerHTML = "Libra Esterlina"
        currencyImgTo.src = "./ASSETS/icon-inglaterra.png"}

    convertCurrency ()
}

convertButton.addEventListener("click", convertCurrency)
currencySelectTo.addEventListener("change", changeCurrencyTo)
currencySelectFrom.addEventListener("change", changeCurrencyFrom)