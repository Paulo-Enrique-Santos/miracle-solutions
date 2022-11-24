var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {
  instrucaoSql = `select 
                        temperatura, 
                        umidade, 
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc limit ${limite_linhas}`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimasMedidasCPU(fkUsuario, limite_linhas) {
  instrucaoSql = `
    select top ${limite_linhas} tipoComponente, dado, CONVERT(varchar, dataHora, 108) as dataHora from monitoramento join componente
    on fkComponente = idComponente join computador on fkComputador = idComputador
    where fkComputador = ${fkUsuario} and tipoComponente = 'CPU' order by idRegistro desc;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDisco(fkUsuario, limite_linhas) {
  instrucaoSql = `
    select top ${limite_linhas} tipoComponente, dado, CONVERT(varchar, dataHora, 108) as dataHora from monitoramento join componente
    on fkComponente = idComponente join computador on fkComputador = idComputador
    where fkComputador = ${fkUsuario} and tipoComponente = 'DISCO' order by idRegistro desc;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRAM(fkUsuario, limite_linhas) {
  instrucaoSql = `
    select top ${limite_linhas} tipoComponente, dado, CONVERT(varchar, dataHora, 108) as dataHora from monitoramento join componente
    on fkComponente = idComponente join computador on fkComputador = idComputador
    where fkComputador = ${fkUsuario} and tipoComponente = 'RAM' order by idRegistro desc;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {
  instrucaoSql = `select 
                        temperatura, 
                        umidade, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealCPU(fkUsuario) {
  instrucaoSql = `
  select top 1 tipoComponente, dado, CONVERT(varchar, dataHora, 108) as dataHora from monitoramento join componente
  on fkComponente = idComponente join computador on fkComputador = idComputador
  where fkComputador = ${fkUsuario} and tipoComponente = 'CPU' order by idRegistro desc;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDisco(fkUsuario) {
  instrucaoSql = `
  select top 1 tipoComponente, dado, CONVERT(varchar, dataHora, 108) as dataHora from monitoramento join componente
  on fkComponente = idComponente join computador on fkComputador = idComputador
  where fkComputador = ${fkUsuario} and tipoComponente = 'DISCO' order by idRegistro desc;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRAM(fkUsuario) {
  instrucaoSql = `
  select top 1 tipoComponente, dado, CONVERT(varchar, dataHora, 108) as dataHora from monitoramento join componente
  on fkComponente = idComponente join computador on fkComputador = idComputador
  where fkComputador = ${fkUsuario} and tipoComponente = 'RAM' order by idRegistro desc;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function buscarUltimosApontamentos(fkUsuario) {
  instrucaoSql = `
  SELECT
  usuario.idUsuario,
  usuario.nomeUsuario,
  sobrenomeUsuario,
  cargoUsuario,
  sum(DATEDIFF(hour, horaInicio, horaFim))AS realizadas
FROM
  usuario
    LEFT JOIN
  apontamentohoras ON usuario.idUsuario = apontamentohoras.fkUsuario
  WHERE fkSupervisionador = ${fkUsuario} and FORMAT (dataHora, 'MM') = FORMAT (getdate(), 'MM')
 GROUP BY   
  usuario.idUsuario,
  usuario.nomeUsuario,
  sobrenomeUsuario,
  cargoUsuario;
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimosOcorrencias(fkUsuario, periodo) {
  instrucaoSql = `
  SELECT 
  idComputador, tipoComponente,dataHora as dia, dado
FROM usuario join 
  computador on fkUsuario = idUsuario
      JOIN
  componente ON fkComputador = idComputador
      JOIN
  monitoramento ON idComponente = fkComponente
WHERE format(dataHora,'dd','MM') BETWEEN format(getdate(),'dd','MM') - ${periodo} AND  format(getdate(),'dd','MM')
 AND fkSupervisionador = ${fkUsuario};
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}



function listarMedida(fkUsuario, idUsuario) {
  instrucaoSql = ``;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarUltimosOcorrencias,
  buscarUltimosApontamentos,
  buscarUltimasMedidas,
  buscarUltimasMedidasCPU,
  buscarMedidasEmTempoReal,
  buscarMedidasEmTempoRealCPU,
  buscarMedidasEmTempoRealDisco,
  buscarUltimasMedidasDisco,
  buscarUltimasMedidasRAM,
  buscarMedidasEmTempoRealRAM,
};
