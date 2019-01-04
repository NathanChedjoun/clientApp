
var express = require('express');
var router = express.Router();

const pvsController = require('../controllers').pvs;
const config=require("../config/configs");

var nbrCandidat;
var nbrInscrit;
var nbrBureau;
var typeFraude;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/resultats', function (req, res, next) {
  nbrCandidat = req.body.nbrCandidat;
  nbrInscrit = req.body.nbrInscrit;
  nbrBureau = req.body.nbrBureau;
  typeFraude = req.body.typeFraude;

  pvsController.init(nbrCandidat, nbrBureau, nbrInscrit);
  
  // A ce niveau ci on doit appeler le génerateur de pvs pour qu'il fasse son travait
  // tout en stockant les résultats dans la blockchain
  res.render('resultats',{nbrCandidat:req.body.nbrCandidat});
});


router.get('/resultats', function (req, res, next) {
  res.render('resultats',{nbrCandidat:nbrCandidat});
});


router.get("/resultPartyByPartyNumber/:partyNumber", pvsController.resultPartyByPartyNumber);
router.get("/resultPartyByScrutineerName/:scrutineerName", pvsController.resultPartyByScrutineerName);
router.get("/ourOwnResult", pvsController.ourOwnResult);

module.exports = router;












