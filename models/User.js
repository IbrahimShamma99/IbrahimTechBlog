var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

/**
 * @username 
 * @email => User's email
 * @bio => biography of the User
 * @image => User's avatar
 * @hash , @salt => related to the password
 */
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
    },
    bio: String,
    image: String,
    hash: String,
    salt: String,
}, { timestamps: true });

mongoose.model('User', UserSchema);