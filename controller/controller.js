var Employee=require('../model/employee.model');
var Designation=require('../model/designation_model');

exports.createNewDesignation=function(req,res,next){

    try{
        var designatin = new Designation({
            title:req.body.title
        })
    
        designatin.save((err,result)=>{
            if(result){
                console.log(result);
                res.send(result)
            }else{
                console.log(err)
            }
        })
    }catch(err){
        res.send(err)
    }

    
    
}
exports.getAllDesignation=function(req,res,next){
   
    try{
        var des=Designation.find().exec((err,result)=>{
            if(result){
                res.send(result);
            }
        })    
    }catch(err){
        return res.send(err)
    } 
}
exports.createNewEmployee=function(req,res,next){

    try{
        var emp = new Employee({
            name:req.body.name,
            email:req.body.email,
            salary:req.body.salary,
            designation:req.body.designation,
        })
    
        emp.save((error,result)=>{
            if(result){
                res.send(result)
            }else if(error){
                return res.send(error)
            }
        })
    }catch(err){
        return res.send(err)
    }

    
    
}
exports.getAllEmployee=function(req,res,next){
   
    try{
        var des=Employee.find().populate('designation').exec((err,result)=>{
            if(result){
                res.send(result);
            }
        })
    }catch(err){
        return res.send(err)
    }
    
    
}

exports.SaveEditEmployee=function(req,res,next){
  
    try{
        Employee.findByIdAndUpdate(req.body.id,{
            name:req.body.name,
            email:req.body.email,
            salary:req.body.salary,
            designation:req.body.designation,
           }).exec((err,result)=>{
               if(result){
                   res.send(result)
               }else{
                   res.send(result)
               }
           })
            
    }catch(err){
        return res.send(err)
    }
    
}

exports.deleteEmpbyID =function(req,res,next){
    
    try{
        Employee.findByIdAndRemove(req.body.id).exec((err,result)=>{
            if(result){
                res.send(result)
            }
        })
    }catch(err){
        return res.send(err)
    }
    
}

exports.search =function(req,res,next){

    try{
        if(req.body.type=="name"){
            Employee.find({name:{
                $regex:req.body.value
            }}).populate('designation').exec((err,result)=>{
                res.send(result)
            })
        }
        else if(req.body.type=="email"){
            Employee.find({email:{
                $regex:req.body.value
            }}).populate('designation').exec((err,result)=>{
                res.send(result)
            })
        }
        else if(req.body.type=="salary"){
            Employee.find({salary:{
                $gt:req.body.lt,$lt:req.body.gt
            }}).populate('designation').exec((err,result)=>{
                res.send(result)
            })
        }
        else if(req.body.type=="designation"){
            Employee.find({designation:req.body.value}).populate('designation').exec((err,result)=>{
                res.send(result)
            })
        }
    }catch(err){
        return res.send(err)
    }

    
}

exports.getTimeWiseData=function(req,res,next){
    try{
        const now = new Date();
    
  
        Employee.aggregate([
            // Get only records created in the last 30 days
            {$match:{
                  "createdAt":{$lt: now}
            }}, 
            // Get the year, month and day from the createdAt
            {$project:{
                  "year":{$year:"$createdAt"}, 
                  "month":{$month:"$createdAt"}, 
                  "day": {$dayOfMonth:"$createdAt"}
            }}, 
            // Group by year, month and day and get the count
            {$group:{
                  _id:{year:"$year", month:"$month", day:"$day"}, 
                  "count":{$sum:1}
            }}
        ]).exec((err,result)=>{
            if(result){
                res.send(result)
            }
        })
    }catch(err){
        return res.send(err)
    }
    
}
var User=require('../model/user_model')
exports.test=function(req,res,next){

    // var user = new User({
    //     name:"raja",
    //     username:"raja",
    //     emails:[{email:"raja@cstech.com"}],
    //     password:"cstech@123"
    // })
    // user.save((err,result)=>{
    //     if(result){
    //         res.send(result)
    //     }else{
    //         res.send(err)
    //     }
    // })

    User.findOne({
        "emails.email":"raja@cstech.com"
    }).exec((err,result)=>{
        if(result){
            res.send(result)
        }else{
            res.send(err)
        }
    })

}

const passport = require('passport');
exports.login=function(req,res,next){
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            res.json({
                type: false,
                code: "S000",
                data: err
            })
        } else {
            res.json(user)
        }
    })(req, res, next);
   
  

}