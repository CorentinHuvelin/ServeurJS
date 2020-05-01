const BreweryDAO = require("../dao/breweryDAO");
const Brewery = require("../model/brewery");

/* Load Controller Common function */
const ControllerCommon = require("./common/controllerCommon");

class BreweryController {
  constructor() {
    this.breweryDAO = new BreweryDAO();
    this.common = new ControllerCommon();
  }
  //appelle findAll du DAO
  findAll(res) {
    this.breweryDAO
      .findAll()
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //recupère le numéro entré dans la route et le met en argument de findById du DAO
  findById(req, res) {
    let id = req.params.id;
    this.breweryDAO
      .findById(id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //recupère le string entré dans la route et le met en argument de findInfoByName du DAO
  findInfoByName(req, res) {
    let id = req.params.name;
    this.breweryDAO
      .findInfoByName(id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //recupère le string entré dans la route et le met en argument de findByPays du DAO
  findByPays(req, res) {
    let id = req.params.pays;
    this.breweryDAO
      .findByPays(id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }

  create(req, res) {
    let brewery = new Brewery(req.body);
    return this.breweryDAO
      .create(brewery)
      .then(() => this.breweryDAO.findById(Brewery.id))
      .then(brewery => {
        res.status(201);
        res.json(brewery);
      })
      .catch(this.common.serverError(res));
  }

  deleteById(req, res) {
    let id = req.params.id;

    this.breweryDAO
      .deleteById(id)
      .then(this.common.editSuccess(res))
      .catch(this.common.serverError(res));
  }

  update(req, res) {
    let brewery = new Brewery();
    brewery.id = req.body.id;
    brewery.city = req.body.city;
    brewery.state = req.body.state;
    brewery = Object.assign(brewery, req.body);

    return this.breweryDAO
      .update(brewery)
      .then(this.breweryDAO.findById(req.params.id))
      .then(() => this.breweryDAO.findById(brewery.id))
      .then(brewery => {
        res.status(201);
        res.json(brewery);
      })
      .catch(err => console.log(err));
  }
}

module.exports = BreweryController;
