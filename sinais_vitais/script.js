// --- LÓGICA DO TEMA ---
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

// --- BASE DE DADOS CLÍNICA ---
const DB_VITALS = {
    "Angola": {
        "recem_nascido": { fc: [120, 160], fr: [40, 60], sis: [60, 90], dia: [20, 60], temp: [36.5, 37.5], sato2: [95, 100] },
        "adulto": { fc: [60, 100], fr: [12, 20], sis: [90, 130], dia: [60, 85], temp: [36.0, 37.2], sato2: [95, 100] }
    },
    "Portugal": {
        "adulto": { fc: [60, 100], fr: [12, 20], sis: [90, 129], dia: [60, 84], temp: [36.0, 37.2], sato2: [95, 100] }
    }
};

function interpretar() {
    const res = document.getElementById("resultado");
    const sis = document.getElementById("sis");
    const dia = document.getElementById("dia");
    const fc = document.getElementById("fc");
    const fr = document.getElementById("fr");
    const temp = document.getElementById("temp");
    const sato2 = document.getElementById("sato2");
    const caixaTa = document.getElementById("caixa_ta");

    // Animação e Limpeza
    res.classList.remove("vibrar");
    void res.offsetWidth;
    res.classList.add("vibrar");
    [sis, dia, fc, fr, temp, sato2, caixaTa].forEach(el => el.classList.remove("campo-incompleto"));

    // Validação Geral
    if (!sis.value && !dia.value && !fc.value && !fr.value && !temp.value && !sato2.value) {
        res.innerHTML = "Insira pelo menos um sinal vital!";
        res.style.background = "#f44336"; res.style.display = "block";
        return;
    }

    // Validação TA
    if ((sis.value && !dia.value) || (!sis.value && dia.value)) {
        caixaTa.classList.add("campo-incompleto");
        res.innerHTML = "Tensão Arterial incompleta!";
        res.style.background = "#f44336"; res.style.display = "block";
        return;
    }

    const ref = DB_VITALS[document.getElementById("pais_referencia").value][document.getElementById("faixa_etaria").value] || DB_VITALS["Angola"]["adulto"];
    let html = `<b>Resultados:</b><br>`;

    function analisar(valor, min, max, label, unidade) {
        if (!valor) return "";
        let v = parseFloat(valor);
        let status = "Normal", cor = "#fff";
        if (v < min) { status = "Baixo/Alterado"; cor = "lightblue"; }
        if (v > max) { status = "Alto/Alterado"; cor = "yellow"; }
        return `<div style="margin-top:8px">• ${label}: <b>${v}${unidade}</b> <span style="color:${cor}">(${status})</span></div>`;
    }

    html += analisar(fc.value, ref.fc[0], ref.fc[1], "FC", " bpm");
    html += analisar(fr.value, ref.fr[0], ref.fr[1], "FR", " ipm");
    html += analisar(temp.value, ref.temp[0], ref.temp[1], "Temp.", "°C");
    html += analisar(sato2.value, ref.sato2[0], ref.sato2[1], "Sat. O2", "%");
    if(sis.value) html += analisar(sis.value, ref.sis[0], ref.sis[1], "Sistólica", " mmHg");
    if(dia.value) html += analisar(dia.value, ref.dia[0], ref.dia[1], "Diastólica", " mmHg");

    res.innerHTML = html;
    res.style.background = "var(--primary)";
    res.style.display = "block";
}

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


function limparSinais() {
    ["sis", "dia", "fc", "fr", "temp", "sato2"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("resultado").style.display = "none";
    document.getElementById("caixa_ta").classList.remove("campo-incompleto");
}

window.addEventListener('load', () => {
    if (localStorage.getItem('tema') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'ri-sun-line';
    }
});