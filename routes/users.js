var express = require('express');
var router = express.Router();
var controller=require('../controller/controller')

/* GET users listing. */
router.get('/', controller.getAllEmployee);

router.post('/addEmp',controller.createNewEmployee);

router.post('/saveEditEmp',controller.SaveEditEmployee);

router.post('/deleteEmpbyId',controller.deleteEmpbyID);

router.post('/search',controller.search);

router.get('/time',controller.getTimeWiseData)


module.exports = router;
