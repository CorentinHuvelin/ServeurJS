const Beer = require("../model/beer");

const daoCommon = require("./commons/daoCommon");

class BeerDAO {
  constructor() {
    this.common = new daoCommon();
  }
  //recupère et affiche sur la page toutes les bières
  findAll() {
    const sqlRequest = "SELECT * FROM beer";

    return this.common
      .findAll(sqlRequest)
      .then(rows => {
        const beers = rows.map(row => new Beer(row));
        return beers;
      })
      .catch(err => console.log(err));
  }
  //recupère et affiche sur la page le nom des bières et leurs styles
  findStyle() {
    const sqlRequest = "SELECT name,style FROM beer Order By name ASC";
    return this.common
      .findAll(sqlRequest)
      .then(rows => {
        const beers = rows.map(row => new Beer(row));
        return beers;
      })
      .catch(err => console.log(err));
  }
  //recupère et affiche sur la page le nom des bières et leurs descriptions
  findDesc() {
    const sqlRequest = "SELECT name,description FROM beer";

    return this.common
      .findAll(sqlRequest)
      .then(rows => {
        const beers = rows.map(row => new Beer(row));
        return beers;
      })
      .catch(err => console.log(err));
  }
  //recupère et affiche sur la page la localisation d'une bière
  findPays() {
    const sqlRequest = "SELECT Name,Country,city,state,address FROM beer";
    //console.log("d");
    return this.common
      .findAll(sqlRequest)
      .then(rows => {
        const beers = rows.map(row => new Beer(row));
        return beers;
      })
      .catch(err => console.log(err));
  }
  //recupère et affiche sur la page la bière recherchée par son id
  findById(id) {
    let sqlRequest = "SELECT * FROM beer WHERE id=$id";
    let sqlParams = { $id: id };
    //console.log(sqlParams);
    return this.common
      .findOne(sqlRequest, sqlParams)
      .then(row => new Beer(row));
  }
  //recupère et affiche sur la page toutes les bières ayant un degré égal a celui choisi dans l'URL +- 1
  findByDegree(deg) {
    let sqlRequest =
      "SELECT name,Alcohol_By_Volume FROM beer WHERE Alcohol_By_Volume<$deg+1 and Alcohol_By_Volume>$deg-1";
    let sqlParams = { $deg: deg };
    //console.log(sqlParams);
    return this.common
      .findAllWithParams(sqlRequest, sqlParams)
      .then(row => new Beer(row));
  }
  //recupère et affiche le nom d'une bière recherchée et sa description
  findDescById(id) {
    let sqlRequest = "SELECT name, description FROM beer WHERE id=$id";
    let sqlParams = { $id: id };
    //console.log(sqlParams);
    return this.common
      .findAllWithParams(sqlRequest, sqlParams)
      .then(rows => {
        const beers = rows.map(row => new Beer(row));
        return beers;
      })
      .catch(err => console.log(err));
  }
  //recupère et affiche toutes les bières venant du pays
  findByPaysPays(pays) {
    let sqlRequest = "SELECT Name FROM beer WHERE country=$pays";
    let sqlParams = { $pays: pays };
    //console.log(sqlParams);
    return this.common
      .findAllWithParams(sqlRequest, sqlParams)
      .then(rows => {
        const beers = rows.map(row => new Beer(row));
        return beers;
      })
      .catch(err => console.log(err));
  }
  //recupère et affiche la localisation d'une bière selon son numéro
  findByIdPays(id) {
    let sqlRequest =
      "SELECT Name,Country,city,state,address FROM beer WHERE id=$id";
    let sqlParams = { $id: id };
    //console.log(sqlParams);
    return this.common
      .findOne(sqlRequest, sqlParams)
      .then(row => new Beer(row));
  }

  create(beer) {
    const sqlRequest =
      "INSERT INTO beer(" + "id,name,country) " + "VALUES ($id,$name,$country)";
    const sqlParams = {
      $id: beer.id,
      $catName: beer.name,
      $lastMod: beer.country
    };
    //console.log(sqlParams, sqlRequest);
    return this.common.run(sqlRequest, sqlParams);
  }

  deleteById(id) {
    let sqlRequest = "DELETE FROM beer WHERE id=$id";
    let sqlParams = { $id: id };
    return this.common.run(sqlRequest, sqlParams);
  }
  update(beer) {
    let sqlRequest =
      "UPDATE beer SET " +
      "name=$name, " +
      "country=$country " +
      "WHERE id=$id";

    let sqlParams = {
      $state: beer.name,
      $city: beer.country,
      $id: beer.id
    };
    return this.common.run(sqlRequest, sqlParams);
  }
}

module.exports = BeerDAO;
