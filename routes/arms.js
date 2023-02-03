var express = require('express');
var router = express.Router();
var armController = require('../controllers/armController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/add-arm', armController.addArm)
router.get('/get-arm/:cnic', armController.getArm)

module.exports = router;
