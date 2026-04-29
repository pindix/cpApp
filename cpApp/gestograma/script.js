function calcularObstetricia() {
    const dumInput = document.getElementById("dum_data").value;
    const ciclo = parseInt(document.getElementById("ciclo_dias").value) || 28;
    const res = document.getElementById("resultado");

    if (!dumInput) {
        res.innerHTML = "⚠️ Por favor, selecione a data da DUM.";
        res.style.background = "#f44336";
        res.style.display = "block";
        return;
    }

    const dum = new Date(dumInput);
    const hoje = new Date();

    // 1. Cálculo da DPP (Naegele)
    // Ajuste baseado no ciclo (padrão é 28 dias)
    const ajusteCiclo = ciclo - 28;
    let dpp = new Date(dum);
    dpp.setDate(dpp.getDate() + 280 + ajusteCiclo);

    // 2. Cálculo da Idade Gestacional (IG)
    const diferencaTempo = hoje - dum;
    const totalDias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
    const semanas = Math.floor(totalDias / 7);
    const diasRestantes = totalDias % 7;

    // 3. Formatação de Datas
    const opcoes = { day: '2-digit', month: 'long', year: 'numeric' };
    const dppFormatada = dpp.toLocaleDateString('pt-PT', opcoes);

    let html = `<b>Resultado Gestacional:</b><br><br>`;
    
    if (totalDias < 0) {
        html = "⚠️ A data da DUM não pode ser no futuro.";
        res.style.background = "#f44336";
    } else {
        html += `📅 <b>DPP:</b> ${dppFormatada}<br>`;
        html += `👶 <b>Idade Gestacional:</b> <br><span style="font-size: 1.4rem;">${semanas} Semanas e ${diasRestantes} Dias</span><br>`;
        
        // Mensagem de contexto
        if (semanas >= 37) html += `<br>✅ <b>Feto a Termo</b>`;
        else if (semanas < 13) html += `<br>🤰 <b>1º Trimestre</b>`;
        else if (semanas < 27) html += `<br>🤰 <b>2º Trimestre</b>`;
        else html += `<br>🤰 <b>3º Trimestre</b>`;

        res.style.background = "var(--primary)";
    }

    res.innerHTML = html;
    res.style.display = "block";
    
    // Efeito de vibração
    res.classList.remove("vibrar");
    void res.offsetWidth;
    res.classList.add("vibrar");
}

function limparObstetricia() {
    document.getElementById("dum_data").value = "";
    document.getElementById("ciclo_dias").value = "28";
    document.getElementById("resultado").style.display = "none";
}

// Lógica de Tema do seu modelo original
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

themeBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'ri-moon-line';
        localStorage.setItem('tema', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'ri-sun-line';
        localStorage.setItem('tema', 'dark');
    }
});



    // ========================================================================
    // MENU LATERAL
    // ========================================================================
    const btnHamburger = document.getElementById('btnHamburger');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLateral = document.getElementById('menuLateral');
    const menuItems = document.querySelectorAll('.menu-item');

    // Verifica se os elementos existem antes de adicionar eventos
    if (btnHamburger && menuOverlay && menuLateral) {

        // Função para abrir o menu
        function abrirMenu() {
            btnHamburger.classList.add('ativo');
            menuOverlay.classList.add('ativo');
            menuLateral.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }

        // Função para fechar o menu
        function fecharMenu() {
            btnHamburger.classList.remove('ativo');
            menuOverlay.classList.remove('ativo');
            menuLateral.classList.remove('ativo');
            document.body.style.overflow = '';
        }

        // Clique no botão hamburger
        btnHamburger.addEventListener('click', () => {
            if (menuLateral.classList.contains('ativo')) {
                fecharMenu();
            } else {
                abrirMenu();
            }
        });

        // Clique no overlay
        menuOverlay.addEventListener('click', fecharMenu);

        // Clique nos itens do menu
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                setTimeout(fecharMenu, 200);
                const page = item.getAttribute('data-page');
                console.log(`Navegar para: ${page}`);
            });
        });

        // Fechar com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuLateral.classList.contains('ativo')) {
                fecharMenu();
            }
        });

        // Swipe para fechar
        let touchStartXMenu = 0;
        menuLateral.addEventListener('touchstart', (e) => {
            touchStartXMenu = e.touches[0].clientX;
        }, { passive: true });

        menuLateral.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartXMenu - touchEndX;
            if (diff < -50) {
                fecharMenu();
            }
        });
    }

    // ========================================================================
    // MODAL DE MODO TESTE
    // ========================================================================
    const testModal = document.getElementById('testModeModal');
    const acceptBtn = document.getElementById('btnAcceptTest');

    if (testModal && acceptBtn) {
        if (!sessionStorage.getItem('testModeAccepted')) {
            testModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        acceptBtn.addEventListener('click', () => {
            sessionStorage.setItem('testModeAccepted', 'true');
            testModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    } 




window.addEventListener('load', () => {
    if (localStorage.getItem('tema') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'ri-sun-line';
    }
});