function atualizacaoPeriodica(time) {
  proximaAtualizacao =
    //   obterdadosOcorrencias(sessionStorage.idUsuario);
    obterdadosApontamentos(sessionStorage.idUsuario);
  setTimeout(atualizacaoPeriodica, 2000);
}

function obterdadosApontamentos(idUsuario) {
  idUsuario = sessionStorage.ID_USUARIO;
  fetch(`/medidas/ultimosApontamentos/${idUsuario}`)
    .then((resposta) => {
      if (resposta.ok) {
        resposta.json().then((resposta) => {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

          var dados = {
            dado: resposta[0].dado,
          };

          dadoApontamentos.innerHTML = resposta[0].dado;
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`
      );
    });

  setTimeout(() => atualizarGraficoCPU(), 2000);
}

// graficos

let proximaAtualizacao;

function obterDadosGraficoApontamentos(idUsuario) {
  idUsuario = sessionStorage.ID_USUARIO;

  var data = new Date();
  var mes = String(data.getMonth() + 1).padStart(2, "0");
  console.log("obterDadosGraficoApontamentos" + idUsuario);
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  // fetch(`/medidas/ultimosApontamentos/${idUsuario}`)
  fetch(`/usuarios/listarFuncionarios/${idUsuario}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta.reverse();

          plotarGraficoApontamentos(resposta);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoApontamentos(resposta) {
  console.log("iniciando plotagem do gráfico...");
  var dados = {
    datasets: [
      {
        data: [],
        label: ["Hora extra"],
        backgroundColor: [],
        hoverOffset: 4,
      },
      {
        data: [],
        label: ["Horas Realizadas"],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
    labels: [],
  };

  let horasApontadas = 0;
  let nomeUser = resposta[0].nome;
  let ultimoDado = resposta.length;

  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    let Previstas = 0;
    if (i == 0) {
      var publicacao = resposta[i];
    }

    if (publicacao.idUsuario != resposta[i].idUsuario) {
      var horaAtual = document.getElementById("hora" + publicacao.idUsuario);
      console.log(horaAtual);

      dados.labels.push(nomeUser);

      dados.datasets[1].data.push((horasApontadas / 60).toFixed(2));
      dados.datasets[0].data.push(
        (minutoExtra / 60 + (Math.random() * (5 - 1) + 1)).toFixed(2)
      );
      horasApontadas = 0;
      nomeUser = resposta[i].nome;
      publicacao = resposta[i];
    }

    dados.datasets[1].backgroundColor.push("#934c9e");
    dados.datasets[0].backgroundColor.push("#C989D2");

    var horario = resposta[i];

    var horaInicio = Number(horario.horaInicio[11] + horario.horaInicio[12]);
    var minutoInicio = Number(horario.horaInicio[14] + horario.horaInicio[15]);
    var horaFim = Number(horario.horaFim[11] + horario.horaFim[12]);
    var minutoFim = Number(horario.horaFim[14] + horario.horaFim[15]);
    var minutoExtra = horario.minutoExtra;

    var totalHora = Number(horaFim - horaInicio);
    var totalMinuto = 0;

    if (minutoInicio > minutoFim) {
      totalHora--;
      totalMinuto = Number(60 - minutoInicio + minutoFim);
    } else {
      totalMinuto = Number(minutoFim - minutoInicio);
    }

    horasApontadas += Number(totalHora * 60 + totalMinuto);

    console.log(
      horaInicio + " " + minutoInicio + "\n" + horaFim + " " + minutoFim
    );
    console.log(totalHora + " " + totalMinuto);
    console.log(horasApontadas);

    console.log(horaAtual);

    if (i + 1 == resposta.length) {
      console.log(horaAtual);
      dados.labels.push(nomeUser);
      dados.datasets[1].data.push((horasApontadas / 60).toFixed(2));
      dados.datasets[0].data.push(
        (minutoExtra / 60 + (Math.random() * (5 - 1) + 1)).toFixed(2)
      );
      horasApontadas = 0;
    }
  }

  // alerta de dias
  var data = new Date();
  var dia = String(data.getDate()).padStart(2, "0");
  let diasRestantes = 30 - dia;
  spn_dias.innerHTML = diasRestantes;

  console.log(JSON.stringify(dados));

  var ctx = GraficoApontamento.getContext("2d");
  window.grafico = new Chart(ctx, {
    type: "bar",
    data: dados,
    //Configurações do gráfico
    options: {
      responsive: true,
      animation: { duration: 1500 },
      hoverMode: "index",
      stacked: false,
      title: {
        display: true,
      },
      xAxis: {
        type: "time",
      },
    },
  });
}

function detalharMaquina() {
  window.location.href = "Maquinas.html";
}

// alerta se o select retorna 0 para um usuario alertar em pendencias

// function alertaApontamento() {
// if (HorasNaoApontadasVar == 0) {
//   spn_apontamento.innerHTML = `Todos os funcionários já fizeram o apontamento hora.`;
// } else {
//   spn_apontamento.innerHTML = `<span class="corAlerta"> ${HorasNaoApontadasVar} funcionários</span> ainda não declararam
//   horas.`;
// }
// }

// grafico Ocorrencias

function obterDadosGraficoOcorrencias(idUsuario) {
  idUsuario = sessionStorage.ID_USUARIO;
  periodo = slc_Ocorrencias.value;

  console.log("obterDadosGraficoOcorrencias" + idUsuario);
  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/medidas/ultimasOcorrencias/${idUsuario}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      periodoServer: periodo,
    }),
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          resposta.reverse();

          plotarGraficoOcorrencias(resposta);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoOcorrencias(resposta) {
  console.log("iniciando plotagem do gráfico...");
  var dados = {
    labels: ["Normal", "Uso mediano", "Alto uso"],
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: ["rgb(0 158 74)", "rgb(247 146 28)", "rgb(238 63 34)"],
      },
    ],
    hoverOffset: 4,
  };
  var baixaVar = 0;
  var mediaVar = 0;
  var altaVar = 0;
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];

    if (registro.dado <= 30) {
      console.log(`${registro.dado} = uso mediano`);
      baixaVar++;
    } else if (registro.dado <= 70) {
      console.log(`${registro.dado} = uso normal`);
      mediaVar++;
    } else {
      console.log(`${registro.dado} = alto uso`);
      altaVar++;
    }
  }
  console.log("uso normal: " + baixaVar);
  console.log("uso mediano: " + mediaVar);
  console.log("alto uso: " + altaVar);
  dados.datasets[0].data.push(baixaVar);
  dados.datasets[0].data.push(mediaVar);
  dados.datasets[0].data.push(altaVar);

  var ctx = GraficoOcorrencias.getContext("2d");
  window.grafico = new Chart(ctx, {
    type: "doughnut",
    data: dados,
    //Configurações do gráfico
    options: {
      responsive: true,
      animation: { duration: 1500 },
      hoverMode: "index",
      stacked: true,
      title: {
        display: true,
      },
    },
  });
}

function obterMaquinasComDefeito() {
  var idUsuario = sessionStorage.ID_USUARIO;

  fetch(`/avisos/obterMaquinasComDefeito/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          div_avisos.style.backgroundColor = "red";
          div_avisos.style.cursor = "pointer";
          defeito.innerHTML =
            "<a class='defeitoA' href='Maquinas.html'>" +
            resposta.length +
            " máquinas estão com desempenho abaixo do esperado </a>";
        });
      } else {
        defeito.innerHTML = "Todas as máquinas estão com desempenho adequado";
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function setStateMachineLocalData(state) {
  sessionStorage.setItem('stateMachine', state);
}

let endRequest = false;

function getIdMaquinas(idUsuario) {
  let idMaquinas = [];

  fetch(`/avisos/getIdMaquinas/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          throw "Nenhum resultado encontrado!!";
        } else {
          resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            for (let i = 0; i < resposta.length; i++) {
              const idMaquina = resposta[i].idComputador;

              idMaquinas.push(idMaquina);
              getStatsMaquinas(idMaquina);
            }

            sessionStorage.setItem('idMaquinas', JSON.stringify(idMaquinas));
            endRequest = true;
          });
        }
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
      showGraficsLength();
      showAlerts();
    });
}

