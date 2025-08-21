var express = require('express');
var router = express.Router();
// const verifyToken = require('../middleware/verifyToken');

const refreshTokenHandler = require('./handler/refresh-tokens');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('users');
// });
router.post('/', refreshTokenHandler.refreshToken);

module.exports = router;
