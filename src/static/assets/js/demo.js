const socket = io(); //initialisation socket.io

const app = new Vue({
  //création instance Vue
  el: "#app", //indique sur quoi greffé la vue class="app"
  data: {
    msg: "", //le message actuelle
    msgs: [], //tableau de tout les message sous forme pseudo : message
    compte: "", //le pseudo de la personne connecté
    display: true, //option pour afficher le compte ou l'envoie de message true = connexion / false = envoie message
    users: [] //tableau des comptes connectés
  },
  methods: {
    handleClick: function() {
      //envoie du message
      if (this.msg != "") {
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
        //envoie du message / object contenant une date une utilisateur et un message
        socket.emit("msg-event", {
          dt: date,
          cmp: this.compte,
          mess: this.msg
        });
        //ajout message au data du client
        this.msgs.unshift({ dt: date, cmp: this.compte, mess: this.msg });
        this.msg = ""; //réinitialise le message actuelle du client
      } else {
        alert("Erreur message vide !");
      }
    },
    handleDeconnexion: function() {
      const index = this.users.indexOf(this.compte); //cherche index du copte a déconnecté
      if (index > -1) {
        //s'il existe alors on le supprime plus notifie le serveur
        this.users.splice(index, 1);
        socket.emit("deco-user", this.compte); //envoie du compte a déconnecté
        this.compte = "";
        this.display = !this.display; //change l'affichage message vers connexion
      }
    },
    handleConnexion: function() {
      //console.log(this);
      //gestion connexion compte
      if (
        //si user existe pas déjà pas vide et nom pas plus grand que 20
        !this.users.includes(this.compte) &&
        this.compte != "" &&
        this.compte.length <= 20
      ) {
        //si le pseudo n'est pas déjà utilisé
        this.display = !this.display; //affiche l'envoie de message et cache la gestion de pseudo
        this.users.push(this.compte); //rentre le compte dans le tableau d'users
        socket.emit("new-user", this.compte); //envoie du compte vers serveur / Connexion
      } else {
        alert("Erreur compte !");
      }
    }
  },
  mounted: function() {
    //reception des données du serveur
    socket.emit("init", 0);
    socket.on("init-msg", (mess, users) => {
      // mess tableau des messages / users tableau des utilisateurs
      this.msgs = mess;
      this.users = users;
    });
  }
});

socket.on("broad-msg", mess => {
  //reception message du serveur / mess est le nouveau tableau de message
  app.msgs = mess;
});

socket.on("broad-users", users => {
  //reception des users du serveur / users est le nouveau tableau d'utilisateur
  app.users = users;
});

window.addEventListener("beforeunload", function() {
  //si le client reload la page F5 on le déconnecte
  const index = app.users.indexOf(app.compte); //cherche index du copte a déconnecté
  if (index > -1) {
    //s'il existe alors on le supprime plus notifie le serveur
    app.users.splice(index, 1);
    socket.emit("deco-user", app.compte); //envoie du compte qui se déconnecte au serveur
  }
});
