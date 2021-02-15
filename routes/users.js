var express = require('express');
var router = express.Router();
var controller=require('../controller/controller')
var jwt = require('jsonwebtoken');

var passport = require('passport');

var User=require('../model/user_model')

/* GET users listing. */
router.get('/', controller.getAllEmployee);

router.post('/addEmp',controller.createNewEmployee);

router.post('/saveEditEmp',controller.SaveEditEmployee);

router.post('/deleteEmpbyId',controller.deleteEmpbyID);

router.post('/search',controller.search);

router.get('/time',controller.getTimeWiseData);

router.get('/test',controller.test);

router.post('/activate',controller.activate);

router.post('/deactivate',controller.deactivate);

getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

router.post('/signin', function(req, res) {
   try{
    User.findOne({
        username: req.body.username
      }, function(err, user) {
        if (err) return res.send(err);
    
        if (!user) {
          res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          // check if password matches
  
          if(user.password === req.body.password){
              console.log(user)
              
              var token = jwt.sign({user}, 'config.secret');
              res.json({success: true, token: 'JWT ' + token,user:user});
          }else{
              res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
  
        }
      });
   }catch(errorr){
       res.send(errorr)
   }
  });


module.exports = router;
