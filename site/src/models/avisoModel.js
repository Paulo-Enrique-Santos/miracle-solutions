var database = require("../database/config");

function listar(idUsuario) {
  console.log(
    "ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
    select idComputador, marca, modeloComputador, usuario.nomeUsuario, avg(dado)
    from usuario join usuario as supervisionador 
    on usuario.fkSupervisionador = supervisionador.idUsuario join Computador
    on usuario.IdUsuario = fkUsuario join Componente
    on idComputador = fkComputador join Monitoramento
    on idComponente = fkComponente
    where supervisionador.IdUsuario = ${idUsuario} group by idComputador;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function pesquisarDescricao(texto) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()"
  );
  var instrucao = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function getDataMachine(idMaquina, withComponents) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getDataMachine()"
  );

  
  var instrucao = `
    select nomeUsuario, ipComputador, sistemaOperacional, arquitetura, tipoComponente, velocidade,
      capacidade, unidadeMedida, processadorLogico, nucleo
    from Usuario
    join computador on idUsuario = fkUsuario
      join componente on idComputador = fkComputador
      where idComputador = ${idMaquina};
      `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function getIdMaquinas(idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getIdMaquinas()"
  );
  var instrucao = `

  select idComputador from usuario join usuario as supervisionador 
  on usuario.fkSupervisionador = supervisionador.idUsuario join Computador
  on usuario.IdUsuario = fkUsuario
  where supervisionador.IdUsuario = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function getIdMaquinasByFuncId(idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getIdMaquinasForFuc()"
  );
  var instrucao = `
    select idComputador from usuario
      join computador on idUsuario = fkUsuario 
        where idUsuario = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function getStatsMaquinas(idMaquina) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getStatsMaquinas()"
  );
  var instrucao = `

  select top 6 dado, tipoComponente from computador
	join componente on idComputador = fkComputador 
		join monitoramento on idComponente = fkComponente
			where idComputador = ${idMaquina} order by dataHora desc;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function publicar(titulo, descricao, idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ",
    titulo,
    descricao,
    idUsuario
  );
  var instrucao = `
        INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('${titulo}', '${descricao}', ${idUsuario});
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function editar(novaDescricao, idAviso) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",
    novaDescricao,
    idAviso
  );
  var instrucao = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function deletarMaquina(idMaquina) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():",
    idMaquina
  );
  var instrucao = `
    select * from computador where idComputador = 20;
  `;

  let teste1 = database.executar(instrucao);
  let teste;

  teste1.then((resultado) => {
    console.log(json(resultado));
  });

  console.log(teste);
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function deleteFuncById(idUsuario) {
  var instrucao = `
    delete from usuario where idUsuario = ${idUsuario};
  `;

  return database.executar(instrucao);
}

function getComponenteByMaquina(idMaquina) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():",
    idMaquina
  );
  var instrucao = `
    select * from computador 
      join componente on idComputador = fkComputador 
        where idComputador = ${idMaquina};
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function deleteDadsByIdComponent(idComponent) {
  var instrucao = `
    delete from monitoramento where fkComponente = ${idComponent}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function deleteComponentByIdMachine(idMachine) {
  var instrucao = `
    delete from componente where fkComputador = ${idMachine}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function deleteMachine(idMachine) {
  var instrucao = `
    delete from computador where idComputador = ${idMachine}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarFuncionarios(fkUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()"
  );
  var instrucao = `SELECT 
    idUsuario
FROM
    usuario
WHERE
    fkSupervisionador = ${fkUsuario};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function obterMaquinasComDefeito(idUsuario, mes, dia) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): "
  );
  var instrucao = `
  select idComputador, avg(dado) from monitoramento
  join componente on fkComponente = idComponente
  join computador on fkComputador = idComputador
  join usuario on fkUsuario = usuario.idUsuario
  join usuario as supervisor on usuario.fkSupervisionador = supervisor.idUsuario
  where convert(char(10),dataHora,120) like '____-${mes}-${dia}%'
  and supervisor.idUsuario = ${idUsuario}
  group by idComputador
  having avg(dado) > 50;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirPergunta(fkEmpresa) {
  console.log(
    "Função pesquisa"
  );
  var instrucao = `
    SELECT idPergunta, pergunta FROM pergunta WHERE fkEmpresa = ${fkEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function insertNewQuestion(pergunta, empresa) {
  var instrucao = `
        INSERT INTO pergunta (pergunta, fkEmpresa) VALUES ('${pergunta}', ${empresa});
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function deletePergById(idPergunta) {
  var instrucao = `
    delete from pergunta where idPergunta = ${idPergunta}
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function changeResposta(idPergunta) {
  var instrucao = `
    delete from resposta where idPergunta = ${idPergunta};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function alterQuestion(pergunta, idPergunta) {
  var instrucao = `
        UPDATE pergunta SET pergunta = '${pergunta}' WHERE idPergunta = ${idPergunta};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listar,
  getDataMachine,
  pesquisarDescricao,
  publicar,
  editar,
  deletarMaquina,
  listarFuncionarios,
  obterMaquinasComDefeito,
  getIdMaquinas,
  getStatsMaquinas,
  getComponenteByMaquina,
  getIdMaquinasByFuncId,
  deleteDadsByIdComponent,
  deleteComponentByIdMachine,
  deleteMachine,
  deleteFuncById,
  exibirPergunta,
  insertNewQuestion,
  deletePergById,
  alterQuestion,
  changeResposta
};
