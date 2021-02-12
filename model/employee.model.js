var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Designation=require('./designation_model')
var EmployeeSchema = new Schema({
   
    name:{type:Schema.Types.String,required:true},
    email:{type:Schema.Types.String,required:true},
    salary:{type:Schema.Types.Number,required:true},
    designation:{type:Schema.ObjectId,ref:'Designation'}



},{
    timestamps:true
});

module.exports = mongoose.model('Employee', EmployeeSchema);