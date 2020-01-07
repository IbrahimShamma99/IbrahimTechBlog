var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var errorhandler = require('errorhandler');
var config = require("./config/config");
var cors = require("cors");
const next = require('next');
var isProduction = process.env.NODE_ENV === 'production';
const dev = process.env.NODE_ENV !== 'production';
const PORT = require("./config/config.json").PORT;
const NextApp = next({ dev });
const index = require("./pages/index");
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

NextApp.prepare()
    .then(() => {
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
        app.get("/", (req, res) => {
            return app.render(index);
        })
        var server = app.listen(process.env.PORT || PORT, function() {
            console.log('Listening on port ' + server.address().port);
        });
    });