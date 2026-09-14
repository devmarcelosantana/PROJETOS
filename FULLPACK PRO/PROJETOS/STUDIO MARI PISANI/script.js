/* =========================================================
   CONFIGURAÇÃO DA API
========================================================= */

const API_URL =
    "https://supabase-studio-mari-api.qc3krt.easypanel.host/api";



/* =========================================================
   CONFIGURAÇÕES DO STUDIO
========================================================= */

// Dias de funcionamento
// 0 = Domingo
// 1 = Segunda
// 2 = Terça
// 3 = Quarta
// 4 = Quinta
// 5 = Sexta
// 6 = Sábado

const DIAS_FUNCIONAMENTO = [2, 3, 4, 5, 6];


// Horários disponíveis no Studio

const HORARIOS_DISPONIVEIS = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00"
];



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

            }

            else {

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


    // Impede escolher datas anteriores
    dateInput.min =
        todayString;


    dateInput.addEventListener(
        "change",
        () => {

            const dataSelecionada =
                dateInput.value;


            if (!dataSelecionada) {

                resetarHorarios();

                return;

            }


            const selectedDate =
                new Date(
                    `${dataSelecionada}T12:00:00`
                );


            const weekday =
                selectedDate.getDay();


            if (
                !DIAS_FUNCIONAMENTO.includes(
                    weekday
                )
            ) {

                dateInput.value = "";


                resetarHorarios();


                showAppointmentMessage(
                    "error",
                    "Nosso estúdio não abre neste dia da semana. Escolha um dia válido."
                );


                return;

            }


            verificarDisponibilidade();

        }
    );

}



/* =========================================================
   RESETAR HORÁRIOS
========================================================= */

function resetarHorarios() {

    const selectHorario =
        document.getElementById(
            "horario"
        );


    if (!selectHorario) {

        return;

    }


    selectHorario.innerHTML = `
        <option value="">
            Escolha uma data primeiro
        </option>
    `;


    selectHorario.disabled = true;

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


    if (type) {

        messageElement.classList.add(
            type
        );

    }


    messageElement.textContent =
        message;

}



/* =========================================================
   VERIFICAR DISPONIBILIDADE
========================================================= */

async function verificarDisponibilidade() {

    const dateInput =
        document.getElementById(
            "data"
        );


    const selectHorario =
        document.getElementById(
            "horario"
        );


    if (
        !dateInput ||
        !selectHorario
    ) {

        return;

    }


    const dataSelecionada =
        dateInput.value;


    // Nenhuma data
    if (!dataSelecionada) {

        resetarHorarios();

        return;

    }


    // Estado de carregamento
    selectHorario.disabled = true;


    selectHorario.innerHTML = `
        <option value="">
            Buscando horários...
        </option>
    `;


    try {


        const response =
            await fetch(
                `${API_URL}/appointments/booked/${dataSelecionada}`,
                {
                    method: "GET",
                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                `Erro HTTP ${response.status}`
            );

        }


        const horariosOcupados =
            await response.json();


        console.log(
            "Horários ocupados:",
            horariosOcupados
        );


        // Garantir que seja array
        const ocupados =
            Array.isArray(
                horariosOcupados
            )
                ? horariosOcupados
                : [];


        // Limpar
        selectHorario.innerHTML = `
            <option value="">
                Selecione um horário
            </option>
        `;


        let temHorarioLivre =
            false;


        HORARIOS_DISPONIVEIS.forEach(
            horario => {


                // Normalizar horário
                const horarioNormalizado =
                    String(
                        horario
                    ).substring(0, 5);


                const ocupado =
                    ocupados.some(
                        item =>
                            String(item)
                                .substring(0, 5) ===
                            horarioNormalizado
                    );


                if (!ocupado) {


                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        horarioNormalizado;


                    option.textContent =
                        horarioNormalizado;


                    selectHorario.appendChild(
                        option
                    );


                    temHorarioLivre =
                        true;

                }

            }
        );


        if (!temHorarioLivre) {

            selectHorario.innerHTML = `
                <option value="">
                    Agenda lotada neste dia
                </option>
            `;


            selectHorario.disabled =
                true;


            return;

        }


        selectHorario.disabled =
            false;


    }

    catch (error) {


        console.error(
            "Erro ao verificar disponibilidade:",
            error
        );


        selectHorario.innerHTML = `
            <option value="">
                Erro ao carregar horários
            </option>
        `;


        selectHorario.disabled =
            true;


        showAppointmentMessage(
            "error",
            "Não foi possível consultar os horários disponíveis. Tente novamente."
        );

    }

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
                    .getElementById(
                        "nome"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "telefone"
                    )
                    .value
                    .trim();


            const date =
                document
                    .getElementById(
                        "data"
                    )
                    .value;


            const time =
                document
                    .getElementById(
                        "horario"
                    )
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
               VALIDAR DIA
            -------------------------------------------- */

            const selectedDate =
                new Date(
                    `${date}T12:00:00`
                );


            const weekday =
                selectedDate.getDay();


            if (
                !DIAS_FUNCIONAMENTO.includes(
                    weekday
                )
            ) {

                showAppointmentMessage(
                    "error",
                    "Nosso estúdio não abre neste dia da semana."
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
                                    "application/json",

                                "Accept":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    name:
                                        name,

                                    phone:
                                        phone,

                                    date:
                                        date,

                                    time:
                                        time,

                                    services:
                                        services
                                })
                        }
                    );


                let result = {};


                try {

                    result =
                        await response.json();

                }

                catch {

                    result = {};

                }


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
                    date
                        .split("-")
                        .reverse()
                        .join("/");


                const whatsappMessage =
                    `Olá! Acabei de solicitar um agendamento no Studio Mari Pisani.\n\n` +

                    `*Nome:* ${name}\n` +

                    `*Telefone:* ${phone}\n` +

                    `*Data:* ${formattedDate}\n` +

                    `*Horário:* ${time}\n` +

                    `*Serviços:* ${services.join(", ")}`;


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


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


                resetarHorarios();


                // Reaplicar data mínima
                const dateInput =
                    document.getElementById(
                        "data"
                    );


                if (dateInput) {

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


                    dateInput.min =
                        `${year}-${month}-${day}`;

                }


            }

            catch (error) {


                console.error(
                    "Erro ao registrar agendamento:",
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

        resetarHorarios();

    }
);