var express = require('express');
var router = express.Router();
// const verifyToken = require('../middleware/verifyToken');

const userHandler = require('./handler/user');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('users');
// });
router.post('/register',userHandler.register);

router.post('/login', userHandler.login);

router.put('/update/:id', userHandler.update);

module.exports = router;
