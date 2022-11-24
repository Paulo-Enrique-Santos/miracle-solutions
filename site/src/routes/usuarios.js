var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarUser", function (req, res) {
    usuarioController.cadastrarUser(req, res);
})

router.post("/sendEmailForgotPassword", function (req, res) {
    usuarioController.sendEmailForgotPassword(req, res);
})

router.put("/editarUser", function (req, res) {
    usuarioController.editarUser(req, res);
})

router.put("/updatePassword", function (req, res) {
    usuarioController.updatePassword(req, res);
})

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/buscarEmpresa", function (req, res) {
    usuarioController.buscarEmpresa(req, res);
})

router.get("/getValidEmail/:email", function (req, res) {
    usuarioController.getValidEmail(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/obterDadosMaquina", function (req, res) {
    usuarioController.obterDadosMaquina(req, res);
});

router.get("/obterDadosComponente/:fkUsuario", function (req, res) {
    usuarioController.obterDadosComponente(req, res);
});

router.get("/listarFuncionarios/:fkUsuario", function (req, res) {
    usuarioController.listarFuncionarios(req, res);
});

router.get("/atualizarPesquisa/:idUsuario", function (req, res) {
    usuarioController.atualizarPesquisa(req, res);
});

router.get("/getFuncById/:idFuncionario", function (req, res) {
    usuarioController.getFuncById(req, res);
});

module.exports = router;