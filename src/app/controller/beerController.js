const BeerDAO = require("../dao/beerDAO");
const Beer = require("../model/beer");

/* Load Controller Common function */
const ControllerCommon = require("./common/controllerCommon");

class BeerController {
  constructor() {
    this.beerDAO = new BeerDAO();
    this.common = new ControllerCommon();
  }
  //appelle findAll du DAO
  findAll(res) {
    this.beerDAO
      .findAll()
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //appelle findStyle du DAO
  findStyle(res) {
    this.beerDAO
      .findStyle()
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //appelle findDesc du DAO
  findDesc(res) {
    this.beerDAO
      .findDesc()
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //recupère le degré entré dans la route et le met en argument de findByDegree du DAO
  findByDegree(req, res) {
    let deg = req.params.deg;
    this.beerDAO
      .findByDegree(deg)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //appelle findPays du DAO
  findPays(res) {
    this.beerDAO
      .findPays()
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //recupère le numero entré dans la route et le met en argument de findById du DAO
  findById(req, res) {
    let id = req.params.id;
    this.beerDAO
      .findById(id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //recupère le numéro entré dans la route et le met en argument de findDescById du DAO
  findDescById(req, res) {
    let id = req.params.id;
    this.beerDAO
      .findDescById(id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //recupère le string entré dans la route et le met en argument de findByPaysPays du DAO
  findByPaysPays(req, res) {
    let pays = req.params.pays;
    this.beerDAO
      .findByPaysPays(pays)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }
  //recupère le numéro entré dans la route et le met en argument de findByIdPays du DAO
  findByIdPays(req, res) {
    let id = req.params.id;
    this.beerDAO
      .findByIdPays(id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res));
  }

  create(req, res) {
    let beer = new Beer(req.body);
    return this.beerDAO
      .create(beer)
      .then(() => this.beerDAO.findById(beer.id))
      .then(beer => {
        res.status(201);
        res.json(beer);
      })
      .catch(this.common.serverError(res));
  }

  deleteById(req, res) {
    let id = req.params.id;

    this.beerDAO
      .deleteById(id)
      .then(this.common.editSuccess(res))
      .catch(this.common.serverError(res));
  }

  update(req, res) {
    let beer = new Beer();
    beer.name = req.body.name;
    beer.id = req.body.id;
    beer.cat_id = req.body.cat_id;
    beer = Object.assign(beer, req.body);

    return this.beerDAO
      .update(beer)
      .then(this.beerDAO.findById(req.params.id))
      .then(() => this.beerDAO.findById(beer.id))
      .then(beer => {
        res.status(201);
        res.json(beer);
      })
      .catch(err => console.log(err));
  }
}

module.exports = BeerController;
