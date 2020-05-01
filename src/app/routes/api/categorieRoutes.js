const express = require("express");
const router = express.Router();

const CategorieController = require("../../controller/categorieController");
const categorieController = new CategorieController();

//appelle la fonction findAll du controleur lorsque rien n'est écrit dans l'URL
router.get("/", function(req, res) {
  categorieController.findAll(res);
});
//appelle la fonction findById du controleur lorsque /{nummber} est écrit dans l'URL
router.get("/:id", function(req, res) {
  categorieController.findById(req, res);
});
//appelle la fonction findNameById du controleur lorsque /name/{number} est écrit dans l'URL
router.get("/name/:id", function(req, res) {
  categorieController.findNameById(req, res);
});
//appelle la fonction findModById du controleur lorsque /mod/{number} est écrit dans l'URL
router.get("/mod/:id", function(req, res) {
  categorieController.findModById(req, res);
});

router.post("/", function(req, res) {
  categorieController.create(req, res);
});
router.put("/:id", function(req, res) {
  categorieController.update(req, res);
});

router.delete("/:id", function(req, res) {
  categorieController.deleteById(req, res);
});
module.exports = router;
