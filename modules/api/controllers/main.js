
const User = require('../../../models/user');
var sequelize = require('sequelize');
var constants = require("../../../config/constants");
var requestHelper = require("../../../helpers/request");
var responseHelper = require("../../../helpers/response");
var db = require('../../../index');
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

main.home = function (req, res, next) {

    // console.log(db);
    
    db.db.query('SELECT * FROM users', null, (err, result)=> {
        if(err) console.log(err);
        else res.send(result);
    });    
   
}


main.login = function (req, res, next) {
    res.send('Success');
}

// exports.register = function (req, res) {
//     // console.log("req",req.body);
//     var users = {
//         "id": req.body.id,
//         "lname": req.body.name,
//         "email": req.body.email,
//         "password": req.body.password,
//         "created": today,
//         "modified": today
//     }
//     db.db.query('INSERT INTO users SET ?', users, function (error, results, fields) {
//         if (error) {
//             console.log("error ocurred", error);
//             res.send({
//                 "code": 400,
//                 "failed": "error ocurred"
//             })
//         } else {
//             console.log('The solution is: ', results);
//             res.send({
//                 "code": 200,
//                 "success": "user registered sucessfully"
//             });
//         }
//     });
// }

main.signup = function (req, res, next) {
    //var postBody = requestHelper.parseBody(req.body);
    //var postBody = req.body;
    //var responseBody = {};
    // let newUser ={        
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     age: req.body.age,
    //     phone: req.body.phone,
    //     gender: req.body.gender
    // };
    //const user = req.body;
    //console.log(user);
    var sql ="INSERT INTO users (name,email,password,age,phone,gender) VALUES ?";
    let userr = [
        [req.body.name, req.body.email, req.body.password, req.body.age, req.body.phone, req.body.gender]
    ];
    db.db.query(sql, [userr], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted", result);

  });
    //  if(validateSignup(postBody)){
    //       User.build(postBody).save().then(function(response){
    //           responseBody = responseHelper.formatResponse(
    //                                                   constants.MESSAGES.SIGNUP.SUCCESS,
    //                                                   {id:response.id,name:response.name}
    //                                       )
    //           res.statusCode = constants.HTTP.CODES.SUCCESS;
    //           res.send(responseBody);
    //       }).catch(function(error){

    //           responseBody = responseHelper.formatResponse(
    //                                       constants.MESSAGES.SIGNUP.ERROR,
    //                                       {}
    //                                       )
    //           res.statusCode = constants.HTTP.CODES.SUCCESS;
    //           res.send(responseBody);
    //       });

    //  }else{

    //           responseBody = responseHelper.formatResponse(
    //                                       constants.MESSAGES.GENERAL.FIELDS_REQUIRED,
    //                                       {}
    //                                       )

    //           res.statusCode = constants.HTTP.CODES.BAD_REQUEST;
    //           res.send(responseBody);
    //  }  
}
module.exports = main;


