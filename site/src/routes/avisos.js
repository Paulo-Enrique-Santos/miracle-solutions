var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/", function (req, res) {
    avisoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

router.get("/getDataMachine/:idMaquina", function (req, res) {
    avisoController.getDataMachine(req, res);
});

router.get("/getIdMaquinas/:idUsuario", function (req, res) {
    avisoController.getIdMaquinas(req, res);
});

router.get("/getStatsMaquinas/:idMaquina", function (req, res) {
    avisoController.getStatsMaquinas(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    avisoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    avisoController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletarMaquina/:idMaquina", function (req, res) {
    avisoController.deletarMaquina(req, res);
});

router.delete("/deleteFuncById/:idUsuario", function (req, res) {
    avisoController.deleteFuncById(req, res);
});

router.get("/listarFuncionarios/:idUsuario", function (req, res) {
    avisoController.listarFuncionarios(req, res);
});

router.get("/obterMaquinasComDefeito/:idUsuario", function (req, res) {
    avisoController.obterMaquinasComDefeito(req, res);
});

router.get("/exibirPergunta/:fkEmpresa", function (req, res) {
    avisoController.exibirPergunta(req, res);
});

router.post("/insertNewQuestion/", function (req, res) {
    avisoController.insertNewQuestion(req, res);
});

router.delete("/deletePergById/:idPergunta", function (req, res) {
    avisoController.deletePergById(req, res);
});

router.post("/alterQuestion/", function (req, res) {
    avisoController.alterQuestion(req, res);
});

module.exports = router;