var mongoose = require('mongoose')
module.exports = mongoose.model('Surveillance', new mongoose.Schema({key: String,value: String}))