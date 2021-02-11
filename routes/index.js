var express = require('express');
var router = express.Router();
var controller=require('../controller/controller')

/* GET home page. */
router.get('/', controller.getAllDesignation);

router.post('/add-designation',controller.createNewDesignation)


module.exports = router;
