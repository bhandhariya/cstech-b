
const mongoose = require('mongoose');
const emailSchema=require('./email-model')
var passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            default: ''
        },
        username: {
            type: String,
            trim: true,
            required: true,
            minlength: 4,
            lowercase: true,
            unique: true
        },
        emails: [emailSchema],
        password: {
            type: String,
            required: true,
            minlength: 8
        }
        
    },
    {
        timestamps: true,
        autoIndex: true
    }
);

userSchema.plugin(passportLocalMongoose)


const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
