var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var errorhandler = require('errorhandler');
var config = require("./config/config");
var cors = require("cors");
var isProduction = process.env.NODE_ENV === 'production';
const dev = process.env.NODE_ENV !== 'production';
const PORT = require("./config/config.json").PORT;

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


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//NOTE Import DB
require('./models/User');
require('./models/Article');
app.use(require('./routes'));
app.use(errorhandler());
app.use(require('method-override')());
app.use(cors());
app.use(session({
    secret: 'IbrahimBlog',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
//NOTE Import DB
require('./models/User');
require('./models/Article');
app.use(require('./routes'));

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

// var server = app.listen(process.env.PORT || PORT, function() {
//     console.log('Listening on port ' + server.address().port);
// });