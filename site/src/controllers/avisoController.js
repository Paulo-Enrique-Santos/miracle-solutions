var avisoModel = require("../models/avisoModel");

function testar(req, res) {
  console.log("ENTRAMOS NO avisoController");
  res.send("ENTRAMOS NO AVISO CONTROLLER");
}

function listar(req, res) {
  avisoModel
    .listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function getDataMachine(req, res) {
  const idMaquina = req.params.idMaquina;
  
  avisoModel
    .getDataMachine(idMaquina)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function getIdMaquinas(req, res) {
  var idUsuario = req.params.idUsuario;
  avisoModel
    .getIdMaquinas(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);

      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function getStatsMaquinas(req, res) {
  var idMaquina = req.params.idMaquina;
  avisoModel
    .getStatsMaquinas(idMaquina)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);

      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function pesquisarDescricao(req, res) {
  var descricao = req.params.descricao;

  avisoModel
    .pesquisarDescricao(descricao)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function publicar(req, res) {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  var idUsuario = req.params.idUsuario;

  if (titulo == undefined) {
    res.status(400).send("O título está indefinido!");
  } else if (descricao == undefined) {
    res.status(400).send("A descrição está indefinido!");
  } else if (idUsuario == undefined) {
    res.status(403).send("O id do usuário está indefinido!");
  } else {
    avisoModel
      .publicar(titulo, descricao, idUsuario)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function editar(req, res) {
  var novaDescricao = req.body.descricao;
  var idAviso = req.params.idAviso;

  avisoModel
    .editar(novaDescricao, idAviso)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function deletarMaquina(req, res) {
  var idMaquina = req.params.idMaquina;

  let idComponetes = [];

  avisoModel
    .getComponenteByMaquina(idMaquina)
    .then(function (resultado) {
      for (let i = 0; i < resultado.length; i++) {
        const idComponent = resultado[i].idComponente;

        avisoModel
          .deleteDadsByIdComponent(idComponent)
          .then(function (resultado) {
            console.log('Dados deletados com sucesso');

            avisoModel
              .deleteComponentByIdMachine(idMaquina)
              .then(function (resultado) {
                console.log('Componentes deletados com sucesso');

                avisoModel
                  .deleteMachine(idMaquina)
                  .then(function (resultado) {
                    console.log('Máquinas deletadas com sucesso');
                    res.json(resultado);
                  })
                  .catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                  });
              })
              .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
              });
          })
          .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
          });
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao coleta os componentes da máquina: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function deleteFuncById(req, res) {
  const idUsuario = req.params.idUsuario;

  avisoModel
    .getIdMaquinasByFuncId(idUsuario)
    .then(function (resultado) {
      if (resultado.length === 0) {
        avisoModel
          .deleteFuncById(idUsuario)
          .then(function (resultado) {
            console.log('Funcionário Deletado');
            res.json(resultado);
          })
          .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
          });
      }


      for (let i = 0; i < resultado.length; i++) {
        const idMaquina = resultado[i].idComputador;

        deletarMaquina(idMaquina)
          .then(function (resultado) {
            console.log('Máquinas Deletadas');

            avisoModel
              .deleteFuncById(idUsuario)
              .then(function (resultado) {
                console.log('Funcionário Deletado');
                res.json(resultado);
              })
              .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
              });
          })
          .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
          });
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarFuncionarios(req, res) {
  var idUsuario = req.params.idUsuario;
  avisoModel
    .listarFuncionarios(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function obterMaquinasComDefeito(req, res) {
  var idUsuario = req.params.idUsuario;
  const date = new Date();
  var dia = date.getDate();
  var mes = date.getMonth() + 1;
  if (
    mes == 1 || mes == 2 || mes == 3 || mes == 4 || mes == 5 || mes == 6 || mes == 7 || mes == 8 || mes == 9
  ) {
    mes = "0" + mes;
  }

  if (
    dia == 1 || dia == 2 || dia == 3 || dia == 4 || dia == 5 || dia == 6 || dia == 7 || dia == 8 || dia == 9
  ) {
    dia = "0" + dia;
  }

  avisoModel
    .obterMaquinasComDefeito(idUsuario, mes, dia)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function exibirPergunta(req, res) {
  var fkEmpresa = req.params.fkEmpresa;

  avisoModel
    .exibirPergunta(fkEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function insertNewQuestion(req, res) {
  var pergunta = req.body.perguntaServer;
  var empresa = req.body.empresaServer;

  console.log("teste");
  avisoModel
    .insertNewQuestion(pergunta, empresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });

}

function deletePergById(req, res) {
  var idPergunta = req.params.idPergunta;

  avisoModel
  .changeResposta(idPergunta)
  .then(function (resultado) {
      res.status(200).json(resultado);
  })
  .catch(function (erro) {
    console.log(erro);
    console.log(
      "Houve um erro ao buscar as ultimas medidas.",
      erro.sqlMessage
    );
    res.status(500).json(erro.sqlMessage);
  });

  avisoModel
    .deletePergById(idPergunta)
    .then(function (resultado) {
        res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function alterQuestion(req, res) {
  var idPergunta = req.body.idPerguntaServer;
  var pergunta = req.body.perguntaServer;

  console.log("teste");
  avisoModel
    .alterQuestion(pergunta, idPergunta)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });

}

module.exports = {
  testar,
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
  deleteFuncById,
  exibirPergunta,
  insertNewQuestion,
  deletePergById,
  alterQuestion
};
