document.addEventListener('DOMContentLoaded', () => {
    // --- SEÇÕES E NAVEGAÇÃO ---
    const menuSection = document.getElementById('menu');
    const reservaSection = document.getElementById('sectionContact');
    const rodizioDiv = document.getElementById('rodizio');
    
    const btnCardapio = document.getElementById('btnCardapio');
    const btnReserva = document.getElementById('btnReserva');
    const btnHome = document.getElementById('btnHome');
    const btnQuemSomos = document.getElementById('btnQuemSomos');

    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const closeReservaBtn = document.getElementById('closeReservaBtn');
    const closeRodizioBtn = document.getElementById('closeRodizioBtn');

    function fecharTodasAsSecoes() {
        if (menuSection) menuSection.classList.remove('active');
        if (reservaSection) reservaSection.classList.remove('active');
        document.querySelectorAll('#menu > div[id]').forEach(div => div.classList.remove('active'));
        document.body.classList.remove('cardapio-open');
    }

    // Abertura de telas principais
    if (btnCardapio && menuSection) {
        btnCardapio.addEventListener('click', (e) => {
            e.preventDefault();
            fecharTodasAsSecoes();
            menuSection.classList.add('active');
            document.body.classList.add('cardapio-open');
        });
    }

    if (btnReserva && reservaSection) {
        btnReserva.addEventListener('click', (e) => {
            e.preventDefault();
            fecharTodasAsSecoes();
            reservaSection.classList.add('active');
        });
    }

    // Clique nas opções internas do cardápio (#rodizio, #burguer, etc.)
    const optionsLinks = document.querySelectorAll('#optionsMenu a');
    optionsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Esconde todas as outras sub-abas
            document.querySelectorAll('#menu > div[id]').forEach(div => {
                div.classList.remove('active');
            });

            // Exibe e rola até a sub-aba clicada
            if (targetElement) {
                targetElement.classList.add('active');
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Botões de fechar
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', fecharTodasAsSecoes);
    if (closeReservaBtn) closeReservaBtn.addEventListener('click', fecharTodasAsSecoes);
    if (btnHome) btnHome.addEventListener('click', fecharTodasAsSecoes);
    if (btnQuemSomos) btnQuemSomos.addEventListener('click', fecharTodasAsSecoes);

    if (closeRodizioBtn && rodizioDiv) {
        closeRodizioBtn.addEventListener('click', () => rodizioDiv.classList.remove('active'));
    }

    const closeSubtabBtns = document.querySelectorAll('.close-subtab-btn');
    closeSubtabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parentDiv = btn.closest('#menu > div[id]');
            if (parentDiv) {
                parentDiv.classList.remove('active');
            }
        });
    });

    // --- PLAYLISTS DE VÍDEO ---
    // Vídeo 1
    const v1 = document.getElementById('video1');
    const playlistVideo1 = [
        'ASSETS/MENU/videos/video1.mp4',
        'ASSETS/MENU/videos/video2.mp4',
        'ASSETS/MENU/videos/video3.mp4'
    ];
    let indexV1 = 0;
    if (v1) {
        v1.addEventListener('ended', () => {
            indexV1 = (indexV1 + 1) % playlistVideo1.length;
            v1.src = playlistVideo1[indexV1];
            v1.play();
        });
    }

    // Vídeo 3
    const v3 = document.getElementById('video3');
    const playlistVideo3 = [
        'ASSETS/MENU/videos/video4.mp4',
        'ASSETS/MENU/videos/video5.mp4',
        'ASSETS/MENU/videos/video6.mp4'
    ];
    let indexV3 = 0;
    if (v3) {
        v3.removeAttribute('loop');
        v3.addEventListener('ended', () => {
            indexV3 = (indexV3 + 1) % playlistVideo3.length;
            v3.src = playlistVideo3[indexV3];
            v3.play();
        });
    };

    // Vídeo 4
    const v4 = document.getElementById('video4')
    const playlistVideo4 = [
        'ASSETS/MENU/videos/rodizio1.mp4',
        'ASSETS/MENU/videos/rodizio2.mp4',
        'ASSETS/MENU/videos/rodizio3.mp4'
    ];
    let indexV4 = 0;
    if (v4) {
        v4.removeAttribute('loop');
        v4.addEventListener('ended', () => {
            indexV4 = (indexV4 + 1) % playlistVideo4.length;
            v4.src = playlistVideo4[indexV4];
            v4.play();
        });
    };
    

        // Vídeo 5
    const v5 = document.getElementById('video5')
    const playlistVideo5 = [
        'ASSETS/MENU/videos/prato1.mp4',
        'ASSETS/MENU/videos/prato2.mp4'
    ];
    let indexV5 = 0;
    if (v5) {
        v5.removeAttribute('loop');
        v5.addEventListener('ended', () => {
            indexV5 = (indexV5 + 1) % playlistVideo5.length;
            v5.src = playlistVideo5[indexV5];
            v5.play();
        });
    };

            // Vídeo 6
    const v6 = document.getElementById('video6')
    const playlistVideo6 = [
        'ASSETS/MENU/videos/sobremesa1.mp4',
        'ASSETS/MENU/videos/sobremesa2.mp4',
        'ASSETS/MENU/videos/sobremesa3.mp4'
    ];
    let indexV6 = 0;
    if (v6) {
        v6.removeAttribute('loop');
        v6.addEventListener('ended', () => {
            indexV5 = (indexV6 + 1) % playlistVideo6.length;
            v6.src = playlistVideo6[indexV6];
            v6.play();
        });
    };

            // Vídeo 7
    const v7 = document.getElementById('video7')
    const playlistVideo7 = [
        'ASSETS/MENU/videos/drink1.mp4',
        'ASSETS/MENU/videos/drink2.mp4',
        'ASSETS/MENU/videos/drink3.mp4'
    ];
    let indexV7 = 0;
    if (v7) {
        v7.removeAttribute('loop');
        v7.addEventListener('ended', () => {
            indexV7 = (indexV7 + 1) % playlistVideo7.length;
            v7.src = playlistVideo7[indexV7];
            v7.play();
        });
    };

                // Vídeo 8
    const v8 = document.getElementById('video8')
    const playlistVideo8 = [
        'ASSETS/MENU/videos/hiGuys1.mp4',
        'ASSETS/MENU/videos/reserva1.mp4',
        'ASSETS/MENU/videos/hiGuys2.mp4',
        'ASSETS/MENU/videos/hiGuys3.mp4'
    ];
    let indexV8 = 0;
    if (v8) {
        v8.removeAttribute('loop');
        v8.addEventListener('ended', () => {
            indexV8 = (indexV8 + 1) % playlistVideo8.length;
            v8.src = playlistVideo8[indexV8];
            v8.play();
        });
    };
});