var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DesignationSchema = new Schema({
   
    title:{type:Schema.Types.String,required:true}



});

module.exports = mongoose.model('Designation', DesignationSchema);