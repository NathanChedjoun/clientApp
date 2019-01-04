var express = require('express');
var router = express.Router();

const pvsController = require('../controllers').pvs;
const scrutineersController = require('../controllers').scrutineers;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/resultPartyByPartyNumber/:partyNumber", pvsController.resultPartyByPartyNumber);
router.get("/resultPartyByScrutineerName/:scrutineerName", pvsController.resultPartyByScrutineerName);
router.get("/ourOwnResult", pvsController.ourOwnResult);

module.exports = router;












