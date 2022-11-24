var database = require("../database/config");
var sendEmail = require("../send-emails/config");

function listar() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
        SELECT idUsuario FROM usuario order by idUsuario desc limit 1;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );
  var instrucao = `
        SELECT * FROM usuario join Empresa on fkEmpresa = idEmpresa
        WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}'
        AND (cargoUsuario = 'Suporte Técnico' OR cargoUsuario = 'Admin');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function obterDadosMaquina(fkUsuario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );
  var instrucao = `
    select marca, modeloComputador, sistemaOperacional, arquitetura, fkUsuario 
    from computador where fkUsuario = ${fkUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarFuncionarios(fkUsuario, mes) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );
  var instrucao = `
  select usuario.idUsuario, usuario.emailUsuario, usuario.nomeUsuario as nome, usuario.cargoUsuario as cargo
  from usuario join usuario as supervisionador on usuario.fkSupervisionador = supervisionador.idUsuario
  where supervisionador.idUsuario = ${fkUsuario} group by  usuario.idUsuario, usuario.emailUsuario, usuario.nomeUsuario, usuario.cargoUsuario
  order by usuario.idUsuario;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function getFuncById(idFuncionario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );
  var instrucao = `
    select * from usuario where idUsuario = ${idFuncionario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function atualizarPesquisa(idUsuario, mes) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );
  var instrucao = `
    select * from pesquisa join usuario on fkUsuario = idUsuario where fkSupervisionador = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function obterDadosComponente(fkUsuario) {
  instrucaoSql = `  select idComputador, tipoComponente, velocidade, capacidade, unidadeMedida from componente join computador on fkComputador = idComputador where tipoComponente = 'CPU' and fkUsuario = ${fkUsuario} union
    select idComputador, tipoComponente, velocidade, capacidade, unidadeMedida from componente join computador on fkComputador = idComputador where tipoComponente = 'RAM' and fkUsuario = ${fkUsuario} union
    select idComputador, tipoComponente, velocidade, capacidade, unidadeMedida from componente join computador on fkComputador = idComputador where tipoComponente = 'Disco' and fkUsuario = ${fkUsuario};`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarUser(
  nome,
  sobrenome,
  cargo,
  email,
  senha,
  supervisor,
  empresa
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    sobrenome,
    cargo,
    email,
    senha,
    supervisor,
    empresa
  );

  var instrucao = `
          INSERT INTO usuario (nomeUsuario, sobrenomeUsuario, cargoUsuario, emailUsuario, senhaUsuario, fkSupervisionador, fkEmpresa) VALUES (
       '${nome}', '${sobrenome}', '${cargo}', '${email}', '${senha}', ${supervisor},${empresa});
      `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function editarUser(
  idFuncionario,
  nome,
  sobrenome,
  cargo,
  email,
  senha,
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    idFuncionario,
    nome,
    sobrenome,
    cargo,
    email,
    senha
  );

  var instrucao = `
    update usuario 
      set nomeUsuario = '${nome}', 
      sobrenomeUsuario = '${sobrenome}',
      cargoUsuario = '${cargo}',
      emailUsuario = '${email}',
      senhaUsuario = ${senha}
    where idUsuario = ${idFuncionario};
      `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function updatePassword(password, idUser) {
  console.log('Senha Alterada com sucesso!');

  var instrucao = `
    update usuario set senhaUsuario = '${password}' where idUsuario = ${idUser};
      `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


function cadastrarEmpresa(cnpj, nomeEmpresa, telefone, numero, cep) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    cnpj,
    nomeEmpresa,
    telefone,
    numero,
    cep
  );

  var instrucao = `
            INSERT INTO Empresa (CNPJ, nomeEmpresa, telefoneFixoEmpresa, numero, CEP) VALUES (
            '${cnpj}','${nomeEmpresa}','${telefone}',${numero},${cep});
        `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


function buscarEmpresa() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
    SELECT top 1 idEmpresa FROM Empresa order by idEmpresa desc;
      `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function sendEmailForgotPassword(email, code) {
  console.log('Entrei na forgot password');
  return sendEmail.teste(email, code);
}

function getValidEmail(email) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );
  var instrucao = `
    select * from usuario where emailUsuario = '${email}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  entrar,
  buscarEmpresa,
  cadastrarUser,
  cadastrarEmpresa,
  listar,
  obterDadosMaquina,
  obterDadosComponente,
  listarFuncionarios,
  atualizarPesquisa,
  getFuncById,
  editarUser,
  sendEmailForgotPassword,
  getValidEmail,
  updatePassword
};
