const express = require("express");
const router = express.Router();

const BreweryController = require("../../controller/breweryController");
const breweryController = new BreweryController();

//appelle la fonction findAll du controleur lorsque /brewery est écrit dans l'URL
router.get("/brewery", function(req, res) {
  breweryController.findAll(res);
});
//appelle la fonction findById du controleur lorsque /id/{number} est écrit dans l'URL
router.get("/id/:id", function(req, res) {
  breweryController.findById(req, res);
});
//appelle la fonction findByPays du controleur lorsque /pays/{string} est écrit dans l'URL
router.get("/pays/:pays", function(req, res) {
  breweryController.findByPays(req, res);
});
//appelle la fonction findInfoByName du controleur lorsque /info/{string} est écrit dans l'URL
router.get("/info/:name", function(req, res) {
  breweryController.findInfoByName(req, res);
});

router.post("/", function(req, res) {
  breweryController.create(req, res);
});
router.put("/:id", function(req, res) {
  breweryController.update(req, res);
});

router.delete("/:id", function(req, res) {
  breweryController.deleteById(req, res);
});

module.exports = router;
