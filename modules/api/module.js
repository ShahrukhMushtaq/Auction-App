var express = require('express');
var router = express.Router();
var main = require('./controllers/main');
const multer = require('multer');

const storage =  multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,"ab");
    }
});

var uploads = multer({storage: storage});

/* Registering All the routes */
router.get('/profile', main.me);
router.get('/users', main.home);
router.post('/login', main.login);
router.post('/signup',uploads.single('img'), main.signup);
router.get('/logout', main.logout);

/****/
//
module.exports = router;