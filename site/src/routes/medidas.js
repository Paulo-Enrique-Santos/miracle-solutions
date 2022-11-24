var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/ultimasCPU/:fkUsuario", function (req, res) {
    medidaController.buscarUltimasMedidasCPU(req, res);
});

router.get("/ultimasDisco/:fkUsuario", function (req, res) {
    medidaController.buscarUltimasMedidasDisco(req, res);
});

router.get("/ultimasRAM/:fkUsuario", function (req, res) {
    medidaController.buscarUltimasMedidasRAM(req, res);
});



router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/tempo-realCPU/:fkUsuario", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCPU(req, res);
})

router.get("/tempo-realDisco/:fkUsuario", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDisco(req, res);
})

router.get("/tempo-realRAM/:fkUsuario", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRAM(req, res);
})


router.get("/ultimosApontamentos/:idUsuario", function (req, res) {
    medidaController.buscarUltimosApontamentos(req, res);
})

router.get("/ultimosApontamentos/:idUsuario", function (req, res) {
    medidaController.buscarUltimosApontamentos(req, res);
})

router.post("/ultimasOcorrencias/:idUsuario", function (req, res) {
    medidaController.buscarUltimosOcorrencias(req, res);
})

router.post("/ultimasOcorrencias/:idUsuario", function (req, res) {
    medidaController.buscarUltimosOcorrencias(req, res);
})




router.post("/listarMedida/:idUsuario", function (req, res) {
    medidaController.listarMedida(req, res);
})
module.exports = router;