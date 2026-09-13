/* =========================================================
   CONFIGURAÇÃO DA API
========================================================= */

/*
    Durante o desenvolvimento:

    backend:
    http://localhost:3000

    Se futuramente frontend e backend estiverem
    hospedados no mesmo domínio, podemos trocar
    para simplesmente "/api".
*/

const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"

        ? "http://localhost:3000/api"

        : "/api";



/* =========================================================
   CARROSSEL
========================================================= */

let slideIndex = 0;


function showSlides() {

    const slides =
        document.querySelectorAll(
            ".carousel-container .slide"
        );


    if (!slides.length) {
        return;
    }


    slides.forEach(slide => {

        slide.style.display = "none";

        slide.classList.remove("fade");

    });


    slideIndex++;


    if (slideIndex > slides.length) {

        slideIndex = 1;

    }


    const currentSlide =
        slides[slideIndex - 1];


    currentSlide.style.display = "block";


    void currentSlide.offsetWidth;


    currentSlide.classList.add("fade");


    setTimeout(
        showSlides,
        4000
    );

}



/* =========================================================
   MENU SERVIÇOS
========================================================= */

function initServicesMenu() {

    const servicosBtn =
        document.getElementById(
            "servicosBtn"
        );


    const servicesDrawer =
        document.getElementById(
            "servicesDrawer"
        );


    const servicesOverlay =
        document.getElementById(
            "servicesOverlay"
        );


    const servicesClose =
        document.getElementById(
            "servicesClose"
        );


    const serviceButtons =
        document.querySelectorAll(
            ".services-menu button"
        );


    const servicePanels =
        document.querySelectorAll(
            ".service-panel"
        );


    if (
        !servicosBtn ||
        !servicesDrawer ||
        !servicesOverlay ||
        !servicesClose
    ) {

        return;

    }


    function openServices() {

        servicesDrawer.classList.add(
            "active"
        );

        servicesOverlay.classList.add(
            "active"
        );

        document.body.classList.add(
            "services-open"
        );


        showService("servicos");

    }


    function closeServices() {

        servicesDrawer.classList.remove(
            "active"
        );

        servicesOverlay.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "services-open"
        );

    }


    function showService(serviceName) {

        servicePanels.forEach(
            panel => {

                panel.classList.remove(
                    "active"
                );

            }
        );


        serviceButtons.forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );


        const selectedPanel =
            document.getElementById(
                "service-" + serviceName
            );


        if (selectedPanel) {

            selectedPanel.classList.add(
                "active"
            );

        }


        const selectedButton =
            document.querySelector(
                `[data-service="${serviceName}"]`
            );


        if (selectedButton) {

            selectedButton.classList.add(
                "active"
            );

        }

    }


    servicosBtn.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openServices();

        }
    );


    serviceButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    showService(
                        button.dataset.service
                    );

                }
            );

        }
    );


    servicesClose.addEventListener(
        "click",
        closeServices
    );


    servicesOverlay.addEventListener(
        "click",
        closeServices
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeServices();

            }

        }
    );

}



/* =========================================================
   MENU MOBILE
========================================================= */

function initMobileMenu() {

    const button =
        document.getElementById(
            "mobileMenuButton"
        );


    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    if (!button || !sidebar) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );


    const links =
        document.querySelectorAll(
            ".sidebar-link"
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                sidebar.classList.remove(
                    "mobile-open"
                );

            }
        );

    });

}



/* =========================================================
   MÁSCARA TELEFONE
========================================================= */

function initPhoneMask() {

    const phoneInput =
        document.getElementById(
            "telefone"
        );


    if (!phoneInput) {

        return;

    }


    phoneInput.addEventListener(
        "input",
        event => {

            let value =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 11);


            if (value.length <= 10) {

                value =
                    value.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );

                value =
                    value.replace(
                        /(\d{4})(\d)/,
                        "$1-$2"
                    );

            } else {

                value =
                    value.replace(
                        /^(\d{2})(\d)/,
                        "($1) $2"
                    );

                value =
                    value.replace(
                        /(\d{5})(\d)/,
                        "$1-$2"
                    );

            }


            event.target.value =
                value;

        }
    );

}



/* =========================================================
   DATA MÍNIMA
========================================================= */