let stats = {
  warning: [],
  alert: [],
  good: [],
  defect: []
}

let interate = 0;

function getStatsMaquinas(idMaquina) {
  const valueWarning = 70;
  const valueGood = 30;

  fetch(`/avisos/getStatsMaquinas/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          const idMaquinaLocalData = JSON.parse(sessionStorage.getItem('idMaquinas'));
          interate++;
          if (idMaquinaLocalData.length == interate) {
            showGraficsLength();
            showAlerts();
          }
          throw "Nenhum resultado encontrado!!";
        } else {
          resposta.json().then(function (resposta) {
            let dadoRam = 0;
            let dadoCpu = 0;

            for (let i = 0; i < resposta.length; i++) {
              const res = resposta[i];

              if (res.tipoComponente === 'RAM' && dadoRam === 0) {
                dadoRam = res.dado;
              } else if (res.tipoComponente === 'CPU' && dadoCpu === 0) {
                dadoCpu = res.dado;
              }
            }

            if (dadoCpu === 0 || dadoRam === 0) {
              stats.defect.push(idMaquina);
            } else {
              if (dadoDisco > valueWarning || dadoCpu > valueWarning || dadoRam > valueWarning) {
                stats.warning.push(idMaquina);
              } else if (dadoCpu < valueGood || dadoRam < valueGood) {
                stats.good.push(idMaquina);
              } else {
                stats.alert.push(idMaquina);
              }
            }

            const idMaquinaLocalData = JSON.parse(sessionStorage.getItem('idMaquinas'));
            interate++;
            if (idMaquinaLocalData.length == interate) {
              showGraficsLength();
              showAlerts();
            }
          });
        }
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}


function showGraficsLength() {
  document.getElementById('lengthGood').innerHTML = stats.good.length;
  document.getElementById('lengthWarning').innerHTML = stats.warning.length;
  document.getElementById('lengthAlert').innerHTML = stats.alert.length;

  document.getElementById('dataGood').style.display = 'flex';
  document.getElementById('loadingGood').style.display = 'none';

  document.getElementById('dataAlert').style.display = 'flex';
  document.getElementById('loadingAlert').style.display = 'none';

  document.getElementById('dataWarning').style.display = 'flex';
  document.getElementById('loadingWarning').style.display = 'none';

  stats.good.length > 0 && (document.getElementById('buttonGood').disabled = false);
  stats.alert.length > 0 && (document.getElementById('buttonAlert').disabled = false);
  stats.warning.length > 0 && (document.getElementById('buttonWarning').disabled = false);

  sessionStorage.setItem('statsMachine', JSON.stringify(stats));
}

function showAlerts() {
  if (stats) {
    const divAvisos = document.getElementById('div_avisos');

    const boxAviso = document.createElement('div');
    boxAviso.classList.add('avisos');
    boxAviso.style.backgroundColor = '#cbcaca';
    divAvisos.appendChild(boxAviso);

    const total = stats.defect.length + stats.good.length + stats.warning.length + stats.alert.length;
    const aviso = document.createElement('p');
    boxAviso.appendChild(aviso);
    aviso.innerHTML = ` 
      Temos ${total} máquina${total > 1 ? 's' : ''} cadastradas no sistema.
    `;
  }

  if (stats.defect.length > 0) {
    const divAvisos = document.getElementById('div_avisos');

    const boxAviso = document.createElement('div');
    boxAviso.classList.add('avisos');
    boxAviso.style.backgroundColor = 'red';
    divAvisos.appendChild(boxAviso);

    const aviso = document.createElement('p');
    boxAviso.appendChild(aviso);
    aviso.innerHTML = ` 
      Temos ${stats.defect.length} máquina${stats.defect.length > 1 ? 's' : ''} com problemas para obter dados de algum componente.
    `;
    aviso.setAttribute(
      'onclick',
      `goMaquinaPainel(${stats.defect})`
    )
    aviso.classList.add('cursor-pointer');
  }
  if (!stats.alert.length && !stats.warning.length && !stats.good.length && !stats.defect.length) {
    const divAvisos = document.getElementById('div_avisos');

    const boxAviso = document.createElement('div');
    boxAviso.classList.add('avisos');
    boxAviso.style.backgroundColor = 'yellow';
    divAvisos.appendChild(boxAviso);

    const aviso = document.createElement('p');
    boxAviso.appendChild(aviso);
    aviso.innerHTML = ` 
      No momento você não tem nenhuma máquina sendo monitorada.
    `;
  }

  if (!stats.alert.length && stats.warning.length && !stats.good.length && !stats.defect.length) {
    const divAvisos = document.getElementById('div_avisos');

    const boxAviso = document.createElement('div');
    boxAviso.classList.add('avisos');
    boxAviso.style.backgroundColor = 'red';
    divAvisos.appendChild(boxAviso);

    const aviso = document.createElement('p');
    boxAviso.appendChild(aviso);
    aviso.innerHTML = ` 
      Todas as nossas máquinas estão em perigo, verifique-as.
    `;

    aviso.setAttribute(
      'onclick',
      `goMaquinaPainel('warning')`
    )
    aviso.classList.add('cursor-pointer');
  }

  if (!stats.alert.length && !stats.warning.length && stats.good.length && !stats.defect.length) {
    const divAvisos = document.getElementById('div_avisos');

    const boxAviso = document.createElement('div');
    boxAviso.classList.add('avisos');
    boxAviso.style.backgroundColor = 'green';
    divAvisos.appendChild(boxAviso);

    const aviso = document.createElement('p');
    boxAviso.appendChild(aviso);
    aviso.innerHTML = ` 
      Todas as nossas máquinas estão em perfeito estado.
    `;

    aviso.setAttribute(
      'onclick',
      `goMaquinaPainel('good')`
    )
    aviso.classList.add('cursor-pointer');
  }

  if (stats.alert.length && !stats.warning.length && !stats.good.length && !stats.defect.length) {
    const divAvisos = document.getElementById('div_avisos');

    const boxAviso = document.createElement('div');
    boxAviso.classList.add('avisos');
    boxAviso.style.backgroundColor = 'yellow';
    divAvisos.appendChild(boxAviso);

    const aviso = document.createElement('p');
    boxAviso.appendChild(aviso);
    aviso.innerHTML = ` 
      Todas as nossas máquinas estão em alerta.
    `;

    aviso.setAttribute(
      'onclick',
      `goMaquinaPainel('alert')`
    )
    aviso.classList.add('cursor-pointer');
  }
}