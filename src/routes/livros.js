var express = require("express");
var router = express.Router();

var livrosController = require("../controllers/livrosController");

router.get("/listar", function (req, res) {
    livrosController.listar(req, res);
});

router.get("/grafico", function (req, res) {
    livrosController.qtdLivrosCategoria(req, res);
});

router.get("/kpiGenero", function (req, res) {
    livrosController.generoMaiorQtd(req, res);
});

router.get("/kpiAutor", function (req, res) {
    livrosController.autoresMaisCaros(req, res);
});

router.post("/cadastrar", function (req, res) {
    livrosController.cadastrar(req, res);
});

router.put("/editar/:id", function (req, res) {
    livrosController.editar(req, res);
});

module.exports = router;