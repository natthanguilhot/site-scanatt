const mongoose = require('mongoose');

const attelleSchema = mongoose.Schema({
    id: {type: String, require: true},
    isPrinting: {type: Boolean, require: true},
    isFinished: {type: Boolean, require: true},
    patient: {type: String, require: true},
    scan: {type: String, require: true},
    impression: {type: String, require: true},
    isDeleted: {type: Boolean, require: true},
    dateDeleted: {type: String, require: true},
});

module.exports = mongoose.model('Attelle', attelleSchema);