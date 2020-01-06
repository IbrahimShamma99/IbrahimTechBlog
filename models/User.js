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

UserSchema.methods.validPassword = function(password) {
    var hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
    console.log(hash);
    return this.hash === hash;
};

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
            id: this._id,
            username: this.username,
            exp: parseInt(exp.getTime() / 1000),
        },
        secret
    );
};

UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image,
    };
};
mongoose.model('User', UserSchema);