const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  const user = {
    nom: "remm",
    prenom: "Jean-François",
    skills: ["android", "java", "humour"]
  };
  const user2 = {
    nom: "remm2",
    prenom: "Jean-François2",
    skills: ["android2", "java2", "humour2"]
  };
  const tab = {
    utilisateur1: user,
    utilisateur2: user2
  };
  res.json([tab]);
});

module.exports = router;
