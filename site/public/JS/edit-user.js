function getEditUser() {
    var idFuncionario = sessionStorage.getItem('editFuncionarioId');

    if (idFuncionario != undefined) {
        buttonName.innerHTML = 'Editar';
        title.innerHTML = 'Editar';
        subtitle.innerHTML = 'Corrija os dados do funcionário';
        fetch(`/usuarios/getFuncById/${idFuncionario}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        throw "Nenhum resultado encontrado!!";
                    }
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        for (let i = 0; i < resposta.length; i++) {
                            var res = resposta[i];

                            inp_nome.value = res.nomeUsuario;
                            inp_sobrenome.value = res.sobrenomeUsuario;
                            inp_email.value = res.emailUsuario;
                            combo_box.value = res.cargoUsuario;
                            inp_senha.value = res.senhaUsuario;
                            inp_confirmar_senha.value = res.senhaUsuario;

                            form.classList.remove('card-hidden');
                            loading.style.display = 'none';
                        }
                    });
                } else {
                    throw "Houve um erro na API!";
                }
            })
            .catch(function (resposta) {
                console.error(resposta);
            });
    } else {
        form.classList.remove('card-hidden');
        loading.style.display = 'none';
    }
}