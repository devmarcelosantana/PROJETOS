// Inicializa o índice do slide atual
let slideIndex = 0;

// Dispara a função assim que a página terminar de carregar
window.addEventListener("DOMContentLoaded", () => {
    showSlides();
});

function showSlides() {
    // Seleciona todas as imagens do carrossel
    const slides = document.querySelectorAll(".carousel-container .slide");
    
    // Se não houver slides no HTML, interrompe a função para evitar erros
    if (slides.length === 0) return;

    // Esconde todos os slides redefinindo o display para "none"
    // e remove a classe fade antiga para poder resetar a animação
    slides.forEach(slide => {
        slide.style.display = "none";
        slide.classList.remove("fade");
    });

    // Avança para o próximo slide
    slideIndex++;

    // Se passar da quantidade total de imagens, volta para o primeiro slide
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Seleciona o slide atual (ajustando o índice para base zero)
    const currentSlide = slides[slideIndex - 1];

    // Exibe o slide atual e força o gatilho da sua animação CSS
    currentSlide.style.display = "block";
    
    // Um pequeno truque de tempo (reflow) para garantir que o navegador 
    // perceba a reaplicação da classe de animação
    void currentSlide.offsetWidth; 
    
    currentSlide.classList.add("fade");

    // Define o tempo de troca de imagem (3000ms = 3 segundos)
    setTimeout(showSlides, 3000);
}