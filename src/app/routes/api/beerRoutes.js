const express = require("express");
const router = express.Router();

const BeerController = require("../../controller/beerController");
const beerController = new BeerController();

//appelle la fonction findAll du controleur lorsque /beer est écrit dans l'URL
router.get("/beer", function(req, res) {
  beerController.findAll(res);
});
//appelle la fonction findStyle du controleur lorsque /style est écrit dans l'URL
router.get("/style", function(req, res) {
  beerController.findStyle(res);
});
//appelle la fonction findByDegree du controleur lorsque /degre/{number} est écrit dans l'URL
router.get("/degre/:deg", function(req, res) {
  beerController.findByDegree(req, res);
});
//appelle la fonction findAById du controleur lorsque /beer/{number} est écrit dans l'URL
router.get("/beer/:id", function(req, res) {
  beerController.findById(req, res);
});
//appelle la fonction findADescById du controleur lorsque /desc/{number} est écrit dans l'URL
router.get("/desc/:id", function(req, res) {
  beerController.findDescById(req, res);
});
//appelle la fonction findDesc du controleur lorsque /desc est écrit dans l'URL
router.get("/desc/", function(req, res) {
  beerController.findDesc(res);
});
//appelle la fonction findPays du controleur lorsque /pays est écrit dans l'URL
router.get("/pays/", function(req, res) {
  beerController.findPays(res);
});
//appelle la fonction findByIdPays du controleur lorsque /pays/id/{number} est écrit dans l'URL
router.get("/pays/id/:id", function(req, res) {
  beerController.findByIdPays(req, res);
});
//appelle la fonction findByPaysPays du controleur lorsque /pays/pays/{string} est écrit dans l'URL
router.get("/pays/pays/:pays", function(req, res) {
  beerController.findByPaysPays(req, res);
});

router.post("/", function(req, res) {
  beerController.create(req, res);
});
router.put("/:id", function(req, res) {
  beerController.update(req, res);
});

router.delete("/:id", function(req, res) {
  beerController.deleteById(req, res);
});

module.exports = router;
