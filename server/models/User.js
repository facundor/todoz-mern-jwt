const mongoose = require('mongoose');
const toJSON = require('../helpers/mongoose');

const UsersSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true, 
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

UsersSchema.options.toJSON = toJSON;

module.exports = mongoose.model('User', UsersSchema);