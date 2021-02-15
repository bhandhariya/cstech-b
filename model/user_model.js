
const mongoose = require('mongoose');
const emailSchema=require('./email-model')
var passportLocalMongoose = require('passport-local-mongoose');
var passport=require('passport')
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
        emails: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
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

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
module.exports = User;
