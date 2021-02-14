var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Designation=require('./designation_model')
var emailSchema=require('./email-model')
var EmployeeSchema = new Schema({
   
    // name:{type:Schema.Types.String,required:true},
    // email:{type:Schema.Types.String,required:true,unique:true},
    // salary:{type:Schema.Types.Number,required:true},
    // designation:{type:Schema.ObjectId,ref:'Designation'}

    name: {
        type: String,
        trim: true,
        default: '',
        required: true,
        minlength: 4,
        lowercase: true
    },
    emails: [emailSchema],
    designation: {type:Schema.ObjectId,ref:'Designation'},
    course: {
        type: String,
        enum: ['MCA', 'BCA', 'BSC',null],
        default: null
    },
    phone: {
        type: Number,
        trim: true,
        default: ''
    },
    gender: {
        type: String,
        trim: true,
        default: ''
    },
    active: {
        type: Boolean,
        default: true
    },
    imageURL: {
        type: String,
        trim: true,
        default: ''
    }
},{
    timestamps:true,
    autoIndex: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);