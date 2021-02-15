var express = require('express');
var router = express.Router();
var controller=require('../controller/controller')

/* GET home page. */
router.get('/', controller.getAllDesignation);


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

router.post('/add-designation',controller.createNewDesignation)


module.exports = router;
