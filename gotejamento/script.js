// Lógica do Tema Escuro com Memória
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

themeBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'ri-moon-line';
        localStorage.setItem('tema', 'light'); // Guarda que é light
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'ri-sun-line';
        localStorage.setItem('tema', 'dark');  // Guarda que é dark
    }
});





const valor_volume = document.getElementById("volume");
const valor_tempo = document.getElementById("tempo");
const valor_macrogotas = document.getElementById("macrogotas");
const valor_microgotas = document.getElementById("microgotas");
const resultado = document.getElementById("resultado");

unidadeVolume = document.getElementById("unidade_de_volume");
unidadeTempo = document.getElementById("unidade_de_tempo");

function calcular() {

    resultado.classList.remove("vibrar");
    void resultado.offsetWidth; 
    // 2. Forçar um "re-flow" (truque para o browser perceber que removemos a classe)    
    resultado.classList.add("vibrar");

    // 1. Captura de valores brutos
    const v = parseFloat(valor_volume.value) * unidadeVolume.value;
    const t = parseFloat(valor_tempo.value) / unidadeTempo.value;
    const macIn = parseFloat(valor_macrogotas.value);
    const micIn = parseFloat(valor_microgotas.value);

    // 2. Identificação de Grupos Preenchidos
    const temCampo1 = (!isNaN(v) && !isNaN(t)); // Volume E Tempo
    const temVolume = !isNaN(v);
    const temTempo = !isNaN(t);
    const temMac = !isNaN(macIn);
    const temMic = !isNaN(micIn);
    const temCampo2 = (temMac || temMic); // Macro OU Micro

    // --- REGRAS DE BLOQUEIO ---

    // Regra: Se só um campo no total estiver preenchido
    let totalPreenchidos = [temVolume, temTempo, temMac, temMic].filter(Boolean).length;
    if (totalPreenchidos < 2) {
        resultado.innerHTML = "Preencha pelo menos 2 campos.";
        resultado.style.background = "red";
        return;
    }

    // Regra: Se só o campo 2 (gotas) estiver preenchido
    if (temCampo2 && !temVolume && !temTempo) {
        resultado.innerHTML = "Insira também Volume ou Tempo.";
        resultado.style.background = "red";
        return;
    }

    // --- LÓGICA DE HARMONIA (MAC vs MIC) ---
    // Arredondamento único no início para comparação
    let mac = temMac ? Math.round(macIn) : NaN;
    let mic = temMic ? Math.round(micIn) : NaN;

    if (temMac && temMic) {
        if (mic !== Math.round(mac * 3)) {
            resultado.innerHTML = "Micro e Macrogotas não coincidem! <br> <br> Elimine-as.";
            resultado.style.background = "red";
            return;
        }
    }

    // --- CÁLCULOS E VALIDAÇÃO COM C1 ---
    let gotasBase = !isNaN(mac) ? mac : (mic / 3);

    if (temCampo1 && temCampo2) {
        // Se preencheu tudo, verificamos a harmonia com V e T
        let gEsperada = Math.round(v / (t * 3));
        let gInserida = Math.round(gotasBase);

        if (gInserida !== gEsperada) {
            resultado.innerHTML = "As gotas não correspondem ao Volume e Tempo. <br> <br>  Elimine-as.";
            resultado.style.background = "red";
            return;
        }
    } else if (temCampo1) {
        // Se falta o campo 2, calculamos
        gotasBase = v / (t * 3);
    } else if (temVolume && temCampo2) {
        // Se falta o Tempo
        t_calc = v / (gotasBase * 3);
        tempo.value = t_calc.toFixed(1);
    } else if (temTempo && temCampo2) {
        // Se falta o Volume
        v_calc = gotasBase * t * 3;
        volume.value = v_calc.toFixed(1);
    }

    // --- EXIBIÇÃO FINAL ---
    const macFinal = Math.round(gotasBase);
    const micFinal = macFinal * 3;
    // Arredondamento único para os campos de gotas
    macrogotas.value = macFinal;
    microgotas.value = micFinal;
    
    ml = valor_volume.value;
    horas = valor_tempo.value;
    vExibido = unidadeVolume.options[unidadeVolume.selectedIndex].text;
    tExibido = unidadeTempo.options[unidadeTempo.selectedIndex].text;
    


    resultado.innerHTML = `RESUMO: <br> <br> 
    <h5 class="texto_a_esquerda">
    Volume: ${ml} ${vExibido} 
    <br> Tempo: ${horas} ${tExibido} <br> <br> 
     Macrogotas: ${macFinal} gotas/min <br> MIcrogotas: ${micFinal} gotas/min </h5>`;
    resultado.style.background = "var(--primary)";
}



function limpar(){
    valor_volume.value = "";
    valor_tempo.value = "";
    valor_macrogotas.value = "";
    valor_microgotas.value = "";
    resultado.innerHTML = "";
    resultado.style.background = "var(--primary)";
    resultado.classList.remove("vibrar");
    void resultado.offsetWidth; 
    // 2. Forçar um "re-flow" (truque para o browser perceber que removemos a classe)    
    resultado.classList.add("vibrar");

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



// Quando a página carrega, recupera as escolhas anonimamente
window.addEventListener('load', () => {
    // Restaurar Tema
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'ri-sun-line';
    }
    
    // Inicia o carregamento do Excel
    carregarDados();
});