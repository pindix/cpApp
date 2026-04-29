function analisarSangue() {
    const paciente = document.getElementById("tipo_paciente").value;
    const doador = document.getElementById("tipo_doador").value;
    const pai = document.getElementById("sangue_pai").value;
    const mae = document.getElementById("sangue_mae").value;
    const res = document.getElementById("resultado");

    if (!paciente && !doador && !pai && !mae) {
        res.innerHTML = "⚠️ Selecione os dados para análise.";
        res.style.background = "#f44336"; res.style.display = "block";
        return;
    }

    let html = "";
    let backgroundFinal = "var(--primary)";

    // 1. COMPATIBILIDADE (Centralizada)
    if (paciente && doador) {
        const tabela = {
            "A+": ["A+", "A-", "O+", "O-"], "A-": ["A-", "O-"],
            "B+": ["B+", "B-", "O+", "O-"], "B-": ["B-", "O-"],
            "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            "AB-": ["A-", "B-", "AB-", "O-"], "O+": ["O+", "O-"], "O-": ["O-"]
        };
        
        const eCompativel = tabela[paciente].includes(doador);
        
        if (!eCompativel) backgroundFinal = "#f44336";

        html += `
            <i class="${eCompativel ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill'} res-icon"></i>
            <span class="res-titulo">${eCompativel ? 'COMPATÍVEL' : 'INCOMPATÍVEL'}</span>
            <span class="res-sub">Doador <b>${doador}</b> → Paciente <b>${paciente}</b></span>
        `;
    }

    // Divisor se houver ambas as análises
    if ((paciente && doador) && (pai && mae)) html += `<hr>`;

    // 2. HERANÇA (Alinhada à esquerda para leitura de lista)
    if (pai && mae) {
        const genetica = {
            "AA": ["A", "O"], "AB": ["A", "B", "AB", "O"], "AAB": ["A", "B", "AB"], "AO": ["A", "O"],
            "BB": ["B", "O"], "BAB": ["A", "B", "AB"], "BO": ["B", "O"],
            "ABAB": ["A", "B", "AB"], "ABO": ["A", "B"], "OO": ["O"]
        };
        
        let combinacao = [pai, mae].sort().join("");
        let possiveis = genetica[combinacao] || ["Análise especial necessária"];

        html += `
            <div class="heranca-box">
                <b>Herança Biológica:</b>
                <span class="res-sub">Possíveis grupos dos filhos: ${possiveis.map(s => `${s}`).join(", ")}</span>
            </div>
        `;
    }

    res.innerHTML = html;
    res.style.background = backgroundFinal;
    res.style.display = "block";
    
    // Animação
    res.classList.remove("vibrar");
    void res.offsetWidth;
    res.classList.add("vibrar");
}

function limparSangue() {
    ["tipo_paciente", "tipo_doador", "sangue_pai", "sangue_mae"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("resultado").style.display = "none";
}

// Lógica de Tema
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