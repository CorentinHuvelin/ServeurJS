const Brewery = require("../model/brewery");

const daoCommon = require("./commons/daoCommon");

class BreweryDAO {
  constructor() {
    this.common = new daoCommon();
  }
  //recupère et affiche toutes les brasseries
  findAll() {
    const sqlRequest = "SELECT * FROM brewery";

    return this.common
      .findAll(sqlRequest)
      .then(rows => {
        const breweries = rows.map(row => new Brewery(row));
        return breweries;
      })
      .catch(err => console.log(err));
  }
  //recupère et affiche toutes les infos d'une brasserie selon son id
  findById(id) {
    let sqlRequest = "SELECT * FROM brewery WHERE id=$id";
    let sqlParams = { $id: id };
    //console.log(sqlParams);
    return this.common
      .findOne(sqlRequest, sqlParams)
      .then(row => new Brewery(row));
  }
  //recupère et affiche les moyens de contactt d'une brasserie selon un id
  findInfoByName(name) {
    let sqlRequest =
      "SELECT city,phone,website FROM brewery WHERE breweries=$name";
    let sqlParams = { $name: name };
    //console.log(sqlParams);
    return this.common
      .findOne(sqlRequest, sqlParams)
      .then(row => new Brewery(row));
  }
  //recupère et affiche toutes les brasseries du pays recherché
  findByPays(pays) {
    let sqlRequest = "SELECT id, breweries FROM brewery WHERE country=$pays";
    let sqlParams = { $pays: pays };
    //console.log(sqlParams);
    return this.common
      .findAllWithParams(sqlRequest, sqlParams)
      .then(rows => {
        const brewery = rows.map(row => new Brewery(row));
        return brewery;
      })
      .catch(err => console.log(err));
  }

  create(brewery) {
    const sqlRequest =
      "INSERT INTO brewery(" +
      "id,breweries,country) " +
      "VALUES ($id,$breweries,$country)";
    const sqlParams = {
      $id: brewery.id,
      $catName: brewery.breweries,
      $lastMod: brewery.country
    };
    //console.log(sqlParams, sqlRequest);
    return this.common.run(sqlRequest, sqlParams);
  }

  deleteById(id) {
    let sqlRequest = "DELETE FROM brewery WHERE id=$id";
    let sqlParams = { $id: id };
    return this.common.run(sqlRequest, sqlParams);
  }
  update(brewery) {
    let sqlRequest =
      "UPDATE brewery SET " + "state=$state, " + "city=$city " + "WHERE id=$id";

    let sqlParams = {
      $state: brewery.state,
      $city: brewery.city,
      $id: brewery.id
    };
    return this.common.run(sqlRequest, sqlParams);
  }
}

module.exports = BreweryDAO;
