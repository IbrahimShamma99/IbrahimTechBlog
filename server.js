var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());