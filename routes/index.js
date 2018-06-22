var express = require('express');
var router = express.Router();
var db = require('../index')

router.get('/', (req,res,next) => {
    //console.log(db)
    res.render('index', { title: 'Express' });
});

module.exports = router;