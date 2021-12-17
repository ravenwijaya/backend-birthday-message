const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/collect_user');
mongoose.Promise = Promise;

module.exports.User = require("./user");