function initDateField() {

    const dateInput =
        document.getElementById(
            "data"
        );


    if (!dateInput) {

        return;

    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const todayString =
        `${year}-${month}-${day}`;


    dateInput.min =
        todayString;


    dateInput.addEventListener(
        "change",
        () => {

            if (!dateInput.value) {
                return;
            }


            const selectedDate =
                new Date(
                    `${dateInput.value}T12:00:00`
                );


            const weekday =
                selectedDate.getDay();


            if (
                weekday === 0 ||
                weekday === 6
            ) {

                dateInput.value = "";


                showAppointmentMessage(
                    "error",
                    "Os agendamentos estão disponíveis somente de segunda a sexta-feira."
                );

            }

        }
    );

}



/* =========================================================
   MENSAGEM
========================================================= */

function showAppointmentMessage(
    type,
    message
) {

    const messageElement =
        document.getElementById(
            "appointmentMessage"
        );


    if (!messageElement) {

        return;

    }


    messageElement.className =
        "appointment-message";


    messageElement.classList.add(
        type
    );


    messageElement.textContent =
        message;

}



/* =========================================================
   AGENDAMENTO
========================================================= */

function initAppointmentForm() {

    const form =
        document.getElementById(
            "appointmentForm"
        );


    if (!form) {

        return;

    }


    const submitButton =
        document.getElementById(
            "button-submit"
        );


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            showAppointmentMessage(
                "",
                ""
            );


            const name =
                document
                    .getElementById("nome")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("telefone")
                    .value
                    .trim();


            const date =
                document
                    .getElementById("data")
                    .value;


            const time =
                document
                    .getElementById("horario")
                    .value;


            const serviceInputs =
                document.querySelectorAll(
                    'input[name="servicos"]:checked'
                );


            const services =
                Array.from(
                    serviceInputs
                ).map(
                    input =>
                        input.value
                );


            /* -------------------------------------------
               VALIDAÇÃO
            -------------------------------------------- */

            if (!name) {

                showAppointmentMessage(
                    "error",
                    "Informe seu nome."
                );

                return;

            }


            if (!phone) {

                showAppointmentMessage(
                    "error",
                    "Informe seu telefone."
                );

                return;

            }


            if (!date) {

                showAppointmentMessage(
                    "error",
                    "Escolha uma data."
                );

                return;

            }


            if (!time) {

                showAppointmentMessage(
                    "error",
                    "Escolha um horário."
                );

                return;

            }


            if (!services.length) {

                showAppointmentMessage(
                    "error",
                    "Selecione pelo menos um serviço."
                );

                return;

            }


            /* -------------------------------------------
               IMPEDIR FIM DE SEMANA
            -------------------------------------------- */

            const selectedDate =
                new Date(
                    `${date}T12:00:00`
                );


            const weekday =
                selectedDate.getDay();


            if (
                weekday === 0 ||
                weekday === 6
            ) {

                showAppointmentMessage(
                    "error",
                    "Escolha um dia de segunda a sexta-feira."
                );

                return;

            }


            /* -------------------------------------------
               ENVIAR PARA API
            -------------------------------------------- */

            submitButton.disabled =
                true;


            submitButton.textContent =
                "REGISTRANDO AGENDAMENTO...";


            try {

                const response =
                    await fetch(
                        `${API_URL}/appointments`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    name,
                                    phone,
                                    date,
                                    time,
                                    services
                                })
                        }
                    );


                const result =
                    await response.json();


                /* ---------------------------------------
                   ERRO
                ---------------------------------------- */

                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Não foi possível realizar o agendamento."
                    );

                }


                /* ---------------------------------------
                   SUCESSO
                ---------------------------------------- */

                showAppointmentMessage(
                    "success",
                    "Seu agendamento foi registrado com sucesso! Aguarde a confirmação do Studio Mari Pisani."
                );


                /* ---------------------------------------
                   WHATSAPP
                ---------------------------------------- */

                const whatsappNumber =
                    "5511970710715";


                const formattedDate =
                    date.split("-").reverse().join("/");


                const whatsappMessage =
                    `Olá! Acabei de solicitar um agendamento no Studio Mari Pisani.%0A%0A` +

                    `*Nome:* ${encodeURIComponent(name)}%0A` +

                    `*Telefone:* ${encodeURIComponent(phone)}%0A` +

                    `*Data:* ${formattedDate}%0A` +

                    `*Horário:* ${encodeURIComponent(time)}%0A` +

                    `*Serviços:* ${encodeURIComponent(services.join(", "))}`;


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


                /*
                    Pequeno atraso para que a mensagem
                    de sucesso seja exibida antes de
                    abrir o WhatsApp.
                */

                setTimeout(
                    () => {

                        window.open(
                            whatsappURL,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    },
                    700
                );


                /* ---------------------------------------
                   LIMPAR FORMULÁRIO
                ---------------------------------------- */

                form.reset();


                initDateField();

            }

            catch (error) {

                console.error(
                    error
                );


                showAppointmentMessage(
                    "error",
                    error.message ||
                    "Não foi possível registrar o agendamento. Tente novamente."
                );

            }

            finally {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "SOLICITAR AGENDAMENTO";

            }

        }
    );

}



/* =========================================================
   INICIALIZAÇÃO
========================================================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        showSlides();

        initServicesMenu();

        initMobileMenu();

        initPhoneMask();

        initDateField();

        initAppointmentForm();

    }
);