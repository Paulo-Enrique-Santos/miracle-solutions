function CadastrarADM() {
  var nomeVar = nome_id.value;
  var sobrenomeVar = sobrenome_id.value;
  var cargoVar = "Admin";
  var empresaVar = sessionStorage.ID_EMPRESA;
  var supervisorVar = null;
  var emailVar = email_id.value;
  var senhaVar = senha_id.value;

  fetch("/usuarios/cadastrarUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      sobrenomeServer: sobrenomeVar,
      cargoServer: cargoVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      supervisorServer: supervisorVar,
      empresaServer: empresaVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        document.getElementById('step-3-ball-time-line').classList.add('complete');
        document.getElementById('step-3-ball-time-line').classList.remove('here');
        erro3.style.color = 'green';
        erro3.innerHTML = 'Cadastro realizado com sucesso';
        setTimeout(function () {
          erro3.innerHTML = 'Redirecionando para tela de login';
        }, 2000);
        setTimeout(function () {
          window.location.href = 'login.html';
        }, 4000);
      } else {
        erro3.innerHTML = 'Email já cadastrado!';
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}
function CadastrarUser() {
  // PARAMETRIZANDO VARIÁVEIS
  var nomeVar = inp_nome.value;
  var sobrenomeVar = inp_sobrenome.value;
  var cargoVar = combo_box.value;
  var supervisorVar = sessionStorage.ID_USUARIO;
  var empresaVar = sessionStorage.FKEMPRESA_USUARIO;
  var emailVar = inp_email.value;
  var senhaVar = inp_senha.value;
  var confirmarSenhaVar = inp_confirmar_senha.value;

  inp_nome.style.border = "";
  inp_sobrenome.style.border = "";
  combo_box.style.border = "";
  inp_email.style.border = "";
  inp_senha.style.border = "";
  inp_confirmar_senha.style.border = "";
  erro3.innerHTML = "";

  if (nomeVar.length >= 90 || nomeVar.length < 2) {
    inp_nome.style.border = "2px solid red";
    erro3.innerHTML = 'Nome inválido';
  }

  if (sobrenomeVar.length >= 90 || sobrenomeVar.length < 2) {
    inp_sobrenome.style.border = "2px solid red";
    erro3.innerHTML = 'Sobrenome inválido';
  }

  if (cargoVar == "nulo") {
    combo_box.style.border = "2px solid red";
    erro3.innerHTML = 'Selecione o cargo';
  }

  if (
    emailVar == "" ||
    emailVar.indexOf("@") <= 0 ||
    emailVar.indexOf(".com") < emailVar.indexOf("@") ||
    emailVar.length > 90
  ) {
    inp_email.style.border = "2px solid red";
    erro3.innerHTML = 'Email inválido';
  }

  if (senhaVar != confirmarSenhaVar) {
    inp_senha.style.border = "2px solid red";
    inp_confirmar_senha.style.border = "2px solid red";
    erro3.innerHTML = 'As senhas devem ser iguais';
  }

  if (
    inp_nome.style.border != "2px solid red" &&
    inp_sobrenome.style.border != "2px solid red" &&
    combo_box.style.border != "2px solid red" &&
    inp_email.style.border != "2px solid red" &&
    inp_senha.style.border != "2px solid red" &&
    inp_confirmar_senha.style.border != "2px solid red"
  ) {

    var idFuncionario = sessionStorage.getItem('editFuncionarioId');

    console.log(idFuncionario);
    if (idFuncionario == undefined) {
      erro3.style.color = 'blue';
      erro3.innerHTML = 'Carregando...';
      fetch("/usuarios/cadastrarUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nomeVar,
          sobrenomeServer: sobrenomeVar,
          cargoServer: cargoVar,
          emailServer: emailVar,
          senhaServer: senhaVar,
          supervisorServer: supervisorVar,
          empresaServer: empresaVar,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
  
          if (resposta.ok) {
            erro3.style.color = 'green';
            erro3.innerHTML = 'Cadastro realizado com sucesso';
            setTimeout(function () {
              erro3.innerHTML = 'Carregando...';
            }, 2000);
            setTimeout(function () {
              window.location.href = "Tela-funcionarios.html";
            }, 4000);
          } else {
            erro3.innerHTML = "Email atual já está cadastrado!";
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
    } else {
      erro3.style.color = 'blue';
      erro3.innerHTML = 'Carregando...';
      fetch("/usuarios/editarUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idFuncionarioServer: idFuncionario,
          nomeServer: nomeVar,
          sobrenomeServer: sobrenomeVar,
          cargoServer: cargoVar,
          emailServer: emailVar,
          senhaServer: senhaVar,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
  
          if (resposta.ok) {
            erro3.style.color = 'green';
            erro3.innerHTML = 'Funcionário Editado com Sucesso';
            sessionStorage.removeItem('editFuncionarioId');
            setTimeout(function () {
              erro3.innerHTML = 'Carregando...';
            }, 2000);
            setTimeout(function () {
              window.location.href = "Tela-funcionarios.html";
            }, 4000);
          } else {
            erro3.innerHTML = "Problemas para editar funcionário!";
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
    }


    return false;
  }
}

function backStep() {
  window.location.href = 'Tela-funcionarios.html';
  sessionStorage.removeItem('editFuncionarioId');
}