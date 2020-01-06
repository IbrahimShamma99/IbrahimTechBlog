var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var session = require('express-session');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var errorhandler = require('errorhandler');
var config = require("./config/config");
var isProduction = process.env.NODE_ENV === 'production';
require('./models/User');
require('./models/Article');
app.use(require('./routes'));
app.use(errorhandler());

app.use(session({
    secret: 'IbrahimBlog',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

if (isProduction) {
    mongoose
        .connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
} else {
    mongoose
        .connect(config.LocalEnvDB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    mongoose.set('debug', true);
};

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});
module.exports = { app };