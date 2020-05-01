const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const database = require("./app/config/dbconfig");
const bodyParser = require("body-parser"); //création de toute les constantes

process.on("exit", function(code) {
  return console.log(`About to exit with code ${code}`);
});

let rooms = [];
let MapUsers = new Map();
let MapData = new Map(); //map qui vont contenir les données

database.init.then(db => {
  //initialisationde la bdd
  http.listen(port, function() {
    console.log("Server listening on port : " + port); //listen sur le port
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /* Router configuration */
  const REST_API_ROOT = "/api";
  app.use(REST_API_ROOT, require("./app/routes/router")); //déclare le chemin pour api
  app.get("/", (req, res) => res.sendFile(__dirname + "/static/demo.html")); //mise en place de la page d'acceuil

  //accès aux pages statiques
  app.use(express.static(__dirname + "/static"));
  io.on("connection", function(socket) {
    //Si quelqu'un se connecte
    let room = ""; //sa room de socket.io
    //
    socket.on("init", msg => {
      //lors de la connexion
      room = "Room" + msg; //on attribut une room msg est un numéro de connexion
      const index = rooms.indexOf(room);
      if (index > -1) {
        //Vérifie si elle existe déjà ou pas
        console.log(room + " déjà existante");
      } else {
        //on crée le modèle de donnée pour la room
        console.log("Room inexistante : Création " + room);
        rooms.push(room);
        MapUsers.set(room, [room]);
        MapData.set(room, []);
      }
      socket.join(room); //join cette room et envoie de donnée de base
      socket.emit("init-msg", MapData.get(room), MapUsers.get(room));
    });
    //
    console.log("connect"); //print connect
    //
    socket.on("msg-event", function(msg) {
      //si qqu envoie un message msg est le message reçu par le serveur
      MapData.get(room).unshift(msg); //ajout en tête des données selon la room a laquelle le client appartient
      socket.to(room).emit("broad-msg", MapData.get(room)); //envoie les données au autre users
    });
    //
    socket.on("deco-user", function(cmpt) {
      //si qqun se déconnecte cmpt est le compte que le serveur reçoit
      let ind = MapUsers.get(room).indexOf(cmpt);
      if (ind > -1) {
        MapUsers.get(room).splice(ind, 1); //on le retire des données
      }
      let now = new Date(); //Prend la date du message
      let annee = now.getFullYear();
      let mois = ("0" + (now.getMonth() + 1)).slice(-2);
      let jour = ("0" + now.getDate()).slice(-2);
      let heure = ("0" + now.getHours()).slice(-2);
      let minute = ("0" + now.getMinutes()).slice(-2);
      let date =
        "(" +
        jour +
        "/" +
        mois +
        "/" +
        annee +
        " " +
        heure +
        ":" +
        minute +
        ")";
      let msg = {
        dt: date,
        cmp: room,
        mess: cmpt + " s'est deconnecté !"
      };
      MapData.get(room).unshift(msg); //ajout d'une msg de déconnexion
      io.in(room).emit("broad-msg", MapData.get(room)); //envoie de la nouvelle donnée a tout le monde
      socket.to(room).emit("broad-users", MapUsers.get(room)); // envoie le nouveau tab d'users au autre client
    });
    //fonction appelé quand un utilisateur se connecte
    socket.on("new-user", function(cmpt) {
      //cmpt est le compte que le serveur reçoit
      MapUsers.get(room).push(cmpt); //ajout du nouveau client
      let now = new Date(); //Prend la date du message
      let annee = now.getFullYear();
      let mois = ("0" + (now.getMonth() + 1)).slice(-2);
      let jour = ("0" + now.getDate()).slice(-2);
      let heure = ("0" + now.getHours()).slice(-2);
      let minute = ("0" + now.getMinutes()).slice(-2);
      let date =
        "(" +
        jour +
        "/" +
        mois +
        "/" +
        annee +
        " " +
        heure +
        ":" +
        minute +
        ")";
      let msg = {
        dt: date,
        cmp: room,
        mess: cmpt + " s'est connecté !"
      };
      MapData.get(room).unshift(msg); //ajout du message de connexion
      io.in(room).emit("broad-msg", MapData.get(room)); //envoie de data a tout le monde
      socket.to(room).emit("broad-users", MapUsers.get(room)); //envoie donnée user a autre client
    });
    //
  });
});
