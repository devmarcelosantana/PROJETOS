/* CARROSSEL DO PORTFÓLIO */
const portfolioItems = document.querySelectorAll(".portfolio-item");
const prevButton = document.querySelector(".portfolio-prev");
const nextButton = document.querySelector(".portfolio-next");
const portfolioDots = document.querySelectorAll(".portfolio-dot");
let currentPortfolio = 0;

/* ATUALIZAR POSIÇÕES */
function updatePortfolio() {
    const total = portfolioItems.length;
    portfolioItems.forEach((item, index) => {
        /* Remove todas as classes */
        item.classList.remove(
            "active",
            "prev",
            "next",
            "far-prev",
            "far-next"
        );

        /*
         * Calcula a diferença entre
         * o projeto atual e o projeto
         * que está sendo analisado.
         */
        let difference =
            index - currentPortfolio;

        /*
         * Corrige a navegação circular.
         */
        if (difference > total / 2) {
            difference -= total;
        }

        if (difference < -total / 2) {
            difference += total;
        }

        /* PROJETO CENTRAL */
        if (difference === 0) {
            item.classList.add("active");
        }

        /* PROJETO À ESQUERDA */
        else if (difference === -1) {
            item.classList.add("prev");
        }

        /* PROJETO À DIREITA */
        else if (difference === 1) {
            item.classList.add("next");
        }

        /* PROJETO DISTANTE À ESQUERDA */
        else if (difference < -1) {
            item.classList.add("far-prev");
        }

        /* PROJETO DISTANTE À DIREITA */
        else if (difference > 1) {
            item.classList.add("far-next");
        }
    });

    /* ATUALIZA OS DOTS */
    portfolioDots.forEach((dot, index) => {
        dot.classList.toggle(
            "active",
            index === currentPortfolio
        );
    });

}

/* PRÓXIMO */
nextButton.addEventListener("click", () => {
    currentPortfolio++;
    if (
        currentPortfolio >=
        portfolioItems.length
    ) {
        currentPortfolio = 0;
    }
    updatePortfolio();
});

/* ANTERIOR */
prevButton.addEventListener("click", () => {
    currentPortfolio--;
    if (currentPortfolio < 0) {
        currentPortfolio =
            portfolioItems.length - 1;
    }

    updatePortfolio();
});

/* DOTS */
portfolioDots.forEach(dot => {
    dot.addEventListener("click", () => {
        currentPortfolio =
            Number(dot.dataset.index);
        updatePortfolio();
    });
});

/* INICIALIZA */
updatePortfolio();

/* MENU RESPONSIVO */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    const menuAberto = navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    menuToggle.setAttribute(
        "aria-expanded",
        menuAberto
    );

    menuToggle.setAttribute(
        "aria-label",
        menuAberto
            ? "Fechar menu"
            : "Abrir menu"
    );

});

// Fecha o menu ao clicar em uma opção
const navLinks = navMenu.querySelectorAll("a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );
    });
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", (event) => {
    const clicouDentroDoMenu = navMenu.contains(event.target);
    const clicouNoBotao = menuToggle.contains(event.target);

    if (
        !clicouDentroDoMenu &&
        !clicouNoBotao &&
        navMenu.classList.contains("active")
    ) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );
    }
});