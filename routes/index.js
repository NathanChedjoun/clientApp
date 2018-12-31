var express = require('express');
var router = express.Router();

const pvsController = require('../controllers').pvs;
const scrutineersController = require('../controllers').scrutineers;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/pvs", pvsController.listPvs);
router.get("/description", pvsController.description);
module.exports = router;












