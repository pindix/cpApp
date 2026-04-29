
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





const campo_peso = document.getElementById("peso");
const campo_dosagem = document.getElementById("dosagem");
const campo_concentracao = document.getElementById("concentracao");
const campo_intervalo = document.getElementById("intervalo");

function validarCampos() {
    // Lista dos teus inputs (podes adicionar ou remover conforme a página)
    const campos = [campo_dosagem, campo_concentracao]; 
    let todosPreenchidos = true;

    campos.forEach(campo => {
        if (campo.value.trim() === "") {
            campo.style.border = "solid 1px red";
            campo.style.borderRight = "none";
            campo.style.borderLeft = "none";
            todosPreenchidos = false;
            resultado.style.background = "red"; 
        } else {
            // Limpa a borda vermelha se o utilizador já preencheu
            campo.style.border = ""; 
        }
    });

    return todosPreenchidos;
}
function retirar_bordas(){
    const camposObrigatorios = [campo_dosagem, campo_concentracao,];
    camposObrigatorios.forEach(campo => {
        campo.addEventListener("input", function(){
            if (this.value.trim() !== ""){
                this.style.border = "";
            }
        })
    });
};

function calcular() {
    resultado.classList.remove("vibrar");
    // 2. Forçar um "re-flow" (truque para o browser perceber que removemos a classe)
    void resultado.offsetWidth; 
    resultado.classList.add("vibrar");

    if(!validarCampos()){
        resultado.innerHTML = "Preencha os campos obrigatórios!";
        return;
    }

    unidade_de_dosagem = parseFloat(document.getElementById("unidade_de_dosagem").value);
    unidade_de_concentracao = parseFloat(document.getElementById("unidade_de_concentracao").value);

    // Todos os valores convertidos em ml e mg
    vpeso = parseFloat(peso.value) || 1;
    vdosagem = parseFloat(dosagem.value) * unidade_de_dosagem;
    vconcentracao = parseFloat(concentracao.value) * unidade_de_concentracao;
    
    // CORREÇÃO: Pegamos o valor bruto para testar se está vazio antes do parseFloat
    vintervalo_raw = intervalo.value.trim(); 
    vintervalo = 24/parseFloat(vintervalo_raw);

    // Cálculo base (sem a divisão por 2, para manter a dose exata por administração)
    let dose_calculada = (vpeso * vdosagem) * (1 / vconcentracao);

    // Verificação se o texto do intervalo não está vazio
    if(vintervalo_raw !== ""){
        // Exibe o resultado com o intervalo. 
        // Usei .toFixed(2) para o número ficar bonito (ex: 1.50 ml)
        resultado.innerHTML = `${dose_calculada.toFixed(1)/vintervalo} ml <br> <span style = "font-size: 12px;">de ${vintervalo_raw} em ${vintervalo_raw}h </span>`;
        resultado.style.background = "var(--primary)";
    } else {
        // Se estiver vazio, exibe apenas o volume
        resultado.textContent = `${dose_calculada.toFixed(1)} ml`;
        resultado.style.background = "var(--primary)";
    }
}

campo_peso.addEventListener("input", retirar_bordas);
campo_dosagem.addEventListener("input", retirar_bordas);
campo_concentracao.addEventListener("input", retirar_bordas);


function limpar(){
    
    const campos = [campo_dosagem, campo_concentracao];
    campos.forEach(campo => {
        campo.style.border = ""; // Remove a borda vermelha na hora
    });

    campo_peso.value = "";
    campo_dosagem.value = "";
    campo_concentracao.value = "";
    campo_intervalo.value = "";

    resultado.textContent = "";
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
