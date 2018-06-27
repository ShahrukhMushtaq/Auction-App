var express = require('express');
var router = express.Router();
var main = require('./controllers/main');

/* Registering All the routes */
router.get('/me', main.me);  
router.get('/users', main.home);
router.post('/login', main.login);
router.post('/signup', main.signup);
router.get('/logout', main.logout);
/****/




module.exports = router;



