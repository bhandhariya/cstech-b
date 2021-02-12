var Employee=require('../model/employee.model');
var Designation=require('../model/designation_model');

exports.createNewDesignation=function(req,res,next){
    
    console.log(req.body)
    var designatin = new Designation({
        title:req.body.title
    })
    console.log(designatin)
    designatin.save((err,result)=>{
        if(result){
            console.log(result);
            res.send(result)
        }else{
            console.log(err)
        }
    })
    
}
exports.getAllDesignation=function(req,res,next){
   
    var des=Designation.find().exec((err,result)=>{
        if(result){
            res.send(result);
        }
    })
    
}
exports.createNewEmployee=function(req,res,next){
    
    console.log(req.body)
    var emp = new Employee({
        name:req.body.name,
        email:req.body.email,
        salary:req.body.salary,
        designation:req.body.designation,
    })
    console.log(emp)
    emp.save((err,result)=>{
        if(result){
            console.log(result);
            res.send(result)
        }else{
            console.log(err)
        }
    })
    
}
exports.getAllEmployee=function(req,res,next){
   
    var des=Employee.find().populate('designation').exec((err,result)=>{
        if(result){
            res.send(result);
        }
    })
    
}

exports.SaveEditEmployee=function(req,res,next){
   Employee.findByIdAndUpdate(req.body.id,{
    name:req.body.name,
    email:req.body.email,
    salary:req.body.salary,
    designation:req.body.designation,
   }).exec((err,result)=>{
       if(result){
           res.send(result)
       }
   })
    
}

exports.deleteEmpbyID =function(req,res,next){
    Employee.findByIdAndRemove(req.body.id).exec((err,result)=>{
        if(result){
            res.send(result)
        }
    })
}

exports.search =function(req,res,next){
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
        $regex:req.body.value
    }}).populate('designation').exec((err,result)=>{
        res.send(result)
    })
}
else if(req.body.type=="designation"){
    Employee.find({designation:req.body.designation}).populate('designation').exec((err,result)=>{
        res.send(result)
    })
}
}

exports.getTimeWiseData=function(req,res,next){
    console.log('raja')
    var daya=new Date(ISODate().getTime() - 1000*60*60*24*30);
    console.log(daya)
    // Employee.aggregate([
    //     // Get only records created in the last 30 days
    //     {$match:{
    //           "createdAt":{$gt: new Date(ISODate().getTime() - 1000*60*60*24*30)}
    //     }}, 
    //     // Get the year, month and day from the createdAt
    //     {$project:{
    //           "year":{$year:"$createdAt"}, 
    //           "month":{$month:"$createdAt"}, 
    //           "day": {$dayOfMonth:"$createdAt"}
    //     }}, 
    //     // Group by year, month and day and get the count
    //     {$group:{
    //           _id:{year:"$year", month:"$month", day:"$day"}, 
    //           "count":{$sum:1}
    //     }}
    // ]).exec((err,result)=>{
    //     if(result){
    //         res.send(result)
    //     }
    // })
}