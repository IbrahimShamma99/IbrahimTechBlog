var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var session = require('express-session');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./models/User');
require('./models/Article');

app.use(session({
    secret: 'IbrahimBlog',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));