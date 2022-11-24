function goHome(){
    window.location.href = 'Index.html';
}

function goSignUp(){
    window.location.href = 'cadastroEmpresa.html'
}

function goLogin(){
    window.location.href = 'login.html'
}

function openMenu(){
    if(menu.style.display == 'flex'){
        menu.style.display = 'none';
    }
    else{
        menu.style.display = 'flex';
    }
}

function goDashboardPainel(){
    window.location.href = 'dashboard-principal.html'
}

function goMaquinaPainel(stats){
    sessionStorage.setItem('statsDetailMachine', JSON.stringify(stats));
    window.location.href = 'Maquinas.html'
}

function goFuncionarioPainel(){
    window.location.href = 'Tela-funcionarios.html'
}

function goPerguntaPainel(){
    window.location.href = 'pergunta.html'
}

function goSuportePainel(){
    window.location.href = 'suporte.html'
}

function deslogar(){
    sessionStorage.clear();
    window.location.href = 'Index.html'
}

function validarSessao2() {

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var cnpj = sessionStorage.CNPJ_USUARIO;

    if (email != null && nome != null && cnpj != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        id_nome.innerHTML = `${nome}`;
    } else {
        window.location = "Index.html";
    }
}

function validarSessao() {

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var cnpj = sessionStorage.CNPJ_USUARIO;

    if (email != null && nome != null && cnpj != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        id_nome.innerHTML = `${nome}`;
    } else {
        window.location = "Index.html";
    }
}