const mongoose = require('mongoose');

const donoSchema = mongoose.Schema({
    name: {type: String, require: true},
    password: {type: String, require: true}
})

module.exports = mongoose.model('Dono', donoSchema);