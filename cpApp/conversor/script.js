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



const indicado_valor = document.getElementById("indicado");
const ml_valor = document.getElementById("ml");
const disponivel_valor = document.getElementById("disponivel");
const resultado = document.getElementById("resultado");



function validarCampos() {
    // Lista dos teus inputs (podes adicionar ou remover conforme a página)
    const campos = [indicado_valor, ml_valor, disponivel_valor]; 
    let todosPreenchidos = true;

    campos.forEach(campo => {
        if (campo.value.trim() === "") {
            campo.style.border = "solid 1px red";
            campo.style.borderRight = "none";
            campo.style.borderLeft = "none";
            todosPreenchidos = false;
            resultado.style.textAlign = "center"; 
            resultado.style.background = "red"; 
        } else {
            // Limpa a borda vermelha se o utilizador já preencheu
            campo.style.border = ""; 
        }
    });

    return todosPreenchidos;
}
function retirar_bordas(){
    const camposObrigatorios = [indicado_valor, ml_valor, disponivel_valor];
    camposObrigatorios.forEach(campo => {
        campo.addEventListener("input", function(){
            if (this.value.trim() !== ""){
                this.style.border = "";
            }
        })
    });
};
function calcular(){

    const p = document.getElementById("resultado"); // O teu elemento de resultado
    resultado.classList.remove("vibrar");
    // 2. Forçar um "re-flow" (truque para o browser perceber que removemos a classe)
    void p.offsetWidth; 
    resultado.classList.add("vibrar");

    if(!validarCampos()){
        resultado.innerHTML = "Peencha os campos obrigatórios!";
        return;
    }
    // Valores convertidos em mg
    unidade_do_disponivel = parseFloat(document.getElementById("unidade_do_disponivel").value);
    unidade_do_indicado = parseFloat(document.getElementById("unidade_do_indicado").value);

    indicado = parseFloat(indicado_valor.value) * unidade_do_indicado;
    disponivel = parseFloat(disponivel_valor.value) * unidade_do_disponivel;
    ml = ml_valor.value;

    resultado.innerHTML = `No medicamento diponível pode usar: <br> <h5 class="centro"> ${ml*(indicado/1)*(1/disponivel)} ml </h5>`;
    resultado.style.background = "var(--primary)";
    resultado.style.textAlign = "left";
}


indicado_valor.addEventListener("input", retirar_bordas);
ml_valor.addEventListener("input", retirar_bordas);
disponivel_valor.addEventListener("input", retirar_bordas);


function limpar(){
    const campos = [indicado_valor, ml_valor, disponivel_valor];
    campos.forEach(campo => {
        campo.style.border = ""; // Remove a borda vermelha na hora
    });
    
    indicado_valor.value = "";
    ml_valor.value = "";
    disponivel_valor.value = "";

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




