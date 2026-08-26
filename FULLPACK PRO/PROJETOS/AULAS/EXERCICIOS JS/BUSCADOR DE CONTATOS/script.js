const searchContact = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const searchResult = document.querySelector("#searchResult");
searchResult.value = ""; 

const contacts = [
    {nome: "marcelo", tel: "123-456-7890"},
    {nome: "julia", tel: "987-654-3210"},
    {nome: "theo", tel: "555-555-5555"},
    {nome: "gael", tel: "111-222-3333"},
    {nome: "isa", tel: "444-555-6666"}
];

searchButton.addEventListener("click", function() {
    const searchContactValue = searchContact.value.toLowerCase();
    let foundContact = null;
    let i = 0;

while (i < contacts.length){
    let contactActual = contacts[i];

    if (contactActual.nome === searchContactValue) {
        foundContact = contactActual;
        break;
    }

    i++;
}

    if (foundContact) {
        const nameFormated = foundContact.nome.charAt(0).toUpperCase() + foundContact.nome.slice(1);
        searchResult.value = `Nome: ${nameFormated}, Telefone: ${foundContact.tel}`;
    } else {
        searchResult.value = "Contato não encontrado";
    }
});