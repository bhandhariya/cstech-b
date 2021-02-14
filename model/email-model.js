const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
            unique: true
        }
    },
    {
        timestamps: true,
        autoIndex: true, 
    }
);

module.exports = emailSchema;
