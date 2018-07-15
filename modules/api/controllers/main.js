
var User = require('../../../models/user');
var sequelize = require('sequelize');
var constants = require("../../../config/constants");
var requestHelper = require("../../../helpers/request");
var responseHelper = require("../../../helpers/response");
var db = require('../../../index');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const multer = require('multer');
var main = {
    title: "Hello World",
    statusCode: constants.HTTP.CODES.SUCCESS
}

function validateSignup(body) {
    if (body.name != null && body.email != null && body.password != null && body.age != null && body.phone != null && body.gender != null) {
        return true;
    }   ///*** Add Email regex here as well */
    return false;
}

main.me = function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });    
    jwt.verify(token, "mySecret", function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // console.log(decoded.id);
     var sql = "SELECT * FROM users WHERE id=?";
     let userId = [decoded.id];
     db.db.query(sql , [userId],(err , user) => {
         if (err) throw err;
         res.status(200).send(user);
         //console.log("User is",user);
     });
    });
  }

main.home = function (req, res, next) {
    // console.log(db);   
    db.db.query('SELECT * FROM users', null, (err, result)=> {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "response": result}));
    });       
}

main.signup = function (req, res, next) {
//    console.log(req.file.path);
   var data = req.body;
     var hash = bcrypt.hashSync(req.body.password, 8);
    var sql ="INSERT INTO users (name,email,password,age,phone,gender,location) VALUES ?";
    let userDB = [
        [req.body.name, req.body.email, hash, req.body.age, req.body.phone, req.body.gender, req.body.location]
    ];
    db.db.query(sql, [userDB], function (err, user) {
    if (err) throw err;
    // console.log(user);
    // create a token
    var token = jwt.sign({ user: data }, "mySecret", {
        expiresIn: 7200
      });
    res.send({ status:200,auth: true, token: token });
  });
}

main.login = function (req, res, next) {

    var sql_query = "SELECT * FROM users WHERE email=?";
    let emId = [req.body.email];
    db.db.query(sql_query ,[emId] , (err , result)=> {
        if (err) return res.status(500).send('Error on the server.');
        if (!result) return res.status(404).send('No user found.');
        console.log(req.body.password);
        console.log(result);
        //result.toString();
        var passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
        // console.log(passwordIsValid);
        // console.log(result[0].id);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({user : result[0]},"mySecret",{
            expiresIn: 7200
        });
        res.send({ status:200, auth: true, token: token });
        
    });
  }

main.logout = function(req , res ){
    res.status(200).send({ auth: false , token: null});
}
module.exports = main;