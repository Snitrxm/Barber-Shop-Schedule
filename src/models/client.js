const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    name: {type: String, require: true},
    day:{type: String, require: true},
    hour:{type: String, require: true},
})

module.exports = mongoose.model('Client', clientSchema);