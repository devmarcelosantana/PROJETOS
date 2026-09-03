const convertButton = document.querySelector(".button-converter");
const currencySelectFrom = document.querySelector("#coin-from");
const currencySelectTo = document.querySelector("#coin-to");

/**
 * Realiza a conversão utilizando o Dólar Americano (USD) como a moeda base da API.
 * Cálculo: (Valor Digitado ÷ Taxa USD da Moeda de Origem) × Taxa USD da Moeda de Destino
 */
async function convertCurrency() {
    let rawValue = document.querySelector("#valor").value;

    if (rawValue.trim() === "") return;

    // Normaliza a entrada com vírgula para ponto
    rawValue = rawValue.replace(",", ".");
    const inputConvertValue = parseFloat(rawValue);

    if (isNaN(inputConvertValue)) {
        alert("Por favor, digite um valor numérico válido.");
        return;
    }

    if (currencySelectTo.value === "selecione" || currencySelectFrom.value === "selecione") {
        document.querySelector("#resume-value-to").value = "";
        document.querySelector("#resume-value-from").value = "";
        return;
    }

    try {
        const response = await fetch('https://cdn.moneyconvert.net/api/latest.json');
        const data = await response.json();

        const rates = data.rates;

        // Todas as taxas da API são baseadas diretamente em 1 USD
        const usdBaseRates = {
            "dólar-americano": 1.0,           // Base de referência
            "real": rates.BRL,                // Quanto vale 1 USD em BRL
            "dólar-canadense": rates.CAD,     // Quanto vale 1 USD em CAD
            "euro": rates.EUR,                // Quanto vale 1 USD em EUR
            "libra-esterlina": rates.GBP      // Quanto vale 1 USD em GBP
        };

        // Mapeamento para formatação visual (Intl)
        const formatConfigs = {
            "real": { locale: "pt-BR", currency: "BRL" },
            "dólar-americano": { locale: "en-US", currency: "USD" },
            "dólar-canadense": { locale: "en-CA", currency: "CAD" },
            "euro": { locale: "de-DE", currency: "EUR" },
            "libra-esterlina": { locale: "en-GB", currency: "GBP" }
        };

        const currencyValueToConvert = document.querySelector("#resume-value-to");
        const currencyValueConverted = document.querySelector("#resume-value-from");

        // 1. Converte o valor de entrada para a base Dólar (USD)
        const taxaOrigemUSD = usdBaseRates[currencySelectTo.value];
        const valorEmDolares = inputConvertValue / taxaOrigemUSD;

        // 2. Converte do Dólar (USD) para a moeda de destino escolhida
        const taxaDestinoUSD = usdBaseRates[currencySelectFrom.value];
        const valorFinalConvertido = valorEmDolares * taxaDestinoUSD;

        // Formatação do campo de entrada (moeda de origem)
        const configTo = formatConfigs[currencySelectTo.value];
        currencyValueToConvert.value = new Intl.NumberFormat(configTo.locale, {
            style: "currency",
            currency: configTo.currency
        }).format(inputConvertValue);

        // Formatação do campo de saída (moeda convertida)
        const configFrom = formatConfigs[currencySelectFrom.value];
        currencyValueConverted.value = new Intl.NumberFormat(configFrom.locale, {
            style: "currency",
            currency: configFrom.currency
        }).format(valorFinalConvertido);

    } catch (error) {
        console.error("Erro ao buscar as taxas em Dólar na API:", error);
    }
}

/**
 * Dicionário de configuração da interface gráfica para os seletores
 */
const UI_CURRENCY_CONFIG = {
    "selecione": { name: "Selecione", img: "./ASSETS/icon-interrogation.png" },
    "real": { name: "Real", img: "./ASSETS/icon-brasil.png" },
    "dólar-americano": { name: "Dólar Americano", img: "./ASSETS/icon-eua.png" },
    "dólar-canadense": { name: "Dólar Canadense", img: "./ASSETS/icon-canada.png" },
    "euro": { name: "Euro", img: "./ASSETS/icon-euro.png" },
    "libra-esterlina": { name: "Libra Esterlina", img: "./ASSETS/icon-inglaterra.png" }
};

function changeCurrencyTo() {
    const currencyNameTo = document.getElementById("text-result-to");
    const currencyImgTo = document.querySelector(".icon-flags-to");

    const selected = UI_CURRENCY_CONFIG[currencySelectTo.value];
    if (selected) {
        currencyNameTo.innerHTML = selected.name;
        currencyImgTo.src = selected.img;
    }

    convertCurrency();
}

function changeCurrencyFrom() {
    const currencyNameFrom = document.getElementById("text-result-from");
    const currencyImgFrom = document.querySelector(".icon-flags-from");

    const selected = UI_CURRENCY_CONFIG[currencySelectFrom.value];
    if (selected) {
        currencyNameFrom.innerHTML = selected.name;
        currencyImgFrom.src = selected.img;
    }

    convertCurrency();
}

// Event Listeners
convertButton.addEventListener("click", convertCurrency);
currencySelectTo.addEventListener("change", changeCurrencyTo);
currencySelectFrom.addEventListener("change", changeCurrencyFrom);